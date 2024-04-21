<script setup lang="ts">
import { userdataUserApi, touchMeApi } from '../api';
import { useProfileStore } from '../store';
import { onMounted, ref } from 'vue';

const profileStore = useProfileStore();

const showUserWarn = ref(false);
const showClickWarn = ref(false);
const clickResult = ref<number | null>(null);

onMounted(async () => {
	// Get username
	if (!profileStore.full_name && profileStore.id) {
		const resp = await userdataUserApi.getById(profileStore.id);
		if (resp.status != 200) {
			showUserWarn.value = true;
			return;
		}
		const data = resp.data;
		if (!data || !data.items) {
			showUserWarn.value = true;
			return;
		}
		const nameItem = data.items.find(item => {
			return item.category == 'Личная информация' && item.param == 'Полное имя';
		});
		if (!nameItem) {
			showUserWarn.value = true;
			return;
		}
		profileStore.full_name = nameItem?.value ?? null;
	}

	// Get touch data
	const resp = await touchMeApi.getTouch();
	if (resp.status != 200) {
		showClickWarn.value = true;
		return;
	}
	const data = resp.data;
	if (!data || !data.count) {
		showClickWarn.value = true;
		return;
	}
	clickResult.value = +data.count;

	
});

    

</script>

<template>

      <div class="menu">
        <router-link to="/schedule" id="schedule">Расписание</router-link>
        <router-link to="/teams" id="teams">Сборные</router-link>
        <router-link to="/other" id="other">Другое</router-link>
        <router-link to="/l" id="profile" class="profile">Аккаунт</router-link>
      </div>
      <div class="navbar"></div>
      <div class="hover_green">
        <img class="hover_green2" src="../iconsMain/hover_green.svg">
      </div>
      <div class="hover_green_teams">
        <img  class="hover_green_teams2" src="../iconsMain/hover_green.svg">
    </div>
    <div class="hover_green_other">
        <img  class="hover_green_other2" src="../iconsMain/hover_green.svg">
    </div>
    <div class="hover_green_profile">
        <img  class="hover_green_profile2" src="../iconsMain/hover_green.svg">
    </div>
		<div class="maincontain">
		<h1 class="text-h1">
			Имя:<span v-if="profileStore.full_name">, {{ profileStore.full_name }}</span
			>
		</h1>
		<p>Id: {{ profileStore.id }}</p>
	</div>
		

</template>
<style scoped>
*{
    overflow: hidden;
}

.main {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
}
.back {
    width: 100%;
    position: absolute;
}
.back0 {
    position: absolute;
    margin-top: -13%;
    width: 100%;
    z-index: -1000;
    animation: gradient_anim 10s ease-in-out infinite;
}

.a{
    color: black;
    text-decoration: none;;
}

.navbar {
    position: absolute;
    overflow: hidden;
    background-color: white;
    opacity: 0.5;
    width: 40%;
    height: 7%;
    z-index: 1;
    right: 0;
    margin-top: 0.6%;
    box-shadow: 1px 1px 8px 0.5px rgba(0, 0, 0, 0.09);
    margin-right: 3%;
}

.menu {
    position: absolute;
    z-index: 2;
    word-spacing: 2vw;
    display: inline-block;
    font-style: color black;
    text-align: center;
    width: 40%;
    height: 7%;
    font-size: 1.1vw;
    font-family: "Helvetica";
    margin-top: 1.6%;
    margin-left: 56%;
}

.profile {
    margin-left: 25%;
}

.sectionnone {
    display: none;
}

.sectionblock {
    display: block;
}

.hover_green2{
    position: absolute;
    margin-left: 23%;
    width: 30%;
    position: absolute;
    height: 0.2%;
    overflow: hidden;
    margin-top: -1%;
    box-shadow: 0px 16px 8px 22px #D5DF7C ;
    z-index: 1;
}

.hover_green_teams{
    position: absolute;
    margin-left: 62%;
    margin-top: 0.6%;
    width: 12%;
    height: 7%;
    overflow: hidden;
}

.hover_green_teams2{
    position: absolute;
    margin-left: 42%;
    width: 30%;
    position: absolute;
    height: 0.2%;
    overflow: hidden;
    margin-top: -1%;
    box-shadow: 0px 16px 8px 22px #D5DF7C ;
    z-index: 1;
}
.hover_green_other{
    position: absolute;
    margin-left: 68%;
    margin-top: 0.6%;
    width: 12%;
    height: 7%;
    overflow: hidden;
}

.hover_green_other2{
    position: absolute;
    margin-left: 47%;
    width: 30%;
    position: absolute;
    height: 0.2%;
    overflow: hidden;
    margin-top: -1%;
    box-shadow: 0px 16px 8px 22px #D5DF7C ;
    z-index: 1;
}
.hover_green_profile{
    position: absolute;
    margin-left: 86%;
    margin-top: 0.6%;
    width: 12%;
    height: 7%;
    overflow: hidden;
}

.hover_green_profile2{
    position: absolute;
    margin-left: 31%;
    width: 30%;
    position: absolute;
    height: 0.2%;
    overflow: hidden;
    margin-top: -1%;
    box-shadow: 0px 16px 8px 22px #D5DF7C ;
    z-index: 1;
}</style>
