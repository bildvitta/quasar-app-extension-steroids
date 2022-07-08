<template>
  <q-field :error="$attrs.error" :error-message="$attrs.errorMessage" borderless>
    <q-uploader v-bind="$attrs" auto-upload bordered class="fit" :factory="factory" flat method="PUT" v-on="$listeners" @removed="removed" @uploaded="uploaded" @factory-failed="factoryFailed">
      <template v-slot:header="scope">
        <div class="flex flex-center no-wrap q-gutter-xs q-pa-sm">
          <q-spinner v-if="scope.isUploading" size="24px" />

          <div class="col column justify-center">
            <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            <div class="q-uploader__subtitle">{{ scope.uploadProgressLabel }} ({{ scope.uploadSizeLabel }})</div>
          </div>

          <q-btn v-if="showAddFile" dense flat icon="o_add" round>
            <q-uploader-add-trigger />
          </q-btn>

          <q-btn v-if="scope.canUpload" dense flat icon="o_cloud_upload" round @click="scope.upload" />
          <q-btn v-if="scope.isUploading" dense flat icon="o_clear" round @click="scope.abort" />
        </div>
      </template>

      <template v-slot:list="scope">
        <q-list separator>
          <div v-if="hasAPIValue && !scope.isUploading">
            <q-item v-for="(item, index) in pathsLoop" :key="index" class="q-pa-none">
              <q-item-section avatar top>
                <q-avatar v-if="isImage" rounded>
                  <img :src="item" @error="onImageLoadedError">
                </q-avatar>

                 <q-avatar v-else color="grey-3" icon="o_attach_file" rounded text-color="primary"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-black">{{ imageName(item) }}</q-item-label>
              </q-item-section>

              <q-item-section side v-if="!scope.readonly">
                <div class="q-gutter-xs text-grey-8">
                  <q-btn dense flat icon="o_delete" round @click="resetValue" />
                </div>
              </q-item-section>
            </q-item>
          </div>

          <q-item v-for="file in scope.files" :key="file.name" class="q-pa-none">
            <q-item-section avatar top>
              <q-avatar v-if="file.__img" rounded>
                <img :alt="file.name" :src="file.__img.src">
              </q-avatar>

              <q-avatar v-else color="grey-3" icon="o_attach_file" rounded :text-color="isFileFailed(file) ? 'negative' : 'primary'" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-black" :class="{ 'text-negative': isFileFailed(file) }">{{ file.name }}</q-item-label>
              <q-item-label caption>{{ file.__progressLabel }} ({{ file.__sizeLabel }})</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-grey-8">
                <q-circular-progress v-if="isFileUploading(file)" :indeterminate="!file.__progress" :max="1" :min="0" :value="file.__progress" />

                <q-icon v-if="isFileFailed(file)" color="negative" name="warning" size="20px" />

                <q-btn dense flat :icon="isFileUploaded(file) ? 'o_delete' : 'o_clear'" round @click="scope.removeFile(file)" />
              </div>
            </q-item-section>
          </q-item>

        </q-list>
      </template>
    </q-uploader>
  </q-field>
</template>

<script>
import { uid } from 'quasar'

export default {
  props: {
    entity: {
      required: true,
      type: String
    },

    hint: {
      default: '',
      type: String
    },

    value: {
      default: '',
      type: [Array, String]
    }
  },

  data () {
    return {
      files: [],
      paths: {},
      isFetching: false,
      isImage: true
    }
  },

  computed: {
    hasBottom () {
      return !!this.error || !!this.errorMessage || !!this.hint
    },

    hasAPIValue () {
      return Array.isArray(this.value) 
        ? this.value?.length && !this.files?.length
        : this.value && !this.files?.length
    },

    showAddFile () {
      const maxFiles = this.$attrs.maxFiles || (!this.$attrs.multiple && 1)
      return !this.$attrs.readonly && (maxFiles ? this.files.length < maxFiles : true)
    },

    pathsLoop () {
      return Array.isArray(this.value) ? this.value : (this.value ? [this.value] : [])
    }
  },

  watch: {
    files (files) {
      this.$emit('input', this.$attrs.multiple ? files : files[0] || '')
    }
  },

  methods: {
    async factory ([file]) {
      const name = `${uid()}.${file.name.split('.').pop()}`
      const { endpoint, path } = await this.fetch(name)

      this.paths[file.name] = path

      return {
        headers: [
          { name: 'Content-Disposition', value: 'Attachment' }
        ],
        sendRaw: true,
        url: endpoint
      }
    },

    factoryFailed () {
      this.$notify('Não foi possível enviar o arquivo.')
    },

    isFileFailed (file) {
      return file.__status === 'failed'
    },

    isFileUploaded (file) {
      return file.__status === 'uploaded'
    },

    isFileUploading (file) {
      return file.__status === 'uploading'
    },

    async fetch (filename) {
      this.isFetching = true

      try {
        const { data } = await this.$axios.post('/upload-credentials/', {
          entity: this.entity,
          filename
        })

        return data
      } catch (error) {
        throw error
      } finally {
        this.isFetching = false
      }
    },

    uploaded ({ files }) {
      this.files.push(this.paths[files[0].name])
    },

    removed ([file]) {
      const path = this.paths[file.name]
      this.files = this.files.filter(item => item !== path)
    },

    resetValue () {
      this.$emit('input', '')
    },

    imageName (value) {
      return `${value}`.split('/').pop()
    },

    onImageLoadedError () {
      this.isImage = false
    }
  }
}
</script>
