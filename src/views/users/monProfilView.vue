<template>
    <label class="file-upload">
        <div :style="`background-image:url('${url}${urlImage}')`" class="file-upload">
            <div class="container">
                <div class="infoUser">
                    <h1 class="textImage">{{ nameUser }}  </h1>
                   
                </div>
               
                <div class="infoUser textuser">
                   <h1 class="textuser">{{age}} ans</h1>  
                </div>
                
                <div class="infoUser textuser">
                    <svg width="20" height="20" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.49992 10.1345C4.41506 10.1345 4.3302 10.1206 4.24534 10.0928C4.16048 10.065 4.08248 10.0198 4.01134 9.95737C3.62603 9.60312 3.23531 9.20861 2.83917 8.77383C2.44339 8.33942 2.08409 7.88929 1.76125 7.42346C1.43842 6.95762 1.17336 6.48222 0.966087 5.99725C0.758809 5.51228 0.655532 5.03886 0.656254 4.577C0.656254 3.43119 1.02928 2.48617 1.77534 1.74192C2.52175 0.997305 3.42995 0.625 4.49992 0.625C5.56989 0.625 6.47809 0.997305 7.2245 1.74192C7.97056 2.48617 8.34359 3.43119 8.34359 4.577C8.34359 5.03886 8.24031 5.51065 8.03375 5.99237C7.8272 6.47374 7.56395 6.94896 7.244 7.41804C6.92442 7.88749 6.56674 8.33779 6.17096 8.76896C5.77518 9.20012 5.38428 9.59283 4.99825 9.94708C4.92928 10.0096 4.85092 10.0565 4.76317 10.0879C4.67506 10.119 4.58713 10.1345 4.49938 10.1345M4.50155 5.35429C4.74241 5.35429 4.94824 5.26835 5.11905 5.09646C5.28949 4.92493 5.37471 4.71856 5.37471 4.47733C5.37471 4.23611 5.28877 4.03028 5.11688 3.85983C4.94499 3.68939 4.73862 3.60417 4.49775 3.60417C4.25689 3.60417 4.05106 3.69011 3.88025 3.862C3.70945 4.03389 3.62423 4.24026 3.62459 4.48112C3.62495 4.72199 3.71071 4.92782 3.88188 5.09862C4.05305 5.26943 4.2596 5.35465 4.50155 5.35429Z"
                            fill="#F97068" />
                    </svg>
                    <h1 class="textImage textuser">{{ cityUser }} </h1>
                </div>
                <div class="infoUser ">
                    <img class="icon" src="./../../assets/pictures/home/logo-m.png" alt="">
                    <h1 v-if="children > 1" class="textImage textuser">{{ children }} enfants </h1>
                    <h1 v-else class="textImage textuser">{{ children }} enfant </h1>
                </div>

            </div>

        </div>
        <div class="round2 icon"  @click="modifierProfil">
            <AkPencil class="icon" />
        </div>
    </label>

    <div class="bodypage">
        <div class="suggestion-item" v-for="(perso, index) in personality" :key="index">
            {{ perso }}
        </div>
        <div class="suggestion-item" v-for="(perso, index) in hobby" :key="index">
            {{ perso }}
        </div>
    </div>
    <div class="ligne">

    </div>

    <div class="description">
        {{ description }}
    </div>
</template>

<script setup>
/*eslint-disable no-undef*/
import { computed, onMounted, ref } from 'vue';
import store from '@/store';
import { AkPencil } from '@kalimahapps/vue-icons';
import router from '@/router';
const cityUser = ref('')
const nameUser = ref('')
const age = ref(null)
const children = ref()
const personality = ref([])
const hobby = ref([])
const description = ref('')
const urlImage = ref('')
const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const user = computed(() => store.state.user || {});
onMounted(() => {

    fetchDecouverteProfil()
});

const modifierProfil = () => {
    router.push('/ModiferProfil')
}

const fetchDecouverteProfil = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/profiles/showProfil/${user.value.id}`, {
            method: 'get',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();

 
        personality.value = typeof result[0].personality === 'string'
            ? result[0].personality.split(',').map(item => item.trim())
            : result[0].personality;
        hobby.value = typeof result[0].personality === 'string'
            ? result[0].hobby.split(',').map(item => item.trim())
            : result[0].hobby;

        urlImage.value = result[0].selfie
        children.value = result[0].children
        cityUser.value = result[0].localisation
        description.value = result[0].description
        

        fetchUser()

    } catch (error) {
        console.error('Erreur lors du fetch showprofil :', error);
    }
}
const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajuste l'âge si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
const fetchUser = async () => {


    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/listUser/${user.value.id}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();

        age.value = calculateAge(result[0].birthdate);
        nameUser.value = result[0].firstname


    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
} 
</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 5px 20px;
    background-color: rgb(0, 0, 0, 0.4);
}

.ligne {
    background-color: black;
    height: 1px;
    margin: 30px
}
.textuser{
    font-weight: 300;
}

.description {
    width: 80vw;
    margin: auto;
    margin-bottom: 100px;
}

.bodypage {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    flex-direction: row;

    flex-wrap: wrap;
    align-items: center;
    color: $primary;
    font-weight: 600;
    gap: 10px;

    .suggestion-item {
        border: 1px solid;
        border-color: $primary;
        border-radius: 20px;
        padding: 10px;

    }

}

.infoUser {
    width: 100%;
    height: 30px;
    text-align: left;
    display: flex;
    align-items: center;

    font-size: 10px;
    color: whitesmoke;

    gap: 5px;

    .icon {

        height: 50%;
    }
}

.file-upload {
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;

    background-position: center;
    background-size: cover;
    align-items: left;
    justify-content: flex-end;

    margin: auto;

    .round2 {
        height: 50px;
        width: 50px;
        align-items: center;
        align-content: center;
        border-radius: 99999%;
        background-color: rgba(186, 203, 234, 1);
        position: absolute;
        right: 50px;
        margin-top: 100px;
        top: 295px;

        .icon {
            color: rgba(111, 131, 169, 1);
            height: 60%;
            width: 60%;
        }
    }
}
</style>