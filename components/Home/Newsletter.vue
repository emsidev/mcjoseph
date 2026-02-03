<script setup lang="ts">
import { ref } from 'vue';
import { ConfettiButton } from "~/components/ui/confetti";
import { useSupabase } from '~/lib/supabase';

const confettiButtonRef = ref<InstanceType<typeof ConfettiButton> | null>(null);

const toast = useToast();
const email = ref('');
const honeypot = ref('');
const loading = ref(false);
const error = ref('');

const supabase = useSupabase();

function validateEmail(): boolean {
  error.value = '';

  if (!email.value.trim()) {
    error.value = 'Email is required';
    return false;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address';
    return false;
  }

  return true;
}

function clearError() {
  error.value = '';
}

async function subscribe() {
  // Honeypot check: if the hidden field is filled, silently ignore
  if (honeypot.value) {
    console.warn('Bot detected via honeypot');
    return;
  }

  if (!validateEmail()) {
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { error: supabaseError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.value.trim() }]);

    if (supabaseError) {
      // Check for duplicate email error
      if (supabaseError.code === '23505') {
        throw new Error('This email is already subscribed');
      }
      throw supabaseError;
    }

    confettiButtonRef.value?.fire();

    // Show success toast
    toast.add({
      title: 'Successfully Subscribed!',
      description: 'Thank you for subscribing to the newsletter.',
      timeout: 5000
    });

    // Reset form
    email.value = '';
  } catch (err: any) {
    console.error('Subscription error:', err);

    const errorMessage = err.message || 'Failed to subscribe. Please try again.';
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center gap-3">
      <div class="flex-none rounded-full p-1 text-primary-500 bg-primary-500/10">
        <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
      </div>
      <h2 class="uppercase text-xs font-semibold text-gray-400">
        STAY IN TOUCH
      </h2>
    </div>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Get notified when I publish something new, and unsubscribe at any time.
    </p>

    <div class="mt-6 space-y-3">
      <!-- Honeypot field (hidden from humans) -->
      <div class="sr-only" aria-hidden="true">
        <input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div class="flex-1">
          <div class="group relative w-full h-full rounded-xl border transition-all duration-200 px-4 py-2.5" :class="[
            error
              ? 'border-red-500 ring-1 ring-red-500 bg-red-50/50 dark:bg-red-900/10'
              : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500'
          ]">
            <label class="block text-[11px] font-semibold transition-colors uppercase tracking-wider" :class="[
              error
                ? 'text-red-500'
                : 'text-gray-500 dark:text-gray-400 group-focus-within:text-sky-500'
            ]">
              Email
            </label>
            <input v-model="email" type="email" placeholder="john@example.com" @input="clearError"
              @keyup.enter="subscribe" :disabled="loading"
              class="block w-full h-full border-0 p-0 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-0 bg-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed" />
          </div>
          <p v-if="error" class="mt-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </p>
        </div>
        <ConfettiButton ref="confettiButtonRef" class="w-full sm:w-auto">
          <UiInteractiveHoverButton type="submit" :text="loading ? 'Joining...' : 'Join'" :disabled="loading || !email"
            :class="(loading || !email ? 'pointer-events-none opacity-50 ' : '') + 'w-full sm:w-auto px-6 sm:px-10 py-2.5 shadow-lg shadow-sky-500/10'"
            @click="subscribe" />
        </ConfettiButton>
      </div>
    </div>
  </div>
</template>