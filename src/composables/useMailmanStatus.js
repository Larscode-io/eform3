import { ref } from 'vue'

export function useMailmanStatus() {
  const isOnline = ref(false)
  const error = ref(null)
  const loading = ref(false)

  const isMailmanOnline = () => {
    isOnline.value = false // reset to default state
    error.value = null
    loading.value = true

    const params = new URLSearchParams({
      email: 'aaaa@const-court.be',
      'email-button': 'Subscribe'
    })

    fetch('https://mailman.const-court.be/mailman/subscribe/aaaa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.text()
        } else {
          throw new Error('Failed to check mailman status')
        }
      })
      .then((text) => {
        const matchConfirmation = text.match(/you will soon get a confirmation/gi)
        isOnline.value = matchConfirmation !== null
      })
      .catch((err) => {
        console.error('Error checking mailman status:', err)
        isOnline.value = false
        error.value = err.message || 'Unknown error'
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    isOnline,
    error,
    loading,
    isMailmanOnline
  }
}
