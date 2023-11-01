<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useAuthRepository } from '@/composables';
  import Loading from '../components/Loading.vue';
  const route = useRoute();
  const router = useRouter();
  const repository = useAuthRepository();
  const credentials = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    device_name: 'browser'
  })
  const isLoading = ref(false)
  const onSubmit = () => {
    isLoading.value = true;
    try {
      repository.register(credentials);

      router.replace({name: 'login'})
    } 
    catch (e) {
        console.error(e)
    }
    isLoading.value = false;
  }
</script>

<template>
    <Loading v-if="isLoading"/>
  <main class="grid grid-cols-12 gap-4">
    <section class="col-span-6 min-h-screen shadow-lg">
        <p class="text-white font-bold text-5xl text-center my-10">Register</p>
        <form :action="route.path" method="post" class="p-28 pt-0" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="name" class="block mb-2 text-[#f76002] font-semibold">Name</label>
              <input 
              type="text" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded"
              placeholder="Namamu"
              v-model="credentials.name" 
              required>
            </div>
            <div class="mb-4">
              <label for="email" class="block mb-2 text-[#f76002] font-semibold">Email</label>
              <input 
              type="email" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded"
              placeholder="someone@example.com"
              v-model="credentials.email" 
              required>
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2 text-[#f76002] font-semibold">Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded"
              v-model="credentials.password" 
              required>
            </div>
            <div class="mb-4">
              <label for="password_confirmation" class="block mb-2 text-[#f76002] font-semibold">Confirm Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-blue-300 rounded"
              v-model="credentials.password_confirmation" 
              required>
            </div>
            <button type="submit" class="bg-[#f76002] text-white p-2 w-full block hover:bg-[#f46002] rounded transition-colors duration-200 select-none">Masuk</button>
            <p class="text-white font-bold mx-auto text-center mt-4">Already Have Account?<router-link class="text-[#f76002]" to="/"> Login</router-link></p>
        </form>
    </section>
  </main>
</template>