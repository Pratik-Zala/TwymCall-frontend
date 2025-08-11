<template>
  <div class="graph-visualization-container">
    <div class="main-layout">
      <div class="graph-container" ref="graphContainer"></div>
      <div class="file-list-container" v-if="files.length > 0">
        <h3>OneDrive Files</h3>
        <ul class="file-list">
          <li v-for="file in files" :key="file.id">
            <input type="checkbox" :id="file.id" :value="file" v-model="selectedFiles">
            <label :for="file.id">{{ file.name }}</label>
          </li>
        </ul>
        <button @click="visualizeSelection" :disabled="selectedFiles.length === 0">Visualize Selection</button>
      </div>
    </div>
  </div>
</template>

<script>
import { NodeImageProgram } from "@sigma/node-image";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import Sigma from "sigma";
import { getOneDriveFileById, getOneDriveFileContent, getOneDriveFiles } from "../api";
import dataset from "../data/dataset.json";
import documents from "./documents.json";

function drawRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawLabel(context, data, settings) {
  if (!data.label) return;

  const size = settings.labelSize || 15,
    font = settings.labelFont || "Lato, sans-serif",
    weight = settings.labelWeight || "normal";

  context.font = `${weight} ${size}px ${font}`;

  const text = data.label;
  const maxWidth = 200;

  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine === "" ? word : currentLine + " " + word;
    if (context.measureText(testLine).width > maxWidth && currentLine !== "") {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  let displayedLines = lines;
  if (lines.length > 3) {
    displayedLines = lines.slice(0, 3);
    let lastLine = displayedLines[2];
    while (context.measureText(lastLine + "...").width > maxWidth && lastLine.length > 0) {
      lastLine = lastLine.slice(0, -1);
    }
    displayedLines[2] = lastLine + "...";
  }

  const lineHeight = size + 5;
  const boxHeight = displayedLines.length * lineHeight;

  let measuredWidth = 0;
  for (const line of displayedLines) {
    const lineWidth = context.measureText(line).width;
    if (lineWidth > measuredWidth) {
      measuredWidth = lineWidth;
    }
  }
  const boxWidth = measuredWidth + 10;

  const x = data.x + data.size + 5;
  const y = data.y - boxHeight / 2;

  context.fillStyle = "#ffffffcc";
  drawRoundRect(context, x, y, boxWidth, boxHeight, 5);
  context.fill();

  context.fillStyle = "#000";
  context.textBaseline = "middle";
  for (let i = 0; i < displayedLines.length; i++) {
    context.fillText(displayedLines[i], x + 5, y + i * lineHeight + lineHeight / 2);
  }
}

export default {
  name: "GraphVisualization",
  data() {
    return {
      sigma: null,
      graph: null,
      hoveredNode: null,
      hoveredNeighbors: null,
      files: [],
      selectedFiles: [],
    };
  },
  mounted() {
    this.initializeGraph();
    this.fetchOneDriveFiles();
  },
  beforeUnmount() {
    if (this.sigma) {
      this.sigma.kill();
    }
  },
  methods: {
    async visualizeSelection() {
      if (this.selectedFiles.length === 0) return;
      try {
        const promises = this.selectedFiles.map(file =>
          Promise.all([
            getOneDriveFileById(file.id),
            getOneDriveFileContent(file.id)
          ])
        );
        const results = await Promise.all(promises);
        const documents = results.map(([metadata, content]) => ({ metadata, content }));
        this.updateGraph(documents);
      } catch (error) {
        console.error('Error fetching data for selected files:', error);
      }
    },
    updateGraph(documents) {
      if (this.sigma) {
        this.sigma.kill();
      }
      this.graph = new Graph();

      const paragraphMap = new Map();

      const mainRadius = 250 * Math.ceil(documents.length / 8);
      const mainAngleStep = (2 * Math.PI) / documents.length;

      console.log('Documents:', documents);
      documents.forEach((doc, i) => {
        const { metadata, content } = doc;
        if (!metadata) return;

        const mainNodeId = `file-${metadata.id}`;
        const mainAngle = i * mainAngleStep;
        const mainX = documents.length > 1 ? mainRadius * Math.cos(mainAngle) : 0;
        const mainY = documents.length > 1 ? mainRadius * Math.sin(mainAngle) : 0;

        this.graph.addNode(mainNodeId, {
          x: mainX,
          y: mainY,
          size: 6,
          label: metadata.name,
          color: '#CD0037'
        });

        const metadataNodes = [];
        if (metadata.createdBy && metadata.createdBy.user) metadataNodes.push({ id: 'createdBy', label: `Created By: ${metadata.createdBy.user.displayName}`, color: '#4A90E2' });
        if (metadata.lastModifiedBy && metadata.lastModifiedBy.user) metadataNodes.push({ id: 'lastModifiedBy', label: `Last Modified By: ${metadata.lastModifiedBy.user.displayName}`, color: '#4A90E2' });
        if (metadata.createdDateTime) metadataNodes.push({ id: 'createdDateTime', label: `Created: ${new Date(metadata.createdDateTime).toLocaleString()}`, color: '#F5A623' });
        if (metadata.size) metadataNodes.push({ id: 'size', label: `Size: ${(metadata.size / 1024).toFixed(2)} KB`, color: '#7ED321' });

        if (content && content.text) {
          const paragraphs = content.text.split('\n\n').filter(p => p.length > 10);
          paragraphs.forEach((p, j) => {
            const paragraphNodeId = `${mainNodeId}-p${j}`;
            if (!paragraphMap.has(p)) {
              paragraphMap.set(p, []);
            }
            paragraphMap.get(p).push(paragraphNodeId);
            metadataNodes.push({ id: `p${j}`, label: p, color: '#888' });
          });
        }

        const satelliteRadius = 100;
        const satelliteAngleStep = metadataNodes.length > 0 ? (2 * Math.PI) / metadataNodes.length : 0;

        metadataNodes.forEach((nodeInfo, j) => {
          const satelliteAngle = j * satelliteAngleStep;
          const satelliteNodeId = `${mainNodeId}-${nodeInfo.id}`;
          this.graph.addNode(satelliteNodeId, {
            x: mainX + satelliteRadius * Math.cos(satelliteAngle),
            y: mainY + satelliteRadius * Math.sin(satelliteAngle),
            size: 5,
            label: nodeInfo.label,
            color: nodeInfo.color,
          });
          this.graph.addEdge(mainNodeId, satelliteNodeId);
        });
      });

      for (const [_, nodeIds] of paragraphMap.entries()) {
        if (nodeIds.length > 1) {
          for (let i = 0; i < nodeIds.length; i++) {
            for (let j = i + 1; j < nodeIds.length; j++) {
              if (this.graph.hasNode(nodeIds[i]) && this.graph.hasNode(nodeIds[j])) {
                this.graph.addEdge(nodeIds[i], nodeIds[j], { type: 'line', color: '#0088cc', size: 2 });
              }
            }
          }
        }
      }

      console.log('Graph Data:', JSON.stringify(this.graph.export()));
      
      this.sigma = new Sigma(this.graph, this.$refs.graphContainer, {
        allowInvalidContainer: true,
        nodeProgramClasses: {
          image: NodeImageProgram,
        },
        nodeReducer: (node, data) => {
          const res = { ...data };
          if (this.hoveredNode && node !== this.hoveredNode && !(this.hoveredNeighbors && this.hoveredNeighbors.has(node))) {
            res.label = "";
            res.color = "#e6e6e6";
          }
          return res;
        },
        edgeReducer: (edge, data) => {
          const res = { ...data };
          if (this.hoveredNode) {
            if (this.graph.hasExtremity(edge, this.hoveredNode)) {
              res.color = this.graph.getNodeAttribute(this.hoveredNode, "color");
              res.size = 2.5;
            } else {
              res.hidden = true;
            }
          }
          return res;
        },
        defaultDrawNodeLabel: drawLabel,
        defaultNodeType: "image",
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
      });

      this.sigma.on("enterNode", ({ node }) => {
        this.setHoveredNode(node);
      });
      this.sigma.on("leaveNode", () => {
        this.setHoveredNode(null);
      });
    },
    async fetchOneDriveFiles() {
      try {
        const data = await getOneDriveFiles();
        this.files = data;
        this.updateGraph(documents)
        console.log('OneDrive Files:', this.files);
      } catch (error) {
        console.error('Error fetching OneDrive files:', error);
      }
    },
    initializeGraph() {
      const container = this.$refs.graphContainer;
      if (!container) {
        console.error("Graph container not found");
        return;
      }

      this.graph = new Graph();

      const clusters = dataset.clusters.reduce((acc, cluster) => {
        acc[cluster.key] = cluster;
        return acc;
      }, {});

      const tags = dataset.tags.reduce((acc, tag) => {
        acc[tag.key] = tag;
        return acc;
      }, {});

      dataset.nodes.forEach(node => {
        this.graph.addNode(node.key, {
          ...node,
          ...clusters[node.cluster],
          image: `/images/${tags[node.tag].image}`
        })
      });

      dataset.edges.forEach(([source, target]) => this.graph.addEdge(source, target, { size: 1 }));

      const scores = this.graph.nodes().map(node => this.graph.getNodeAttribute(node, "score"));
      const minDegree = Math.min(...scores);
      const maxDegree = Math.max(...scores);
      const MIN_NODE_SIZE = 3;
      const MAX_NODE_SIZE = 30;

      this.graph.forEachNode(node => {
        this.graph.setNodeAttribute(
          node,
          "size",
          ((this.graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
          (MAX_NODE_SIZE - MIN_NODE_SIZE) +
          MIN_NODE_SIZE
        );
      });

      // const settings = forceAtlas2.inferSettings(this.graph);
      // forceAtlas2.assign(this.graph, {
      //   iterations: 100,
      //   settings,
      // });

      this.sigma = new Sigma(this.graph, container, {
        allowInvalidContainer: true,
        nodeProgramClasses: {
          image: NodeImageProgram,
        },
        nodeReducer: (node, data) => {
          const res = { ...data };
          if (this.hoveredNode && node !== this.hoveredNode && !(this.hoveredNeighbors && this.hoveredNeighbors.has(node))) {
            res.label = "";
            res.color = "#e6e6e6";
          }
          return res;
        },
        edgeReducer: (edge, data) => {
          const res = { ...data };
          if (this.hoveredNode) {
            if (this.graph.hasExtremity(edge, this.hoveredNode)) {
              res.color = this.graph.getNodeAttribute(this.hoveredNode, "color");
              res.size = 2.5;
            } else {
              res.hidden = true;
            }
          }
          return res;
        },
        defaultDrawNodeLabel: drawLabel,
        defaultNodeType: "image",
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
      });

      this.sigma.on("enterNode", ({ node }) => {
        this.setHoveredNode(node);
      });
      this.sigma.on("leaveNode", () => {
        this.setHoveredNode(null);
      });
    },

    setHoveredNode(node) {
      if (node) {
        this.hoveredNode = node;
        this.hoveredNeighbors = new Set(this.graph.neighbors(node));
      } else {
        this.hoveredNode = null;
        this.hoveredNeighbors = null;
      }
      this.sigma.refresh();
    },
  },
};
</script>

<style scoped>
.graph-visualization-container {
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.main-layout {
  display: flex;
  flex: 1;
  margin-top: 50px;
  /* To avoid overlap with controls */
}

.graph-container {
  width: 70%;
  height: 100%;
  background-color: #f9fafb;
}

.file-list-container {
  width: 30%;
  padding: 10px;
  border-left: 1px solid #ccc;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.file-list {
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-list-container h3 {
  margin-top: 0;
}

.file-list-container ul {
  list-style: none;
  padding: 0;
}

.file-list-container li {
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.file-list-container li input {
  margin-right: 8px;
}

.file-list-container li:hover {
  background-color: #f0f0f0;
}

.file-list-container button {
  margin-top: 10px;
  padding: 10px;
  background-color: #CD0037;
  color: white;
  border: none;
  cursor: pointer;
}

.file-list-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
