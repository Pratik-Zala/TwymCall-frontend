import json
import random
from faker import Faker
import os
import math

# Configuration
NUM_NODES = 500
OUTPUT_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data', 'dataset-legal-huge.json')

# Initialize Faker
fake = Faker()

# --- Data Definitions ---

CLUSTERS = [
    {"key": "litigation", "label": "Litigation", "color": "#d50000", "x": 500, "y": 0},
    {"key": "corporate", "label": "Corporate Law", "color": "#0091ea", "x": -500, "y": 0},
    {"key": "ip", "label": "Intellectual Property", "color": "#00c853", "x": 0, "y": 500},
    {"key": "real_estate", "label": "Real Estate Law", "color": "#ffab00", "x": -300, "y": -500},
    {"key": "regulatory", "label": "Regulatory & Compliance", "color": "#6200ea", "x": 300, "y": -500},
    {"key": "environmental", "label": "Environmental Law", "color": "#4caf50", "x": 700, "y": 400},
    {"key": "bankruptcy", "label": "Bankruptcy", "color": "#ff6f00", "x": -700, "y": 400},
    {"key": "tax", "label": "Tax Law", "color": "#4e342e", "x": 0, "y": -700},
    {"key": "health", "label": "Health Law", "color": "#1b5e20", "x": 700, "y": -400},
    {"key": "family", "label": "Family Law", "color": "#e91e63", "x": -700, "y": -400},
    {"key": "criminal", "label": "Criminal Law", "color": "#212121", "x": 0, "y": 0},
    {"key": "international", "label": "International Law", "color": "#0d47a1", "x": -500, "y": 600},
]
CLUSTER_MAP = {c['key']: c for c in CLUSTERS}

TAGS = [
    {"key": "case", "image": "technology.svg"},
    {"key": "court", "image": "technology.svg"},
    {"key": "judge", "image": "technology.svg"},
    {"key": "firm", "image": "technology.svg"},
    {"key": "client", "image": "technology.svg"},
    {"key": "statute", "image": "technology.svg"},
    {"key": "contract", "image": "technology.svg"},
    {"key": "patent", "image": "technology.svg"},
    {"key": "defendant", "image": "technology.svg"},
    {"key": "plaintiff", "image": "technology.svg"},
    {"key": "regulation", "image": "technology.svg"},
]

# --- Generator Functions ---

def create_node(key, label, tag, cluster_key, radius=250):
    cluster_info = CLUSTER_MAP[cluster_key]
    angle = random.uniform(0, 2 * math.pi)
    r = math.sqrt(random.uniform(0, 1)) * radius
    x = int(cluster_info['x'] + r * math.cos(angle))
    y = int(cluster_info['y'] + r * math.sin(angle))
    
    return {
        "key": key,
        "label": label,
        "tag": tag,
        "cluster": cluster_key,
        "x": x,
        "y": y,
        "score": random.randint(5, 30)
    }

