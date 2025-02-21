<template>

  <header class="">
    <img class="logo" src="./../../assets/pictures/home/logo.png" alt="">

    <form @submit.prevent class="login"> 

      <div>
        <IcProfileCircle class="icon" />
        <input type="email" placeholder="ADRESSE MAIL" v-model="email" required />
      </div>

      <div>
        <IcProfileCircle class="icon" />
        <input type="password" placeholder="MOT DE PASSE" v-model="password" />
      </div>


      <!--<input type="text" placeholder="email" name="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />-->
      <button class="validate" type="submit" @click="login">SE CONNECTER</button> 
      <p>Mot de passe oublié ? <router-link to="/inscription"></router-link></p>
    </form>
    
    <p class="marquee">
    <span>
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
    </span>
  </p>
  <p class="marquee marquee2">
    <span> 
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
      you <strong> and </strong> me
      <img class="heart" src="./../../assets/pictures/home/heart.png" alt="">
  </span>
  </p>
  </header>


</template>

<script setup>
/*eslint-disable no-undef*/
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { IcProfileCircle} from '@kalimahapps/vue-icons';

const router = useRouter();
const store = useStore();
const email = ref('');
const password = ref('');




const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]));
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

  router.push('/Decouvrirprofil')
};



const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
    
  };

  try {
    const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    
    
    if (!response.ok) {
      console.log("ERREUR");
      alert("utilisateur inconnu ou mot de passe incorrect");
      return;
    }

    const result = await response.json();

    
    setTokenStore(result.token);
  } catch (err) {
    console.error('Error during login:', err);
  }
};
</script>

<style scoped lang="scss">

header{
  background: rgba(0, 0, 0, 0.5) url("./../../assets/pictures/login/login-picture.jpg");
  background-size: cover;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content:space-around;

  .logo{
    padding-top: 10vh;
    width: 70%;
    margin: auto;
  }
  .icon {
    width: 15%;
    height: 70%;
    color: white;
    margin: 10px
}

  div{
    display: flex;
    margin: 15px;
    align-items: center;
    width: 80vw;
    height: 50px;
    border: 1px solid white;
    border-radius: 999px;
    text-align: center;

    input{
      width: 80vw;
      height: 40px;
      background-color: transparent;
      border: 0;
      margin-right: 15px;
      color: white;
      font-weight: 800;
    }
  }
  .validate{
    border-radius: 8px;
    font-size: 0.9em;
    padding: 10px 10px;
    font-weight: 800;
  }
  p{
    color: white;
    margin-bottom: 15vh;
  }

}




.marquee {
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  color: white;
  width: 100%;
  bottom: 5px;

}

.marquee span {
  display: inline-block;
  padding-left: 135%;
  animation: marquee 8s linear infinite;
}

.marquee2 span {
  animation-delay: 4s;
}

.heart{
  width: 20px;
  height: 13px;
  padding: 0 5px;
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>