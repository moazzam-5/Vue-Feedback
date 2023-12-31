<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 max-w">
        Or
        <router-link
          to="/register"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          create an account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                type="email"
                autocomplete="email"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                :class="
                  v$.data.email.$error === true
                    ? 'rounded-md border-2 border-red-500'
                    : 'text-field'
                "
                placeholder="Enter your email address"
                v-model="data.email"
              />
              <p
                style="color: red"
                v-for="error of v$.data.email.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                type="password"
                autocomplete="current-password"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                :class="
                  v$.data.password.$error === true
                    ? 'rounded-md border-2 border-red-500'
                    : 'text-field'
                "
                placeholder="Enter your password"
                v-model="data.password"
              />
              <p
                style="color: red"
                v-for="error of v$.data.password.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
              <a
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <img
                  class="h-5 w-5"
                  src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <img
                  class="h-5 w-5"
                  src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                  alt=""
                />
              </a>
            </div>
            <div>
              <a
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <img
                  class="h-6 w-6"
                  src="https://www.svgrepo.com/show/506498/google.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      data: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      data: {
        email: { required, email },
        password: { required },
      },
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async submit() {
      this.v$.$touch();
      if (!this.v$.$error) {
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          credentials: "include",
          body: JSON.stringify(this.data),
        });
        const check = await response.json();
        if (check.success === "true") {
          localStorage.setItem("token", check.token);
          await this.$router.push("/dashboard");
        } else {
          this.$swal({
            icon: "error",
            text: check.message,
          });
        }
        // await this.$router.push("/");
        // console.log(this.data);
      } else {
        console.log("required all field");
      }
    },
  },
};
</script>
