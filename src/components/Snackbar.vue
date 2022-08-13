<template>
  <v-snackbar
    v-model="showSnackbar"
    top
    :color="snackbarTypeMap[snackbarType]?.[0]"
    :timeout="2000"
    :min-width="160"
  >
    <v-icon v-show="snackbarType">{{ snackbarTypeMap[snackbarType]?.[1] }}</v-icon>
    <span class="ml-2">{{ snackbarText }}</span>
  </v-snackbar>
</template>

<script setup lang="ts">
import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { eventBus } from '@/utils'

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarType = ref('')
const snackbarTypeMap = ref<Record<string, string[]>>({
  success: ['success', mdiCheckCircle],
  error: ['red accent-2', mdiCloseCircle],
})

eventBus.$on('showSnackbar', (text: string, type?: string) => {
  snackbarText.value = text
  snackbarType.value = type || ''
  showSnackbar.value = true
})
</script>
