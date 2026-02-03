<template>
  <main>
    <div class="space-y-24">
      <!-- Section: Intro -->
      <section class="space-y-6">
        <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">CONTACT</h2>
        <h1 class="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-4">
          Let's work together.
        </h1>
        <p class="text-gray-900 dark:text-gray-400">
          I'm always open to new opportunities and interesting projects.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <ClientOnly>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <AppBookCallButton class="w-full sm:w-auto" />
            <AppViewResumeButton class="w-full sm:w-auto" />
          </div>
          <template #fallback>
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <UButton label="Book a Call" color="sky" size="lg"
                class="rounded-full px-6 font-semibold w-full sm:w-auto" />
              <UButton label="View Resume" color="white" variant="solid" size="lg"
                class="rounded-full px-6 font-semibold w-full sm:w-auto justify-center" />
            </div>
          </template>
        </ClientOnly>
      </section>

      <!-- Section: Form -->
      <section>
        <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">SEND A MESSAGE</h2>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Honeypot field (hidden from humans) -->
          <div class="sr-only" aria-hidden="true">
            <input v-model="form.fax" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Name Input -->
            <div>
              <div class="group relative rounded-xl border transition-all duration-200 px-4 py-2.5" :class="[
                errors.name
                  ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                  : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'
              ]">
                <label for="name-input"
                  class="block text-[11px] font-semibold transition-colors uppercase tracking-wider" :class="[
                    errors.name
                      ? 'text-red-500'
                      : 'text-gray-500 dark:text-gray-400 group-focus-within:text-sky-500'
                  ]">
                  Name
                </label>
                <input id="name-input" v-model="form.name" type="text" placeholder="John Doe"
                  @input="clearError('name')" :aria-invalid="!!errors.name"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                  class="block w-full border-0 p-0 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-0 bg-transparent outline-none" />
              </div>
              <p v-if="errors.name" id="name-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email Input -->
            <div>
              <div class="group relative rounded-xl border transition-all duration-200 px-4 py-2.5" :class="[
                errors.email
                  ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                  : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'
              ]">
                <label for="email-input"
                  class="block text-[11px] font-semibold transition-colors uppercase tracking-wider" :class="[
                    errors.email
                      ? 'text-red-500'
                      : 'text-gray-500 dark:text-gray-400 group-focus-within:text-sky-500'
                  ]">
                  Email
                </label>
                <input id="email-input" v-model="form.email" type="email" placeholder="john@example.com"
                  @input="clearError('email')" :aria-invalid="!!errors.email"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                  class="block w-full border-0 p-0 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-0 bg-transparent outline-none" />
              </div>
              <p v-if="errors.email" id="email-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert">
                {{ errors.email }}
              </p>
            </div>

            <!-- Service Dropdown - Custom Multiselect with Accessibility -->
            <div>
              <div ref="dropdownContainer"
                class="group relative rounded-xl border transition-all duration-200 px-4 py-2.5" :class="[
                  errors.services
                    ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                    : isDropdownOpen
                      ? 'border-sky-500 ring-1 ring-sky-500 bg-white/50 dark:bg-white/5'
                      : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5'
                ]">
                <label id="services-label"
                  class="block text-[11px] font-semibold transition-colors uppercase tracking-wider" :class="[
                    errors.services
                      ? 'text-red-500'
                      : isDropdownOpen || form.services.length > 0
                        ? 'text-sky-500'
                        : 'text-gray-500 dark:text-gray-400'
                  ]">
                  Service
                </label>

                <!-- Selected items display / Trigger button -->
                <button type="button" @click="toggleDropdown" @keydown.escape="closeDropdown"
                  @keydown.enter.prevent="toggleDropdown" @keydown.space.prevent="toggleDropdown"
                  :aria-expanded="isDropdownOpen" :aria-haspopup="true" aria-labelledby="services-label"
                  :aria-invalid="!!errors.services" :aria-describedby="errors.services ? 'services-error' : undefined"
                  class="w-full text-left cursor-pointer min-h-[24px] flex flex-wrap items-center gap-2 pt-1 focus:outline-none">
                  <template v-if="form.services.length > 0">
                    <span v-for="service in form.services" :key="service"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium">
                      {{ service }}
                      <button type="button" @click.stop="removeService(service)" :aria-label="`Remove ${service}`"
                        class="hover:bg-sky-200 dark:hover:bg-sky-800/50 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </template>
                  <span v-else class="text-base text-gray-400 dark:text-gray-600">
                    Select services...
                  </span>
                </button>

                <!-- Dropdown menu -->
                <Transition enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2">
                  <div v-show="isDropdownOpen" role="listbox" aria-labelledby="services-label"
                    :aria-multiselectable="true"
                    class="absolute left-0 right-0 top-full mt-2 z-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                    <div class="max-h-60 overflow-y-auto">
                      <button v-for="(option, index) in serviceOptions"
                        :ref="(el) => { if (index === 0) firstOptionRef = el as HTMLElement | null }" :key="option"
                        type="button" role="option" :aria-selected="form.services.includes(option)"
                        @click="toggleService(option)" @keydown.enter.prevent="toggleService(option)"
                        @keydown.space.prevent="toggleService(option)" @keydown.escape="closeDropdown"
                        @keydown.tab="handleTabKey" :class="[
                          'w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between focus:outline-none',
                          focusedOptionIndex === index ? 'bg-gray-50 dark:bg-gray-800' : '',
                          form.services.includes(option) ? 'bg-sky-50 dark:bg-sky-900/30' : ''
                        ]">
                        <span class="text-base text-gray-900 dark:text-white">
                          {{ option }}
                        </span>
                        <div class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all" :class="[
                          form.services.includes(option)
                            ? 'bg-sky-500 border-sky-500'
                            : 'border-gray-300 dark:border-gray-600'
                        ]">
                          <svg v-if="form.services.includes(option)" class="w-3 h-3 text-white" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
              <p v-if="errors.services" id="services-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert">
                {{ errors.services }}
              </p>
            </div>

            <!-- Message Input -->
            <div>
              <div class="group relative rounded-xl border transition-all duration-200 px-4 py-2.5" :class="[
                errors.message
                  ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
                  : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'
              ]">
                <label for="message-input"
                  class="block text-[11px] font-semibold transition-colors uppercase tracking-wider" :class="[
                    errors.message
                      ? 'text-red-500'
                      : 'text-gray-500 dark:text-gray-400 group-focus-within:text-sky-500'
                  ]">
                  Message
                </label>
                <textarea id="message-input" v-model="form.message" placeholder="Tell me about your project..." rows="4"
                  @input="clearError('message')" :aria-invalid="!!errors.message"
                  :aria-describedby="errors.message ? 'message-error' : undefined"
                  class="block w-full border-0 p-0 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-0 bg-transparent resize-none outline-none"></textarea>
              </div>
              <p v-if="errors.message" id="message-error" class="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert">
                {{ errors.message }}
              </p>
            </div>
          </div>

          <div class="pt-2">
            <ConfettiButton ref="confettiButtonRef" class="w-full sm:w-auto">
              <UiInteractiveHoverButton type="submit" :text="loading ? 'Sending...' : 'Send Message'"
                :disabled="loading" class="w-full sm:w-auto px-10 shadow-lg shadow-sky-500/10" />
            </ConfettiButton>
          </div>
        </form>
      </section>


      <!-- Section: Socials -->
      <section>
        <HomeSocialLinks />
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { ConfettiButton } from "~/components/ui/confetti";
import { useSupabase } from '~/lib/supabase';

