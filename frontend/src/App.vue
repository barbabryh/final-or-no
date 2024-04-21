<script setup lang="ts">
import LoginPage from './pages/LoginPage.vue';
import { useProfileStore } from './store';
import { onMounted } from 'vue';

const profileStore = useProfileStore();

onMounted(() => {
	profileStore.fromUrl();
});
</script>

<template>
	<main class="container">
		<LoginPage></LoginPage>
	</main>

</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
}


</style>
