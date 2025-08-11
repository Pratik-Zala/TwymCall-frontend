
<template>
  <div class="training-admin-container">
    <div class="header-section">
      <h2 class="page-title">Training Admin</h2>
      <p class="page-description">Upload persona and context files to create new training sessions</p>
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
  name: 'TrainingAdmin',
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

        const response = await fetch('http://twymcall.dev.twymx.com/api/upload/documents', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()

        if (response.ok && result.success) {
          uploadResult.value = {
            success: true,
            data: result
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
.training-admin-container {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

.header-section {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
}

.page-description {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}

.upload-section {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 32px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.file-upload-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-label {
  font-size: 14px;
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
  gap: 12px;
  padding: 16px 20px;
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  background: #F9FAFB;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6B7280;
  font-size: 14px;
}

.file-input-label:hover {
  border-color: #9CA3AF;
  background: #F3F4F6;
}

.upload-icon {
  width: 20px;
  height: 20px;
  opacity: 0.6;
}

.upload-button-section {
  margin-top: 16px;
}

.upload-button {
  background: #3B82F6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
}

.upload-button:hover:not(:disabled) {
  background: #2563EB;
}

.upload-button:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.upload-button.loading {
  background: #6B7280;
}

.result-section {
  margin-top: 24px;
  padding: 20px;
  border-radius: 8px;
}

.success-message {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
}

.error-message {
  background: #FEF2F2;
  border: 1px solid #FECACA;
}

.success-header,
.error-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.success-header h3 {
  color: #166534;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.error-header h3 {
  color: #DC2626;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.result-icon {
  width: 24px;
  height: 24px;
}

.result-details p {
  margin: 8px 0;
  color: #166534;
  font-size: 14px;
}

.summaries {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-item {
  background: white;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #BBF7D0;
}

.summary-item h4 {
  color: #166534;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
}

.summary-item p {
  color: #374151;
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

.error-message p {
  color: #DC2626;
  margin: 0;
  font-size: 14px;
}
</style>
