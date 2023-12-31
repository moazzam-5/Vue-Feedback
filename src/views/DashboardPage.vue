<template>
  <div class="antialiased bg-gray-100 min-h-screen pt-8 pb-12">
    <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl">
      <h3 class="mb-6 text-3xl font-bold">Reviews</h3>
      <p class="mb-6 pb-2 md:mb-12 md:pb-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
        amet numquam iure provident voluptate esse quasi, veritatis totam
        voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
    </div>
    <div class="px-4 sm:px-6 lg:px-8">
      <ReviewsCard :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import ReviewsCard from "@/components/ReviewsCard.vue";
export default {
  components: {
    ReviewsCard,
  },
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: { "Content-Type": "Application/json" },
          credentials: "include",
        });
        const content = await response.json();

        this.$store.dispatch("setAuth", true);
        this.$store.dispatch("setUser", content.name);
      } catch (error) {
        this.$store.dispatch("setAuth", false);
      }

      //get all feedbacks
      const response = await fetch("http://localhost:8000/api/all", {
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
      });
      const result = await response.json();
      this.reviews = result.feedbacks;
    },
  },
};
</script>

<style></style>
