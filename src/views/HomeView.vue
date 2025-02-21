<template>

<header class="">
  <img class="logo" src="./../assets/pictures/home/logo.png" alt="">
  <p class="">Vivez</p>
  <span>VOTRE histoire</span>
  <button @click="register" class="register">INSCRIPTION</button>
  <button @click="login" class="login">CONNEXION</button>
  
  <p class="marquee">
  <span>
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
  </span>
</p>
<p class="marquee marquee2">
  <span> 
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
    you <strong> and </strong> me
    <img class="heart" src="./../assets/pictures/home/heart.png" alt="">
</span>
</p>
</header>

<section class="review">
  <h2>Découvrez nos avis clients</h2>

  <SliderDraggable></SliderDraggable>

</section>




<!--
<div class="profile">
      
    <div> Votre email  :    {{ user?.email }}</div>
    <div>Votre name :     {{ user?.lastname }}</div>
    <div>Votre prenom :     {{ user?.firstname }}</div>
    <div>Votre role :     {{ user?.role }}</div>

   
    <button type="submit" @click="deco">deconnexion</button> 
</div>-->
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import router from '@/router';

import SliderDraggable from '@/components/SliderDraggable.vue';


onMounted(() => {
  store.dispatch('checkAuth');
  
});
const store = useStore();

//--------carroussel


    // const slides = ref([0, 1, 2, 3, 4]);
    // const currentIndex = ref(0);

    // const carouselStyle = computed(() => ({
    //   transform: `translateX(-${currentIndex.value * 100}%)`,
    //   transition: 'transform 0.3s ease',
    // }));

    // const next = () => {
    //   currentIndex.value = currentIndex.value + 1

    //   if(currentIndex.value>slides.value.length-1){
    //     currentIndex.value=0;
    //   }
  
    //   if(currentIndex.value<0){
    //     currentIndex.value=slides.value.length-1;
    //   }
    // };

    // const prev = () => {
    //   currentIndex.value = currentIndex.value - 1 ;

    //   if(currentIndex.value>slides.value.length-1){
    //     currentIndex.value=0;
    //   }
  
    //   if(currentIndex.value<0){
    //     currentIndex.value=slides.value.length-1;
    //   }
    // };

    const register = () => {
      router.push('/inscription')
    }
    const login = () => {
      router.push('/connexion')
    }

    /*function register (){
      
    }*/

</script>

<style scoped lang="scss">
$primary: rgba(249, 112, 104, 1);
$second: rgba(219, 228, 245, 1);
$black: rgba(34, 35, 38, 1);
$white: rgba(255, 236, 236, 1);


//----------------------------HEADER
header{
  background: rgba(0, 0, 0, 0.5) url("./../assets/pictures/home/wedding-hands.jpg");
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

}
.logo{
  padding-top: 10vh;
  width: 70%;
  margin: auto;
}
.logo + p{
  font-size: 4em;
  color: white;
  font-weight: 600;
}
.logo + p + span{
  font-size: 1.2em;
  color: white;
  font-weight: 600;
}
.register{
  border-radius: 10px;
  margin: 30px 0 5px 0;
  font-size: 1em;
  font-style: italic;
  font-weight: 500;
}

.login{
  background-color: $second;
  color: black;
  margin-bottom: 10vh;
  border-radius: 10px;
  font-size: 1em;
  font-style: italic;
  font-weight: 500;
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
  padding-left: 150%;
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

//-------------------------------REVIEW

.review{
  background-color: white;
  h2{
    padding: 30px;
    color: black;
    font-size: 1.5em;
  }
  .carousel {
    display: relative;
    width: 80%;
    position: relative;
    margin: auto;
    border-radius: 10px;
    .prev, .next{
      position: absolute;
      border-radius: 5px;
      background-color: $primary;
      top: 35%;
      width: 20px;
      height: 30px;
      display: flex;
      align-items: center;
    }
    .next{
      right: 5px;
    }
    .prev{
      left: 5px;
    }
    .carousel-inner {
      display: flex;
    }
    .slide {
      overflow: hidden;
      border: 1px solid lightgrey;
      min-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      padding: 0 20px;
      margin: auto;
      h3{
        width: 90%;
        font-size: 0.9em;
        font-style: italic;
        text-align: left;
        color: black;
        margin: auto;
        padding: 10px
      }
      p{
        width: 90%;
        margin: auto;
        font-size: 0.9em;
        text-align: left;
        padding: 10px
      }
      div{
        display: flex;
        width: 90%;
        margin-bottom: 15px;
        img{
          border: 1px solid $primary;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        p{
          color: $primary;
          font-size: 0.7em;
          font-weight: bolder;
          font-style: normal;
          .ages{
            font-weight: 100;
          }
        }
      }
    }

  }
}
#dots-con{
  text-align:center;
}
.dot{
  display:inline-block;
  background:lightgrey;
  padding:6px;
  border-radius:50%;
  margin:10px 5px 20px 5px;
}



 /* carrousel */






@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
