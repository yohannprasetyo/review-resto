<script setup>
	import { useAuthRepository } from '../composables/useAuthRepository';
	import { useRouter } from 'vue-router';

	const userData = JSON.parse(localStorage.getItem('user'));

	const router = useRouter()
	const repository_auth = useAuthRepository();
	const logout = () => {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user');
        repository_auth.logout();
        router.replace({name: 'login'})
    }
	const excerpt = (text, maxLength = 10, indicator = "...") => {
        let textCopy = text;
        
        if (textCopy.length > maxLength) {
            textCopy = textCopy.substring(0, maxLength) + indicator;
        }
        return textCopy
    }
</script>

<template>
	<div class="">
	  <nav
		class="
		  container
		  px-6
		  py-7
		  mx-auto
		  md:flex md:justify-between md:items-center
		"
	  >
		<div class="flex items-center justify-between">
		  <router-link
			to="/"
			class="
			  text-xl
			  font-bold
			  text-gray-100
			  md:text-4xl
			"
			>Eat Food
		  </router-link>
		  <p class="ml-16 text-white border-[1px] border-[#f76002] rounded-full px-3 py-1">Hi, {{ excerpt(userData.name, 10) }}</p>
		  <!-- Mobile menu button -->
		  <div @click="toggleNav" class="flex md:hidden visited:rotate-90">
			<button
			  type="button
			  class="
				text-gray-100
				hover:text-gray-400
				focus:outline-none focus:text-gray-400
			>
			  <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
				<path
				  fill-rule="evenodd"
				  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
				></path>
			  </svg>
			</button>
		  </div>
		</div>
  
		<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
		<ul
		  :class="showMenu ? 'flex' : 'hidden'"
		  class="
			flex-col
			mt-8
			space-y-4
			md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
		  "
		>
		  <router-link to="/restos"><li class="text-gray-100 hover:text-gray-400">Home</li></router-link>
		  <!-- <router-link to=""><li class="text-gray-100 hover:text-gray-400">About</li></router-link> -->
		  <router-link to="/createresto"><li class="text-gray-100 hover:text-gray-400">Create Resto</li></router-link>
		  <button @click="logout" class="rounded-full text-white px-2 py-1 border-2 border-[#f76002] bg-[#f76002] m-2 hover-[#db5502]"> Logout</button>
		</ul>
	  </nav>
	</div>
  </template>
  <script>
  import { ref } from 'vue';
  export default {
	setup() {
	  let showMenu = ref(false);
	  const toggleNav = () => (showMenu.value = !showMenu.value);
	  return { showMenu, toggleNav };
	},
  };
  </script>