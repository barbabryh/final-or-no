<template>
    <div id="profile1">
        <p class="sign_in_text">Вход</p>
        <form @submit.prevent="validateInput">
            <button class="sign_in_button" type="submit">Войти</button>
            <input v-model="login" type="text" class="login-1" id="login" placeholder="Логин" ref="loginInput">
            <input v-model="password" type="password" class="code" placeholder="Пароль" ref="passwordInput">
        </form>
        <div class="back">
            <img class="back0" src="../iconsMain/gradient.svg"> 
        </div>
        <p class="error_message">{{ errorMessage }}</p>
    </div>
</template>
<script lang="ts">
import { userdataUserApi, touchMeApi } from '../api';
import { useProfileStore } from '../store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const profileStore = useProfileStore();
const router = useRouter();

const showUserWarn = ref(false);
const showClickWarn = ref(false);
const clickResult = ref<number | null>(null);

onMounted(async () => {
	// Проверка токена
	const token = profileStore.token;
	if (token) {
		const resp = await touchMeApi.getTouch(); 
		if (resp.status === 200) {
			router.push('/profile'); 
			return;
		}
	}

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
<style scoped>
* {
    overflow: hidden;
}

.back {
    width: 100%;
    position: absolute;
}

.back0 {
    position: absolute;
    margin-top: -13%;
    width: 100%;
    z-index: -100;
    animation: gradient_anim 10s ease-in-out infinite;
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
    box-shadow: 1px 1px 8px gray;
    margin-right: 3%;
}

.menu {
    position: absolute;
    z-index: 2;
    word-spacing:2vw;
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

.blur {
    position: absolute;
    overflow: hidden;
    background-color: white;
    opacity: 0.8;
    backdrop-filter: blur(700px);
    width: 100%;
    height: 100%;
    z-index: 3;
}

.login-1 {
    position: absolute;
    text-align: center;
    border: none;
    overflow: hidden;
    background-color: white;
    opacity: 0.5;
    width: 20%;
    height: 7%;
    z-index: 4;
    right: 0;
    margin-top: 21%;
    box-shadow: 1px 1px 10px gray;
    left: 39%;
}

.code {
    position: absolute;
    text-align: center;
    border: none;
    overflow: hidden;
    background-color: white;
    opacity: 0.5;
    width: 20%;
    height: 7%;
    z-index: 4;
    right: 0;
    margin-top: 25%;
    box-shadow: 1px 1px 8px gray;
    left: 39%;
}

.sign-in-text {
    position: absolute;
    z-index: 4;
    font-size: 2vw;
    font-family: Helvetica;
    font-weight: bold;
margin-left: 46%;
margin-top: 18%;
}

.sign-in-button {
    position: absolute;
    z-index: 4;
    text-decoration: black;
    font-family:  Helvetica;
    font-weight: bold;
    border-radius: 0%;
    border: none;
    width: 10%;
    height: 3vw;
    margin-top: 30%;
    margin-left: 43%;
    background-color: #D5DF7C;
}


</style>


