<template>
  <section
    class="flex flex-col items-center justify-center bg-gray-100 min-h-screen"
  >
    <div
      class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Name</label
            >
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              :class="
                v$.data.name.$error === true
                  ? ' border-2 border-red-500'
                  : 'text-field'
              "
              placeholder="Emelia Erickson"
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
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              :class="
                v$.data.email.$error === true
                  ? ' border-2 border-red-500'
                  : 'text-field'
              "
              placeholder="emelia@gmail.com"
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
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <input
              type="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              :class="
                v$.data.password.$error === true
                  ? ' border-2 border-red-500'
                  : 'text-field'
              "
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
          <button
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Create an account
          </button>
          <p class="text-sm font-light text-gray-500">
            Already have an account?
            <router-link
              to="/login"
              class="font-medium text-blue-600 hover:underline"
              >Sign in here</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      data: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      data: {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
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
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(this.data),
        });
        const check = await response.json();
        if (check.message === "success") {
          await this.$router.push("/login");
        } else {
          this.$swal({
            icon: "error",
            text: check.message,
          });
        }
      } else {
        console.log("required all field");
      }

      //   console.log(this.data);
    },
  },
};
</script>

<style></style>
