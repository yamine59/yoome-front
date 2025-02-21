<template>

    <section>
        <h2>rejoignez nous</h2>

        <div class="socialsMedias">
            <img class="socialMedia" src="./../assets/pictures/home/heart.png" alt="">
            <img class="socialMedia" src="./../assets/pictures/home/heart.png" alt="">
            <img class="socialMedia" src="./../assets/pictures/home/heart.png" alt="">
        </div>

        <div class="legals">
            <p @click="cg" class="legal">Conditions d'utilisation</p>
            <p @click="mentions" class="legal">Mentions légales</p>
            <p @click="cookies" class="legal">Politique relative aux cookies</p>
            <p @click="contact" class="legal">Contactez-nous</p>
        </div>

        <h3 class="titlePayment">Modes de paiemant acceptés</h3>

        <div class="payments">
            <img class="payment" src="./../assets/pictures/home/heart.png" alt="">
            <img class="payment" src="./../assets/pictures/home/heart.png" alt="">
            <img class="payment" src="./../assets/pictures/home/heart.png" alt="">
            <img class="payment" src="./../assets/pictures/home/heart.png" alt="">
        </div>

        <p class="copyright">2024 Yoome. Tous droits réservés</p>

    </section>

</template>

<script setup>
import router from '@/router';


const cg = () => {
    router.push('/ConditionsGénérales')
}

const mentions = () => {
    router.push('/MentionsLégals')
}
const cookies = () => {
    router.push('/PolitiqueCookies')
}
const contact = () => {
    router.push('/Contact')
}
</script>

<style scoped lang="scss">

section{
    height: 50vh;
    h2{
        margin: 20px 0 15px 0;
        color: black;
        font-weight: 600;
        font-size: 1.2em;
        text-transform: uppercase;
    }
}

.socialMedia{
    width: 30px;
    height: 30px;
    margin: 0 10px 30px 10px;
}

.legal{
    border-bottom: 1px solid black;
    width: 70%;
    padding: 2px;
    margin: 0 auto 10px auto;
    text-align: left;
    color: black;
    font-size: 0.8em;
    font-weight: 600;
}

.titlePayment{
    color: black;
    width: 50%;
    margin: 5vh auto 2.5vh auto;
    font-weight: 600;
}

.payment{
    width: 30px;
    height: 30px;
    margin: 20px;
}

.copyright{
    font-size: 0.6em;
}
</style>