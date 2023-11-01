<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthRepository } from "@/composables";
import Loading from '../components/Loading.vue';
import axios from "axios";

const repository = useAuthRepository();
const route = useRoute();
const router = useRouter();
const credentials = reactive({
  email: "",
  password: "",
  device_name: "browser",
});
const isLoggingIn = ref(false);
const onSubmit = async () => {
  isLoggingIn.value = true;
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8000";
  await axios.get('/sanctum/csrf-cookie').then(async response => {
    // console.log(response)
    try {
      const { data } = await repository.login(credentials);
      if (data) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.replace({ name: 'restos' })
      }
    }
    catch (e) {
      console.error(e)
    }
  });
  isLoggingIn.value = false;
}
</script>

<template>
  <Loading v-if="isLoading" />
  <main
    class="grid auto-cols-auto bg-[url('C:\Users\yohan\Desktop\review-resto\public\assets\background.jpg')] bg-cover w-full min-h-screen justify-center content-center">
    <section
      class="grid bg-[#ffffff33] backdrop-blur-[10px] justify-items-center content-center h-full shadow-2xl rounded-xl">
      <h1 class="text-white font-bold text-6xl text-center my-5">Login</h1>
      <form method="post" :action="route.path" class="w-3/4 mx-28 p-10 " @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="email" class="lock mb-2 text-[#9ffffd] font-semibold">Email</label>
          <input v-model="credentials.email" type="email" required placeholder="someone@email.com"
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded" />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-[#4FF8F4] font-semibold">Password</label>
          <input v-model="credentials.password" type="password" required placeholder="password"
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded" />
        </div>
        <p class="text-white font-bold mx-auto text-center mt-2 mb-10">Create an account?<router-link
            class="text-[#4FF8F4]" to="/register"> Register</router-link></p>
        <button type="submit"
          class="bg-[#4FF8F4] text-white p-2 w-full block hover:bg-[#50E8ED] rounded transition-colors duration-200 select-none">
          SUBMIT
        </button>
      </form>
    </section>
  </main>
</template>