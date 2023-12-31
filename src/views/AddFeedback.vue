<template>
  <div
    class="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8"
  >
    <h2 class="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
    <p class="mb-5 leading-relaxed text-gray-600">
      If you had any issues or you liked our product, please share with us!
    </p>
    <div class="mb-4">
      <label class="text-sm leading-7 text-gray-600">Name</label>
      <input
        type="text"
        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        :class="
          v$.data.name.$error === true
            ? 'rounded border-2 border-red-500'
            : 'text-field'
        "
        v-model="data.name"
      />
      <p
        style="color: red"
        v-for="error of v$.data.name.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <div class="mb-4">
      <label class="text-sm leading-7 text-gray-600">Title</label>
      <input
        type="text"
        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        :class="
          v$.data.title.$error === true
            ? 'rounded border-2 border-red-500'
            : 'text-field'
        "
        v-model="data.title"
      />
      <p
        style="color: red"
        v-for="error of v$.data.title.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <div class="mb-4">
      <label class="text-sm leading-7 text-gray-600">Message</label>
      <textarea
        class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        :class="
          v$.data.body.$error === true
            ? 'rounded border-2 border-red-500'
            : 'text-field'
        "
        v-model="data.body"
      ></textarea>
      <p
        style="color: red"
        v-for="error of v$.data.body.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <button
      class="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
      @click="addFeedback"
    >
      Send
    </button>
    <p class="mt-3 text-xs text-gray-500">
      Feel free to connect with us on social media platforms.
    </p>
  </div>
</template>

<script>
import { required, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      data: {
        name: "",
        title: "",
        body: "",
      },
    };
  },
  validations() {
    return {
      data: {
        name: { required },
        title: { required },
        body: { required, maxLength: maxLength(90) },
      },
    };
  },
  methods: {
    async addFeedback() {
      this.v$.$touch();
      if (!this.v$.$error) {
        const response = await fetch("http://localhost:8000/api/add", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          credentials: "include",
          body: JSON.stringify(this.data),
        });
        const check = await response.json();
        this.$swal({
          icon: "success",
          text: check.success,
        });
        await this.$router.push("dashboard");
        console.log(check);
      } else {
        console.log("required all field");
      }
    },
  },
};
</script>

<style></style>
