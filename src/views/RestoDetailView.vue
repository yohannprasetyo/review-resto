<script setup>
import { useRestoRepository } from "@/composables";
import { useReviewRepository } from "../composables/useReviewRepository";
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";
import Loading from '../components/Loading.vue';

const review_repository = useReviewRepository();
const repository = useRestoRepository();
const route = useRoute();
const isLoading = ref(true);
const resto = ref({});
const fetchDetail = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.show(id);
    resto.value = data;
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};
onMounted(() => fetchDetail());
const reviews = ref([]);
const fetchReviews = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.reviews(id);
    reviews.value = data;
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};

const id = route.params.id;
const review_data = reactive({
  rating: "",
  text: "",
  resto_id: id,
});
const onSubmit = async () => {
  isLoading.value = true;
  try {
    await review_repository.store(review_data);
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};

onMounted(() => fetchReviews());
</script>

<template>
  <Loading v-if="isLoading"/>
    <BaseContainer>
        <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block p-2 px-4 bg-[#f46002] text-black rounded hover:bg-[#50E8ED]"
    >
      Back
    </RouterLink>
    <BaseCard class="mt-4 bg-[#001D30] text-[#f46002]">
      <template  #title> <p class="text-center text-4xl">Resto</p> </template>
    </BaseCard>
    <BaseCard class="mt-4">
      <template #title>{{ resto.name }}</template>
      {{ resto.description }}
    </BaseCard>

    <BaseCard class="mt-4 bg-[#001D30]">
      <template #title><p class="text-center text-4xl">Review</p> </template>
    </BaseCard>
    
    <BaseCard>
            <div class="my-[3%] ">
            <form :action="route.path" class="flex flex-col w-[40%] " @submit.prevent="onSubmit">
                <label for="name" class="mt-2 mb-3 text-[#f46002] font-semibold">Rating: </label>
                <input 
                    type="number" 
                    name="rating" 
                    class="rounded-sm transition-all  bg-[#0B2536] shadow-sm shadow-[#f46002] duration-300  outline-none mb-2"
                    v-model="review_data.rating"
                    placeholder="1 to 5"
                    min="1"
                    max="5"
                    required
                >
                <label class="mb-3 font-semibold text-[#f46002]" for="description">Review: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="text" 
                    class="rounded-sm transition-all  bg-[#0B2536] shadow-sm shadow-[#f46002] duration-300  outline-none mb-2"
                    v-model="review_data.text"
                />
                <input type="submit" class="mt-2 bg-[#0B2536] shadow-sm shadow-[#f46002] cursor-pointer font-semibold hover:bg-black hover:text-white transition-all duration-300">
            </form>
        </div>
      </BaseCard>

    <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
      <template #title>{{ review.user.name }}</template>
      {{ review.text }}    </BaseCard>
    </BaseContainer>
  </template>