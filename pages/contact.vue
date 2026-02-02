<template>
  <main>
    <section class="max-w-4xl mx-auto align-top gap-16 md:grid md:grid-cols-2">
      <!-- Contact Info & Socials -->
      <div class="mb-12 md:mb-0">
        <h1 class="text-4xl font-bold font-display mb-4 text-gray-900 dark:text-gray-100">
          Let's work together.
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          I'm always open to new opportunities and interesting projects.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div class="space-y-8">
          <div>
            <h2 class="uppercase text-xs font-bold text-gray-400 tracking-wider mb-2">EMAIL ME</h2>
            <a 
              href="mailto:mcagbanlog@outlook.com" 
              class="text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              mcagbanlog@outlook.com
            </a>
          </div>

          <!-- Reuse existing social links component -->
          <HomeSocialLinks />
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <UInput
                id="name"
                v-model="form.name"
                color="white"
                variant="outline"
                placeholder="John Doe"
                size="lg"
                :ui="{ rounded: 'rounded-lg' }"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <UInput
                id="email"
                v-model="form.email"
                type="email"
                color="white"
                variant="outline"
                placeholder="john@example.com"
                size="lg"
                :ui="{ rounded: 'rounded-lg' }"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <UTextarea
                id="message"
                v-model="form.message"
                color="white"
                variant="outline"
                placeholder="Tell me about your project..."
                :rows="6"
                size="lg"
                :ui="{ rounded: 'rounded-lg' }"
              />
            </div>
          </div>

          <div class="pt-2">
            <UButton
              type="submit"
              size="lg"
              block
              color="primary"
              variant="solid"
              :loading="loading"
              class="font-semibold"
            >
              Send Message
            </UButton>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  message: ''
})

async function onSubmit() {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  alert('Message sent! (Demo only)')
  form.name = ''
  form.email = ''
  form.message = ''
}

useHead({
  title: 'Contact | Mc Joseph Agbanlog',
  meta: [{ name: 'description', content: 'Get in touch with Mc Joseph Agbanlog for freelance projects and opportunities.' }]
})
</script>

<style scoped>
.font-display {
  font-family: 'Archivo', sans-serif;
}
</style>
