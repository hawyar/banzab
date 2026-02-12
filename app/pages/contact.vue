<template>
  <div class="py-16 md:py-20">
    <!-- Page Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-20">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
        Contact
      </h1>
      <p class="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
        Get in touch with our team to discuss partnership opportunities and inquiries.
      </p>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Contact Information -->
      <div class="bg-white border border-gray-200 p-8 md:p-12 mb-12 md:mb-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
              Address
            </h3>
            <p class="text-gray-600 font-light text-sm md:text-base">
              123 Business Plaza<br />
              New York, NY 10001
            </p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
              Phone
            </h3>
            <a href="tel:+12125551234" class="text-gray-600 hover:text-gray-900 transition-colors font-light text-sm md:text-base">
              (212) 555-1234
            </a>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
              Email
            </h3>
            <a href="mailto:hello@banzab.com" class="text-gray-600 hover:text-gray-900 transition-colors font-light text-sm md:text-base">
              hello@banzab.com
            </a>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
              Hours
            </h3>
            <p class="text-gray-600 font-light text-sm md:text-base">
              Mon - Fri: 9AM - 6PM<br />
              By appointment
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white border border-gray-200 p-8 md:p-12">
        <h2 class="text-2xl md:text-3xl font-light text-gray-900 mb-2 text-center">
          Send us a message
        </h2>
        <p class="text-gray-600 font-light text-center mb-8 md:mb-12 text-sm md:text-base">
          Fill out the form below and we'll get back to you within 24 hours
        </p>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Inquiry Type
            </label>
            <select v-model="form.type" required class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white">
              <option value="">Select inquiry type...</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="investor">Investor Relations</option>
              <option value="general">General Inquiry</option>
              <option value="press">Press & Media</option>
            </select>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                First Name
              </label>
              <input v-model="form.firstName" type="text" required class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Last Name
              </label>
              <input v-model="form.lastName" type="text" required class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
            </div>
          </div>

          <!-- Email and Phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input v-model="form.email" type="email" required class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Phone <span class="text-gray-500 normal-case">(optional)</span>
              </label>
              <input v-model="form.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
            </div>
          </div>

          <!-- Company -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Company <span class="text-gray-500 normal-case">(optional)</span>
            </label>
            <input v-model="form.company" type="text" class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors" />
          </div>

          <!-- Subject -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Subject
            </label>
            <input v-model="form.subject" type="text" required placeholder="Brief description of your inquiry" class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors placeholder-gray-400" />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Message
            </label>
            <textarea v-model="form.message" rows="6" required placeholder="Please provide details about your inquiry..." class="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors resize-y placeholder-gray-400"></textarea>
          </div>

          <!-- Submit Button -->
          <div class="text-center pt-4">
            <button type="submit" :disabled="submitting" class="bg-slate-900 text-white px-8 md:px-12 py-3 md:py-4 font-medium hover:bg-slate-800 focus:ring-1 focus:ring-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base">
              {{ submitting ? "Sending..." : "Send Message" }}
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="submitted" class="mt-8 max-w-2xl mx-auto p-6 bg-slate-50 border border-slate-200">
          <p class="text-slate-800 font-light text-center text-sm md:text-base">
            Thank you for your message. We will respond within 24 hours.
          </p>
        </div>
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
      content: "Contact Banzab to discuss partnership opportunities, investor relations, and general inquiries. We respond within 24 hours.",
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