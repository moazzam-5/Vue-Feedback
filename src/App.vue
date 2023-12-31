<template>
  <TopNavbar />
  <router-view />
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";

export default {
  components: {
    TopNavbar,
  },
};
</script>
<style></style>
