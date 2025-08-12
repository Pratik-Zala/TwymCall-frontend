
<template>
  <div class="practice-admin-container">
    <div class="header-section">
      <h2 class="page-title">Practice Admin</h2>
      <p class="page-description">Upload persona and context files to create new practice sessions</p>
    </div>

    <div class="upload-section">
      <div class="upload-form">
        <!-- Persona File Upload -->
        <div class="file-upload-group">
          <label class="file-label">Persona File</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              id="persona-file"
              @change="handlePersonaFile"
              accept=".txt,.pdf,.doc,.docx"
              class="file-input"
            />
            <label for="persona-file" class="file-input-label">
              <img src="/upload.svg" alt="Upload" class="upload-icon" />
              <span v-if="!personaFile">Choose Persona File</span>
              <span v-else>{{ personaFile.name }}</span>
            </label>
          </div>
        </div>

        <!-- Context File Upload -->
        <div class="file-upload-group">
          <label class="file-label">Context File</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              id="context-file"
              @change="handleContextFile"
              accept=".txt,.pdf,.doc,.docx"
              class="file-input"
            />
            <label for="context-file" class="file-input-label">
              <img src="/upload.svg" alt="Upload" class="upload-icon" />
              <span v-if="!contextFile">Choose Context File</span>
              <span v-else>{{ contextFile.name }}</span>
            </label>
          </div>
        </div>

        <!-- Upload Button -->
        <div class="upload-button-section">
          <button
            @click="uploadFiles"
            :disabled="!personaFile || !contextFile || isUploading"
            class="upload-button"
            :class="{ 'loading': isUploading }"
          >
            <span v-if="!isUploading">Upload Files</span>
            <span v-else>Uploading...</span>
          </button>
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
            <div class="summaries">
              <div class="summary-item">
                <h4>Persona Summary:</h4>
                <p>{{ uploadResult.data.persona_summary }}</p>
              </div>
              <div class="summary-item">
                <h4>Context Summary:</h4>
                <p>{{ uploadResult.data.context_summary }}</p>
              </div>
            </div>
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
import { ref } from 'vue'

export default {
  name: 'PracticeAdmin',
  setup() {
    const personaFile = ref(null)
    const contextFile = ref(null)
    const isUploading = ref(false)
    const uploadResult = ref(null)
    const errorMessage = ref('')

    const handlePersonaFile = (event) => {
      const file = event.target.files[0]
      if (file) {
        personaFile.value = file
        uploadResult.value = null
      }
    }

    const handleContextFile = (event) => {
      const file = event.target.files[0]
      if (file) {
        contextFile.value = file
        uploadResult.value = null
      }
    }

    const uploadFiles = async () => {
      if (!personaFile.value || !contextFile.value) {
        return
      }

      isUploading.value = true
      uploadResult.value = null
      errorMessage.value = ''

      try {
        const formData = new FormData()
        formData.append('persona', personaFile.value)
        formData.append('context', contextFile.value)

        const response = await fetch('https://twymcall.dev.twymx.com/api/upload/documents', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()

        if (response.ok && result.success) {
          uploadResult.value = {
            success: true,
            data: result
          }
          
          // Store session ID in localStorage for use in Practice component
          if (result.session_id) {
            localStorage.setItem('practice_session_id', result.session_id)
          }
          
          // Reset file inputs after successful upload
          personaFile.value = null
          contextFile.value = null
          document.getElementById('persona-file').value = ''
          document.getElementById('context-file').value = ''
        } else {
          uploadResult.value = {
            success: false
          }
          errorMessage.value = result.message || 'Upload failed. Please try again.'
        }
      } catch (error) {
        uploadResult.value = {
          success: false
        }
        errorMessage.value = 'Network error. Please check your connection and try again.'
        console.error('Upload error:', error)
      } finally {
        isUploading.value = false
      }
    }

    return {
      personaFile,
      contextFile,
      isUploading,
      uploadResult,
      errorMessage,
      handlePersonaFile,
      handleContextFile,
      uploadFiles
    }
  }
}
</script>

<style scoped>
.practice-admin-container {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  background: #f9fafb;
  /* min-height: 100vh; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header-section {
  margin-bottom: 24px;
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

.upload-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.upload-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.upload-button.loading {
  background: #6b7280;
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

.summaries {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item {
  background: white;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #bbf7d0;
}

.summary-item h4 {
  color: #166534;
  margin: 0 0 6px 0;
  font-size: 13px;
  font-weight: 600;
}

.summary-item p {
  color: #374151;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.error-message p {
  color: #dc2626;
  margin: 0;
  font-size: 13px;
}
</style>
