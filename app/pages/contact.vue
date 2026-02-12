<template>
  <div class="pt-14 md:pt-16">
    <!-- Centered Header -->
    <div class="max-w-3xl mx-auto px-6 md:px-8 text-center mb-14 md:mb-20">
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium mb-5"
      >
        Contact
      </p>
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight mb-5"
      >
        Get in touch
      </h1>
      <p
        class="text-base text-gray-500 font-light leading-relaxed max-w-md mx-auto"
      >
        Reach out to discuss partnerships, opportunities, or anything else.
      </p>
    </div>

    <!-- Contact Info Row -->
    <div class="max-w-3xl mx-auto px-6 md:px-8 mb-14 md:mb-20">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden"
      >
        <div class="bg-white p-8 text-center">
          <div
            class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Email
          </div>
          <a
            href="mailto:hello@banzab.com"
            class="text-sm text-gray-900 font-light hover:text-gray-500 transition-colors"
          >
            hello@banzab.com
          </a>
        </div>
        <div class="bg-white p-8 text-center">
          <div
            class="text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Location
          </div>
          <p class="text-sm text-gray-900 font-light">
            Erbil, Kurdistan Region
          </p>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="max-w-3xl mx-auto px-6 md:px-8">
      <div class="w-full h-px bg-gray-200 mb-14 md:mb-16"></div>
    </div>

    <!-- Form -->
    <div class="max-w-2xl mx-auto px-6 md:px-8 mb-16 md:mb-20">
      <p
        class="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium text-center mb-10"
      >
        Send a message
      </p>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Inquiry Type -->
        <div>
          <label
            class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Inquiry Type
          </label>
          <select
            v-model="form.type"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white appearance-none"
          >
            <option value="">Select type...</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="investor">Investor Relations</option>
            <option value="general">General Inquiry</option>
            <option value="press">Press & Media</option>
          </select>
        </div>

        <!-- Name -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
            >
              First Name
            </label>
            <input
              v-model="form.firstName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
            />
          </div>
          <div>
            <label
              class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              v-model="form.lastName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
            />
          </div>
        </div>

        <!-- Email & Phone -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
            >
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
            />
          </div>
          <div>
            <label
              class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
            >
              Phone <span class="normal-case text-gray-300">(optional)</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
            />
          </div>
        </div>

        <!-- Company -->
        <div>
          <label
            class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Company <span class="normal-case text-gray-300">(optional)</span>
          </label>
          <input
            v-model="form.company"
            type="text"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
          />
        </div>

        <!-- Subject -->
        <div>
          <label
            class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Subject
          </label>
          <input
            v-model="form.subject"
            type="text"
            required
            placeholder="Brief description of your inquiry"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors placeholder-gray-300"
          />
        </div>

        <!-- Message -->
        <div>
          <label
            class="block text-[11px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-2"
          >
            Message
          </label>
          <textarea
            v-model="form.message"
            rows="5"
            required
            placeholder="Tell us more..."
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 font-light focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors resize-y placeholder-gray-300"
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="text-center pt-2">
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-3.5 text-sm font-medium hover:bg-gray-800 transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? "Sending..." : "Send Message" }}
            <svg
              v-if="!submitting"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </form>

      <!-- Success -->
      <div v-if="submitted" class="mt-8 p-6 bg-gray-50 rounded-2xl text-center">
        <p class="text-sm text-gray-900 font-light">
          Thank you for your message. We'll get back to you within 24 hours.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Contact - Banzab",
  meta: [
    {
      name: "description",
      content:
        "Contact Banzab to discuss partnership opportunities, investor relations, and general inquiries.",
    },
  ],
});

const form = reactive({
  type: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
});

const submitting = ref(false);
const submitted = ref(false);

async function submitForm() {
  submitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    submitted.value = true;

    setTimeout(() => {
      Object.keys(form).forEach((key) => {
        form[key] = "";
      });
      submitted.value = false;
    }, 5000);
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    submitting.value = false;
  }
}
</script>
