<template>
  <div class="flex items-start justify-center pt-10">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl">
      <!-- Upload Context Section -->
      <div v-if="contextFiles.length === 0" class="w-[20vw]">
        <!-- Select File Button -->
        <div class="mb-4">
          <button 
            @click="triggerContextFileSelect" 
            class=" border   px-4 py-2 rounded-lg w-full"
          >
            Select Context File
          </button>
          <input 
            ref="contextInput" 
            type="file" 
            class="hidden" 
            @change="handleContextFileSelected"
          />
        </div>

        <!-- Display selected file name -->
        <p v-if="selectedContextFileName" class="text-sm text-gray-700">
        {{ selectedContextFileName }}
        </p>

        <!-- Upload Button -->
        <button
          @click="handleContextUpload"
          class="bg-[#1F3B74] text-white px-4 py-2 rounded-lg w-full mt-4"
        >
          Upload
        </button>
      </div>

      <!-- Context Dropdown Section (Visible once context is uploaded) -->
      <div v-if="contextFiles.length > 0">
        <div class="mb-6 flex items-center space-x-4">
          <!-- Context Dropdown -->
          <div class="w-1/2">
            <label class="block text-sm font-medium mb-2">Select Context:</label>
            <select
              v-model="selectedContextIndex"
              class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option v-for="(file, index) in contextFiles" :key="index" :value="index">
                {{ file.name }}
              </option>
            </select>
          </div>

          <!-- Upload New Context -->
          <div class="w-1/2">
            <div class="mb-4 flex flex-col items-center">
              <button 
                @click="triggerContextFileSelect"
                class="cursor-pointer border border-gray-300  px-4 py-2 rounded-lg w-fit"
              >
                Select Context File
              </button>
              <input 
                ref="contextInputNew"
                type="file"
                class="hidden"
                @change="handleContextFileSelected"
              />
            </div>
           <div class="flex justify-center">
             <button
              @click="handleContextUpload"
              class="bg-[#1F3B74] text-white px-4 py-2 rounded-lg w-fit"
            >
              Upload
            </button>
           </div>
          </div>
        </div>

        <!-- Persona File Upload and Summary Section for the Selected Context -->
        <div v-if="selectedContextIndex !== null" class="space-y-6">
          <!-- Persona File Selection Section -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">Upload Persona Files for Context:</label>
            <input
              type="file"
              @change="handlePersonaUpload"
              class="block w-full text-sm border border-gray-300 text-gray-700"
            />
          </div>

          <!-- Inner Div to Show Persona List and Summary -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Persona List (Left side) -->
            <div>
              <div class="space-y-2">
                <div
                  v-for="(persona, index) in contextFiles[selectedContextIndex].personas"
                  :key="index"
                  @click="selectPersona(index)"
                  :class="[ 'cursor-pointer px-4 py-2 rounded border text-sm', selectedPersonaIndex === index ? 'bg-blue-100 border-blue-400' : 'bg-gray-100 hover:bg-gray-200' ]"
                >
                  {{ persona.name }}
                </div>
              </div>
            </div>

            <!-- Persona Summary (Right side) -->
            <div v-if="selectedPersonaSummary!=''" class="border border-gray-300 rounded p-4">
              <p class="text-sm text-gray-700">
                {{ selectedPersonaSummary }}
              </p>
            </div>
          </div>
        </div>

        <!-- Delete Persona Button -->
        <button
          @click="deletePersona"
          :disabled="selectedPersonaIndex === null"
          class="bg-red-500 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Context File Management
const contextFiles = ref([]) // Array of context files (each containing personas)
const selectedContextIndex = ref(null) // Currently selected context

// Persona Selection
const selectedPersonaIndex = ref(null)
const selectedPersonaSummary = ref('')

// Reference for the hidden file input
const contextInput = ref(null)
const selectedContextFileName = ref('') // Store the selected context file name

// Handle context file selection
function handleContextFileSelected(event) {
  const file = event.target.files[0]
  if (file) {
    selectedContextFileName.value = file.name.replace(/\.[^/.]+$/, '') // Remove file extension
    console.log(`Selected file: ${selectedContextFileName.value}`)
  }
}

// Handle context file upload
function handleContextUpload() {
  const fileName = selectedContextFileName.value
  if (fileName) {
    // Add the uploaded context file to the list
    contextFiles.value.push({
      name: fileName, // Store file name without extension
      personas: [] // Initial empty list of personas for this context
    })
    selectedContextIndex.value = contextFiles.value.length - 1 // Automatically select the last context uploaded
    selectedContextFileName.value = '' // Clear the selected file name
  } else {
    alert('Please select a context file before uploading.')
  }
}

// Trigger the file input dialog for uploading context
function triggerContextFileSelect() {
  contextInput.value?.click() // Open file input dialog
}

// Handle persona file upload for the selected context
function handlePersonaUpload(event) {
  const file = event.target.files[0]
  if (file && selectedContextIndex.value !== null) {
    const personaName = file.name.replace(/\.[^/.]+$/, '') // Remove file extension
    contextFiles.value[selectedContextIndex.value].personas.push({
      name: personaName,
      file: file
    })
  }
}

// Select a persona for the selected context
function selectPersona(index) {
  selectedPersonaIndex.value = index
  const selectedPersona = contextFiles.value[selectedContextIndex.value].personas[index]
  selectedPersonaSummary.value = `Summary of ${selectedPersona.name}`
}

// Delete the selected persona
function deletePersona() {
  if (selectedPersonaIndex.value !== null && selectedContextIndex.value !== null) {
    contextFiles.value[selectedContextIndex.value].personas.splice(selectedPersonaIndex.value, 1)
    selectedPersonaIndex.value = null
    selectedPersonaSummary.value = ''
  }
}
</script>

<script>
export default {
  name: 'PopUp'
}
</script>

<style scoped>
/* Add any specific styles for the component if needed */
</style>