const confettiButtonRef = ref<InstanceType<typeof ConfettiButton> | null>(null);

const firstOptionRef = ref<HTMLElement | null>(null);
const focusedOptionIndex = ref(-1);

const toast = useToast();
const loading = ref(false);
const isDropdownOpen = ref(false);
const dropdownContainer = ref(null);
const supabase = useSupabase();
watch(isDropdownOpen, (open) => {
  if (open) {
    // Wait for Vue to render the menu, then focus the first item
    nextTick(() => {
      firstOptionRef.value?.focus();
    });
  }
});
const form = reactive({
  name: '',
  email: '',
  message: '',
  services: [] as string[],
  fax: '' // Honeypot field
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
  services: ''
});

const serviceOptions = [
  'Web Development',
  'UI/UX Design',
  'Consulting',
  'Mentorship',
  'Other'
];

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdown() {
  isDropdownOpen.value = false;
}

function toggleService(service: string) {
  if (form.services.includes(service)) {
    form.services = form.services.filter((s) => s !== service);
  } else {
    form.services.push(service);
  }
  clearError('services');
}

function removeService(service: string) {
  form.services = form.services.filter((s) => s !== service);
}

function handleTabKey(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const containerEl = dropdownContainer.value as HTMLElement | null;
  const buttons = Array.from(containerEl?.querySelectorAll('button[role="option"]') || []);
  const currentIndex = buttons.indexOf(target);

  if (event.shiftKey && currentIndex === 0) {
    // If shift+tab on first item, close dropdown
    closeDropdown();
  } else if (!event.shiftKey && currentIndex === buttons.length - 1) {
    // If tab on last item, close dropdown
    closeDropdown();
  }
}

function clearError(field: keyof typeof errors) {
  errors[field] = '';
}

function validateForm(): boolean {
  let isValid = true;

  // Reset errors
  errors.name = '';
  errors.email = '';
  errors.message = '';
  errors.services = '';

  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate services
  if (form.services.length === 0) {
    errors.services = 'Please select at least one service';
    isValid = false;
  }

  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Message is required';
    isValid = false;
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
    isValid = false;
  }

  return isValid;
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const containerEl = dropdownContainer.value as HTMLElement | null;
  if (containerEl && !containerEl.contains(target)) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

async function onSubmit() {
  // Honeypot check: if the hidden field is filled, silently ignore
  if (form.fax) {
    console.warn('Bot detected via honeypot');
    return;
  }

  if (!validateForm()) {
    return;
  }

  loading.value = true;
  try {
    const { error } = await supabase.from('contacts').insert([
      {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        services: form.services,
      },
    ]);

    if (error) throw error;

    confettiButtonRef.value?.fire();

    // Reset form on success
    form.name = '';
    form.email = '';
    form.services = [];
    form.message = '';

    // Show success toast
    toast.add({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon!',
      timeout: 5000
    });
  } catch (err: any) {
    console.error('Error sending message:', err);

    // Show error notification inline instead of toast if preferred
    errors.message = err.message || 'Failed to send message. Please try again.';
  } finally {
    loading.value = false;
  }
}

useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Get in touch with Mc Joseph Agbanlog for freelance projects, AI integrations, or fullstack development opportunities.' }
  ]
});
</script>

<style scoped>
/* Smooth transitions for dropdown */
</style>