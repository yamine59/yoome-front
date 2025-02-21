<template>

   <section class="assistance">
    <h1>ASSISTANCE</h1>

    <div>
        <div>
            <BsShieldLockFill/>
            <p>Guide Yoome</p>
        </div>
    </div>

    <div>
        <div>
            <BsShieldLockFill/>
            <p>Sécurité et confidentialité</p>
        </div>
    </div>

    <div>
        <div>
            <JaWrench/>
            <p>Dépannage technique</p>
        </div>
    </div>

    <div>
        <div>
            <CgProfile/>
            <p>Gestion du compte</p>
        </div>
    </div>

    <div>
        <div>
            <AnTwotoneExclamationCircle/>
            <p>Signaler un problème</p>
        </div>
        
    </div>

   </section>

   <section class="faq">
    <h2>FAQ</h2>

   <!-- TODO carroussel -->

   <div class="accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <div class="accordion-header" @click="toggle(index)">
        <h3>{{ item.title }}</h3>
        <span class="iconOpening">{{ isOpen(index) ? '-' : '+' }}</span>
      </div>
      <transition name="fade">
        <div v-if="isOpen(index)" class="accordion-content">
          <p>{{ item.content }}</p>
        </div>
      </transition>
    </div>
  </div>

   </section>

</template>

<script setup>
import { ref } from 'vue'
import { BsShieldLockFill, JaWrench, AnTwotoneExclamationCircle,CgProfile } from '@kalimahapps/vue-icons';

    const items = ref([
  { title: 'Que faire si je ne peux pas me connecter ?', content: 'Vérifiez vos identifiants : Assurez-vous que votre e-mail et mot de passe sont corrects. Mot de passe oublié : Cliquez sur "Mot de passe oublié" pour le réinitialiser. Contactez-nous si le problème persiste à [email/support].' },
  { title: 'Comment puis-je signaler un utilisateur ?', content: 'Pour l\'instant, cette fonctionnalité n\'est pas implémentée ' },
  { title: 'Est-il possible e susoendre mon compte ?', content: 'Pour l\'instant, cette fonctionnalité n\'est pas implémentée ' },
  { title: 'Comment fonctionne l\'algorithme?', content: 'Ceci est un secret bien gardé !' },
]);

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const isOpen = (index) => {
  return openIndex.value === index;
};

</script>

<style scoped lang="scss">
@import './../../style/variablecouleur.scss';

.assistance{
    padding-top: 30px;
    width: 90%;
    margin: 30px auto;
    border: 1px solid $primary;
    border-radius: 10px;
    background-color: white;
    h1{
        color: $primary;
        font-size: 1.2em;
        margin-bottom: 30px;
    }
    div{
        padding: 5px;

        div{
            display: grid;
            grid-template-columns: 30px 1fr;
            width: 60%;
            text-align: left;
            margin: auto;
        }
        &:nth-child(2){
            margin-top: 40px;
        }
        &:nth-child(6){
            margin-bottom: 40px;
        }
    }  
}

.faq{
    background-color: white;
    padding-bottom: 40px;
    h2{
        color: $primary;
        text-align: left;
        font-size: 1.2em;
        width: 80%;
        margin: auto;
    }
    .accordion-item{
        text-align: left;
        width: 80%;
        margin: auto;
        padding: 5px 10px;
        font-size: 0.8em;
        margin-top: 15px;
        border-bottom: 1px solid lightgrey;
        .accordion-header{
            display: grid;
            grid-template-columns: 1fr 10px;
            justify-content: space-between;
            align-items: center;
        }
        .iconOpening{
            font-size: 1.5em;
            color: $primary;
        }
    }
}

</style>