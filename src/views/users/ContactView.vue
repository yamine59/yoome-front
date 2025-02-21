<template>
    <div class="bodyRegister">
       

        <form @submit.prevent="verify" class="bodypage" >
            <div>
                <HeFilledUiUserProfile class="icon" />
                <input type="text" placeholder="NOM" v-model="lastname" required />
            </div>
            <div>
                <IcProfileCircle class="icon" />
                <input type="text" placeholder="PRENOM" v-model="firstname" required />
            </div>
            <div>
                <CoBrandMailRu class="email" />
                <input type="email" placeholder="EMAIL" v-model="email" required />
            </div>
            <div>
                <BxPhone class="icon" />
                <input type="tel" placeholder="TÉLÉPHONE"  v-model="telephone" pattern="[0-9]{10}" required />
            </div>
            <div class="textarea">
                <MdDescription class="email" />
                <textarea placeholder="ENTRER VOTRE MESSAGE" name="" v-model="description" required id=""></textarea>
            </div>
            <button type="submit">ENVOYER VOTRE MESSAGE</button>
        </form>

    </div>
</template>

<script setup>

import router from '@/router';
import { ref } from 'vue';
import { HeFilledUiUserProfile, IcProfileCircle,BxPhone,  CoBrandMailRu, MdDescription } from '@kalimahapps/vue-icons';

const email = ref('');
const firstname = ref('');
const lastname = ref('');
// const birthdate = ref('');
// const password = ref('');
// const password2 = ref('');

// const genre = ref('');


const verify = () => {
       router.push('/profiles')

};




</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.suggestion-item {
    padding: 10px;
    cursor: pointer;
    display: flex; // Ajouté pour permettre l'alignement flex
    justify-content: center; // Centrer le texte horizontalement
    align-items: center; // Centrer le texte verticalement
    text-align: center; // C
}

.selected {
    background-color: $primary;
    /* Change la couleur de fond à vert */
    color: white;
    /* Change la couleur du texte si nécessaire */
}

.bodyRegister {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: $white;

   

    .bodypage {
        display: flex;
        margin-top: 50px;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        select,
        .dateN {
            width: 80vw;
            height: 40px;
            margin-right: 15px;
            background-color: $white;
            border: 0;
            border-radius: 25px;
        }

        .titreInfo {
            margin-bottom: 50px;
        }

        .nomInput {
            padding-right: 250px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .nomInput2 {
            padding-right: 140px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .nomInput3 {
            padding-right: 210px;
            align-items: baseline;
            margin: 0;
            color: $primary;
        }

        .paddNone {
            margin-top: 5px;
        }

        div {
            display: flex;
            margin: 15px;
            align-items: center;
            width: 80vw;
            height: 50px;
            border: 1px solid;
            border-color: $primary;
            border-radius: 999px;
            text-align: center;

            .email {
                width: 15%;
                height: 60%;
                color: $primary;
            }

            .icon {
                width: 15%;
                height: 70%;
                color: $primary;
            }

            input {
                width: 80vw;
                height: 40px;
                background-color: $white;
                border: 0;
                margin-right: 15px;
            }

            textarea {
                width: 80vw;
                height: 150px;
                background-color: $white;
                border: 0;
                margin-right: 15px;
            }

            p {
                color: $primary;
                padding-left: 48%;
                padding-right: 50%;
            }
        }

       

        .textarea {
            display: flex;
            margin: 15px;
            align-items: center;
            width: 80vw;
            height: 200px;
            border: 1px solid;
            border-color: $primary;
            border-radius: 20px;
        }
    }
    

        
    
}
</style>