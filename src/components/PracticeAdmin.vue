
<template>
  <div class="practice-admin-container">
    <div class="header-section">
      <h2 class="page-title">Practice Admin</h2>
      <p class="page-description">Upload persona and context files to create new practice sessions or select existing sessions</p>
    </div>

    <!-- Sessions List Section -->
    <div class="sessions-section">
      <h3 class="section-title">Existing Sessions</h3>
      <div class="sessions-list" v-if="sessions.length > 0">
        <div 
          v-for="session in sessions" 
          :key="session.id"
          class="session-item"
          :class="{ 'selected': selectedSessions.includes(session.id) }"
          @click="toggleSession(session.id)"
        >
          <div class="session-header">
            <div class="session-checkbox">
              <input 
                type="checkbox" 
                :checked="selectedSessions.includes(session.id)"
                @click.stop
                @change="toggleSession(session.id)"
              />
            </div>
            <div class="session-id">{{ session.id.substring(0, 8) }}...</div>
          </div>
          <div class="session-details">
            <div class="persona-section">
              <h4>Persona:</h4>
              <p>{{ session.persona_summary }}</p>
            </div>
            <div class="context-section">
              <h4>Context:</h4>
              <p>{{ session.context_summary }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loadingSessions" class="loading-message">
        Loading sessions...
      </div>
      <div v-else class="no-sessions">
        No sessions available.
      </div>
      <div v-if="selectedSessions.length > 0" class="selected-count">
        {{ selectedSessions.length }} session(s) selected
      </div>
    </div>

    <!-- Upload Section -->
    <div class="upload-section">
      <h3 class="section-title">Create New Session</h3>
      <div class="upload-form">
        <!-- Multiple Persona Files Upload -->
        <div class="file-upload-group">
          <label class="file-label">Persona Files</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              id="persona-files"
              @change="handlePersonaFiles"
              accept=".txt,.pdf,.doc,.docx"
              class="file-input"
              multiple
            />
            <label for="persona-files" class="file-input-label">
              <img src="/upload.svg" alt="Upload" class="upload-icon" />
              <span v-if="personaFiles.length === 0">Choose Persona Files</span>
              <span v-else>{{ personaFiles.length }} file(s) selected</span>
            </label>
          </div>
          <div v-if="personaFiles.length > 0" class="selected-files">
            <div v-for="(file, index) in personaFiles" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <button @click="removePersonaFile(index)" class="remove-file">×</button>
            </div>
          </div>
        </div>

        <!-- Multiple Context Files Upload -->
        <div class="file-upload-group">
          <label class="file-label">Context Files</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              id="context-files"
              @change="handleContextFiles"
              accept=".txt,.pdf,.doc,.docx"
              class="file-input"
              multiple
            />
            <label for="context-files" class="file-input-label">
              <img src="/upload.svg" alt="Upload" class="upload-icon" />
              <span v-if="contextFiles.length === 0">Choose Context Files</span>
              <span v-else>{{ contextFiles.length }} file(s) selected</span>
            </label>
          </div>
          <div v-if="contextFiles.length > 0" class="selected-files">
            <div v-for="(file, index) in contextFiles" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <button @click="removeContextFile(index)" class="remove-file">×</button>
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <div class="upload-button-section">
          <button
            @click="uploadFiles"
            :disabled="isUploading || personaFiles.length === 0 || contextFiles.length === 0"
            class="upload-button"
            :class="{ 'disabled': isUploading || personaFiles.length === 0 || contextFiles.length === 0 }"
          >
            <span v-if="isUploading">Uploading...</span>
            <span v-else>Upload Files</span>
          </button>
          <p class="upload-note">Will upload the first persona file and first context file selected</p>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="uploadResult" class="result-section">
        <div v-if="uploadResult.success" class="success-message">
          <div class="success-header">
            <img src="/accept-square.svg" alt="Success" class="result-icon" />
            <h3>Upload Successful!</h3>
          </div>
          <div class="result-details">
            <p><strong>Session ID:</strong> {{ uploadResult.data.session_id }}</p>
            <p><strong>Message:</strong> {{ uploadResult.data.message }}</p>
          </div>
        </div>
        
        <div v-else class="error-message">
          <div class="error-header">
            <img src="/danger-triangle.svg" alt="Error" class="result-icon" />
            <h3>Upload Failed</h3>
          </div>
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'PracticeAdmin',
  setup() {
    const personaFiles = ref([])
    const contextFiles = ref([])
    const sessions = ref([])
    const selectedSessions = ref([])
    const loadingSessions = ref(false)
    const isUploading = ref(false)
    const uploadResult = ref(null)
    const errorMessage = ref('')

    const handlePersonaFiles = (event) => {
      const files = Array.from(event.target.files)
      personaFiles.value = [...personaFiles.value, ...files]
      uploadResult.value = null
    }

    const handleContextFiles = (event) => {
      const files = Array.from(event.target.files)
      contextFiles.value = [...contextFiles.value, ...files]
      uploadResult.value = null
    }

    const removePersonaFile = (index) => {
      personaFiles.value.splice(index, 1)
    }

    const removeContextFile = (index) => {
      contextFiles.value.splice(index, 1)
    }

    const toggleSession = (sessionId) => {
      const index = selectedSessions.value.indexOf(sessionId)
      if (index === -1) {
        selectedSessions.value.push(sessionId)
      } else {
        selectedSessions.value.splice(index, 1)
      }
    }

    const fetchSessions = async () => {
      loadingSessions.value = true
      try {
        const response = await fetch('https://twymcall.dev.twymx.com/api/upload/sessions')
        const result = await response.json()
        
        if (response.ok && result.success) {
          sessions.value = result.data.sessions
        } else {
          console.error('Failed to fetch sessions:', result.message)
        }
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        loadingSessions.value = false
      }
    }

    const uploadFiles = async () => {
      if (personaFiles.value.length === 0 || contextFiles.value.length === 0) {
        errorMessage.value = 'Please select at least one persona file and one context file'
        uploadResult.value = { success: false }
        return
      }

      isUploading.value = true
      uploadResult.value = null
      errorMessage.value = ''

      try {
        const formData = new FormData()
        // Only send the first file of each type
        formData.append('persona', personaFiles.value[0])
        formData.append('context', contextFiles.value[0])

        const response = await fetch('https://twymcall.dev.twymx.com/api/upload/sessions', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()

        if (response.ok && result.success) {
          uploadResult.value = result
          // Clear the selected files after successful upload
          personaFiles.value = []
          contextFiles.value = []
          // Clear the file inputs
          document.getElementById('persona-files').value = ''
          document.getElementById('context-files').value = ''
          // Refresh the sessions list
          await fetchSessions()
        } else {
          uploadResult.value = { success: false }
          errorMessage.value = result.message || 'Upload failed'
        }
      } catch (error) {
        console.error('Upload error:', error)
        uploadResult.value = { success: false }
        errorMessage.value = 'Network error occurred during upload'
      } finally {
        isUploading.value = false
      }
    }

    onMounted(() => {
      fetchSessions()
    })

    return {
      personaFiles,
      contextFiles,
      sessions,
      selectedSessions,
      loadingSessions,
      isUploading,
      uploadResult,
      errorMessage,
      handlePersonaFiles,
      handleContextFiles,
      removePersonaFile,
      removeContextFile,
      toggleSession,
      fetchSessions,
      uploadFiles
    }
  }
}
</script>

<style scoped>
.practice-admin-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header-section {
  margin-bottom: 32px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
}

.page-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.sessions-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.session-item {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.session-item:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.session-item.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.session-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.session-checkbox input {
  margin: 0;
}

.session-id {
  font-family: monospace;
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

.session-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.persona-section, .context-section {
  background: white;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #f3f4f6;
}

.persona-section h4, .context-section h4 {
  color: #374151;
  margin: 0 0 6px 0;
  font-size: 13px;
  font-weight: 600;
}

.persona-section p, .context-section p {
  color: #6b7280;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.loading-message, .no-sessions {
  text-align: center;
  color: #6b7280;
  padding: 20px;
  font-style: italic;
}

.selected-count {
  margin-top: 16px;
  padding: 8px 12px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 500;
}

.upload-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-upload-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.file-input-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.file-input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  cursor: pointer;
  color: #6b7280;
  font-size: 13px;
}

.file-input-label:hover {
  border-color: #9ca3af;
  background: #f3f4f6;
}

.upload-icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.selected-files {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 12px;
}

.remove-file {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-file:hover {
  background: #dc2626;
}

.upload-button-section {
  margin-top: 12px;
}

.upload-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.upload-button:disabled,
.upload-button.disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.upload-button:not(:disabled):not(.disabled):hover {
  background: #1d4ed8;
}

.upload-note {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  font-style: italic;
}

.result-section {
  margin-top: 20px;
  padding: 16px;
  border-radius: 6px;
}

.success-message {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.success-header,
.error-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.success-header h3 {
  color: #166534;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.error-header h3 {
  color: #dc2626;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.result-icon {
  width: 20px;
  height: 20px;
}

.result-details p {
  margin: 6px 0;
  color: #166534;
  font-size: 13px;
}

.error-message p {
  color: #dc2626;
  margin: 0;
  font-size: 13px;
}
</style>
