<template>
  <div class="slider" 
       @mousedown="startDrag" 
       @mouseup="endDrag" 
       @mouseleave="endDrag" 
       @mousemove="onDrag"
       @touchstart="startDragTouch" 
       @touchend="endDrag" 
       @touchmove="onDragTouch">
    <div class="slides" :style="{transform: `translateX(calc(-${currentSlide * 100}% + 0px))` }">
      <div :style="{margin: '0px'}" class="slide" v-for="(slide, index) in slides" :key="index">
          <div class="slideContent">
              <h3>"Après mon divorce, je pensais que ma vie amoureuse était terminée."</h3>
              <p>Ce site m'a donné espoir. Les profils sont serieux, et les outils pour trouver des gens compatibles sont vraiment efficaces. J'ai trouvé quelqu'un avec qui je peux construire une nouvelle vie, tout en fardant ma fille comme priorité"</p>
              <div>
                <img class="reviewPictures" src="./../assets/pictures/home/heart.png" alt="">
                <p class="strong"> <em>Julie <span class="ages">36 ans,</span><br>
                    MAMAN D'UNE ADOLESCENTE </em>
                </p>
              </div>
          </div>
      </div>
    </div>
    <div class="dots">
      <span 
        v-for="(slide, index) in slides" 
        :key="index" 
        :class="{ active: currentSlide === index }" 
        @click="goToSlide(index)">
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentSlide = ref(0);
const slides = ref([0, 1, 2, 3, 4]);

const isDragging = ref(false);
const startX = ref(0);
const offsetX = ref(0);

const startDrag = (event) => {
  isDragging.value = true;
  startX.value = event.clientX;
  offsetX.value = 0;
};

const startDragTouch = (event) => {
  isDragging.value = true;
  startX.value = event.touches[0].clientX; 
  offsetX.value = 0;
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  offsetX.value = event.clientX - startX.value;

  if (Math.abs(offsetX.value) > 50) {
      if (offsetX.value > 0) {
          prevSlide();
      } else {
          nextSlide();
      }
      isDragging.value = false;
  }
};

const onDragTouch = (event) => {
  if (!isDragging.value) return;
  offsetX.value = event.touches[0].clientX - startX.value;

  if (Math.abs(offsetX.value) > 50) {
      if (offsetX.value > 0) {
          prevSlide();
      } else {
          nextSlide();
      }
      isDragging.value = false;
  }
};

const endDrag = () => {
  isDragging.value = false;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

  
  <style scoped lang="scss">
  * {
    box-sizing: border-box;
  }
  $primary: rgba(249, 112, 104, 1);
  $second: rgba(219, 228, 245, 1);
  $black: rgba(34, 35, 38, 1);
  $white: rgba(255, 236, 236, 1);

  .slider {
    position: relative;
    width: 80%;
    margin: auto;
    cursor: grab;
    padding: 10px;

  }
  
  .slides {
    display: flex;
    transition: transform 0.3s ease;
    /*gap: 20px;*/
  }
  
  .slide {
    position: relative;
    min-width: 100%;
    max-width: 100%;

    .slideContent {
        border: 1px solid lightgrey;
        min-width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        padding: 0 20px;
        margin: auto;
        user-select: none;
    }
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
      .strong{
        color: $primary;
        font-size: 0.7em;
        font-weight: bolder;
        font-style: normal;
        .ages{
            color: $primary;
            font-weight: 100;
        }
      }
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .dots span {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: lightgray;
    margin: 0 5px 30px 0;
    cursor: pointer;

  }
  
  .dots span.active {
    background: $primary;
  }
  </style>
  