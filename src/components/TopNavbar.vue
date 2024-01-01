<template>
  <nav
    class="relative flex items-center justify-between sm:h-10 md:justify-center py-8 px-4 mt-2"
  >
    <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
      <div class="flex items-center justify-between w-full md:w-auto px-4">
        <router-link
          to="/"
          class="items-center block px-5 lg:px-10 py-3.5 text-2xl font-medium text-center text-blue-600 transition duration-500 ease-in-out transform"
        >
          My Site
        </router-link>
        <div class="-mr-2 flex items-center md:hidden">
          <button
            type="button"
            id="main-menu"
            aria-label="Main menu"
            aria-haspopup="true"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="hidden md:flex md:space-x-10" v-if="auth">
      <router-link
        to="/addfeedback"
        class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out cursor-pointer"
        >+ Feedback</router-link
      >
      <router-link
        to="/dashboard"
        class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out cursor-pointer"
        >Dashboard</router-link
      >
      <a
        class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out cursor-pointer"
        >Blog</a
      >
      <a
        target="_blank"
        class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out cursor-pointer"
        >Docs</a
      >
    </div>
    <div
      class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
      v-if="!auth"
    >
      <span class="inline-flex">
        <router-link
          to="/login"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
        >
          Login
        </router-link>
      </span>
      <span class="inline-flex rounded-md shadow ml-2">
        <router-link
          to="/register"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
        >
          Sign Up
        </router-link>
      </span>
    </div>
    <div
      class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
      v-if="auth"
    >
      <span class="flex gap-2">
        <p>
          Welcome - <span class="text-blue-500 font-semibold">{{ user }}</span>
        </p>
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/3.jpg"
          class="rounded-full"
          style="height: 25px; width: 25px"
          alt=""
          loading="lazy"
        />
      </span>
      <span class="inline-flex">
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
          @click="logout"
        >
          Logout
        </button>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ auth: "getAuth" }),
    ...mapGetters({ user: "getUser" }),
  },
  methods: {
    async logout() {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
      });

      localStorage.removeItem("token");
      this.$router.push({ path: "/" }).then(() => {
        this.$router.go();
      });
    },
  },
};
</script>

<style></style>
