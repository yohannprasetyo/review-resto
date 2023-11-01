<script setup>
import BaseContainer from '../components/BaseContainer.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { useRestoRepository } from '../composables/useRestoRepository';
import Loading from '../components/Loading.vue';
import Navbar from '../components/NavBar.vue';

const router = useRouter();
const route = useRoute();
const repository = useRestoRepository();
const resto = reactive({
    name: '',
    address: '',
    description: ''
});

const isLoading =  ref(false)
const onSubmit = () => {
    isLoading.value = true;
    try {
        repository.store(resto);

        router.replace({name: 'restos'})
    } catch (e) {
        console.error(e);
    }
    isLoading.value = false;
}
</script>

<template>
    <Loading v-if="isLoading"/>
    <BaseContainer v-else>
        <Navbar/>   
        <hr class="border-1 border-[#f76002] shadow-sm shadow-[#f76002]">
        <div class="w-[100%] h-[80vh] mx-auto my-[3%] flex justify-center text-[#f76002]">
            <form :action="route.path" class="flex flex-col w-[40%]" @submit.prevent="onSubmit">
                <p class="text-center text-3xl text-white font-bold">Create Your Resto</p>
                <label for="name" class="mt-16 mb-3 font-semibold">Resto Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    class=" rounded-sm transition-all  bg-[#fce0cf] shadow-sm shadow-[#f76002] duration-300  outline-none mb-2 "
                    v-model="resto.name"
                    required
                >
                <label class="mb-3 font-semibold" for="address">Adress: </label>
                <input 
                    type="text" 
                    name="address" 
                    class=" rounded-sm transition-all duration-300 bg-[#fce0cf] shadow-sm shadow-[#f76002] outline-none mb-2"
                    v-model="resto.address"
                    required
                >
                <label class="mb-3 font-semibold" for="description">Description: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="description" 
                    class=" rounded-sm transition-all duration-300 bg-[#fce0cf] shadow-sm shadow-[#f76002] outline-none mb-2"
                    v-model="resto.description"
                />
                <input type="submit" class="mt-2 bg-[#fce0cf] shadow-sm shadow-[#f76002] cursor-pointer font-semibold hover:bg-black hover:text-white transition-all duration-300">
            </form>
        </div>
    </BaseContainer>
</template>