def generate_legal_data(num_nodes):
    nodes = []
    edges = []
    node_keys = set()

    # Create pools of reusable entities
    num_firms = int(num_nodes * 0.1)
    num_clients = int(num_nodes * 0.2)
    num_judges = int(num_nodes * 0.05)

    firms = [
        create_node(f"firm_{i}", f"{fake.last_name()} & {fake.last_name()}", 'firm', random.choice(CLUSTERS)['key'])
        for i in range(num_firms)
    ]
    clients = [
        create_node(f"client_{i}", fake.company(), 'client', random.choice(CLUSTERS)['key'])
        for i in range(num_clients)
    ]
    judges = [
        create_node(f"judge_{i}", f"Judge {fake.name()}", 'judge', 'litigation')
        for i in range(num_judges)
    ]

    all_entities = firms + clients + judges
    for entity in all_entities:
        if entity['key'] not in node_keys:
            nodes.append(entity)
            node_keys.add(entity['key'])

    # Create some initial core nodes for each cluster
    core_nodes = {}
    for cluster in CLUSTERS:
        cluster_key = cluster['key']
        # Add a major court/agency for the cluster
        court_label = f"National {cluster['label'].replace(' Law', '')} Court"
        if cluster_key == 'regulatory':
            court_label = f"National {cluster['label'].replace(' & Compliance', '')} Agency"
        court_key = court_label.replace(" ", "_")
        if court_key not in node_keys:
            core_node = create_node(
                court_key, court_label, 'court', cluster_key,
                radius=0
            )
            core_nodes[cluster_key] = core_node
            nodes.append(core_node)
            node_keys.add(court_key)
            
            for firm in random.sample(firms, k=min(len(firms), 3)):
                if firm['cluster'] == cluster_key:
                    edges.append([firm['key'], court_key])

    while len(nodes) < num_nodes:
        initial_node_count = len(nodes)
        scenario = random.choice(['litigation_case', 'corporate_deal', 'ip_filing', 'add_connection'])
        
        if scenario == 'litigation_case' and len(clients) > 2 and len(firms) > 2 and len(judges) > 1:
            cluster_key = 'litigation'
            
            plaintiff = random.choice(clients)
            defendant = random.choice(clients)
            if plaintiff == defendant: continue

            p_firm = random.choice(firms)
            d_firm = random.choice(firms)
            
            judge = random.choice(judges)

            case_name = f"{plaintiff['label'].split(' ')[0]} v. {defendant['label'].split(' ')[0]}"
            case_key = f"case_{len(nodes)}"
            case = create_node(case_key, case_name, 'case', cluster_key)
            
            if case['key'] not in node_keys:
                nodes.append(case)
                node_keys.add(case['key'])
                edges.extend([
                    [case.get('key'), plaintiff.get('key')], [case.get('key'), defendant.get('key')],
                    [p_firm.get('key'), plaintiff.get('key')], [d_firm.get('key'), defendant.get('key')],
                    [case.get('key'), judge.get('key')], [judge.get('key'), core_nodes[cluster_key].get('key')]
                ])
                if random.random() < 0.2:
                    ip_nodes = [n for n in nodes if n['tag'] == 'patent']
                    if ip_nodes:
                        edges.append([case_key, random.choice(ip_nodes)['key']])


        elif scenario == 'corporate_deal' and len(clients) > 2 and len(firms) > 1:
            cluster_key = 'corporate'
            c1 = random.choice(clients)
            c2 = random.choice(clients)
            if c1 == c2: continue
            
            firm = random.choice(firms)
            
            contract_name = f"{c1['label'].split(' ')[0]}-{c2['label'].split(' ')[0]} Merger"
            contract_key = f"contract_{len(nodes)}"

            contract = create_node(contract_key, contract_name, 'contract', cluster_key)
            if contract['key'] not in node_keys:
                nodes.append(contract)
                node_keys.add(contract['key'])
                edges.extend([
                    [contract.get('key'), c1.get('key')], [contract.get('key'), c2.get('key')],
                    [firm.get('key'), c1.get('key')], [firm.get('key'), c2.get('key')]
                ])
                if random.random() < 0.3:
                     edges.append([contract_key, core_nodes['regulatory']['key']])

        elif scenario == 'ip_filing' and len(clients) > 1 and len(firms) > 1:
            cluster_key = 'ip'
            company = random.choice(clients)
            firm = random.choice(firms)

            patent_name = f"Patent for {fake.bs()}"
            patent_key = f"patent_{len(nodes)}"
            patent = create_node(patent_key, patent_name, 'patent', cluster_key)

            if patent['key'] not in node_keys:
                nodes.append(patent)
                node_keys.add(patent['key'])
                edges.extend([
                    [patent.get('key'), company.get('key')], [firm.get('key'), company.get('key')],
                    [patent.get('key'), core_nodes[cluster_key].get('key')]
                ])
        
        elif scenario == 'add_connection':
            if len(nodes) < 2: continue
            node1, node2 = random.sample(nodes, 2)
            if node1['key'] != node2['key'] and [node1['key'], node2['key']] not in edges and [node2['key'], node1['key']] not in edges:
                 if node1['tag'] == 'firm' and node2['tag'] in ['case', 'client', 'contract']:
                     edges.append([node1['key'], node2['key']])
                 elif node1['tag'] == 'client' and node2['tag'] in ['case', 'firm', 'contract']:
                     edges.append([node1['key'], node2['key']])
        
        if len(nodes) == initial_node_count and len(nodes) >= num_nodes:
             break

    node_with_edges = set(e[0] for e in edges) | set(e[1] for e in edges)
    for node in nodes:
        if node['key'] not in node_with_edges and node['tag'] != 'court':
            cluster_key = node['cluster']
            if cluster_key in core_nodes:
                 edges.append([node['key'], core_nodes[cluster_key]['key']])

    unique_edges = list(set(tuple(sorted(e)) for e in edges))

    return {"clusters": CLUSTERS, "tags": TAGS, "nodes": nodes, "edges": unique_edges}


def main():
    print(f"Generating {NUM_NODES} nodes...")
    data = generate_legal_data(NUM_NODES)
    
    # Ensure the directory exists
    output_dir = os.path.dirname(OUTPUT_FILE_PATH)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Writing data to {OUTPUT_FILE_PATH}...")
    with open(OUTPUT_FILE_PATH, "w") as f:
        json.dump(data, f, indent=4)
    
    print("Done.")

if __name__ == "__main__":
    main() 