<template>

    <section class="matches">
        <div v-for="match in matchs" :key="match.channel">
            <a :href="`${ipAddressFront}/conversation/${match.channel}`">
                <div>
                    <img :src="`${url}${match.selfie}`" alt="selfie">
                    <p>{{ match.firstname }}</p>
                </div>
            </a>

        </div>
    </section>

    <div class="container">
        <h2>Découvrez des profils</h2>
        <label class="file-upload" v-if="!sansUser" @click="opendesription">

            <div :style="`background-image:url('${url}${urlImage}')`" class="file-upload"></div>
            <h1 class="textImage">{{ nameImage }}, {{ age }} ans </h1>

            <div v-if="!open" class="description"> {{ description }} </div>

        </label>
        <div v-else>
            <div class="file-upload2">
                <img src="./../../assets/pictures/home/logo.png" alt="">
                <h1 class="match">Tous les profils ont été matchés ou il n’y a plus de profils à découvrir ! </h1>
            </div>
        </div>

        <div class="buttonRound" v-if="!sansUser">
            <div class="round2 icon" @click="suivantNo">
                <AkXSmall class="icon" />
            </div>
            <div v-if="idButton == 0" class="round" @click="suivantYes"> <img class="icon"
                    src="./../../assets/pictures/home/logo-m.png" alt="">
            </div>
            <div v-if="idButton == 1" class="round chiffre" @click="suivantYes"> 2 </div>
            <div v-if="idButton == 2" class="round chiffre" @click="suivantYes"> 1 </div>

        </div>
    </div>


</template>

<script setup>
/*eslint-disable no-undef*/
//sgit 
import { computed, onMounted, ref } from 'vue';
import { AkXSmall } from '@kalimahapps/vue-icons';
import store from '@/store';
const sansUser = ref(false)
const matchs = ref([]);
const user = computed(() => store.state.user || {});
const age = ref(null)
const nameImage = ref('')
const idUser = ref(0)
const idLiked = ref([])
const ipAddressFront = process.env.VUE_APP_IP_FRONT
const urlImage = ref('')

const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const nbId = ref(0)
const idButton = ref(0)
const description = ref('')
const open = ref(true)

const opendesription = () => {
    open.value = !open.value

}

let isClickable = true
const suivantYes = () => {
    if (!isClickable) return;
    open.value = true

    if (!idLiked.value.includes(idUser.value)) {
        fetchLikedID();
        fetchLikedShowID();
    }

    fetchDecouverteProfil();
    fetchLike();

 
    isClickable = false;
    navconv()

    const intervalId = setInterval(() => {
        if (idButton.value < 2) {
            idButton.value++;
        } else {
            idButton.value = 0;
            isClickable = true;
           
            clearInterval(intervalId);
        }
    }, 1000);
};


const suivantNo = () => {
    fetchDecouverteProfil()
    open.value = true
}
onMounted(() => {
    fetchLikedShowID()
    fetchDecouverteProfil()
    navconv()
});

const navconv = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/matchs/listMatch/${user.value.id}`, options).then(handleFetch);

    function handleFetch(response) {
        if (response.ok) {
            response.json()
                .then(data => {


                    data.forEach(listMatch => {
                        matchs.value.push({
                            firstname: listMatch.firstname,
                            selfie: listMatch.selfie,
                            channel: listMatch.id_channel,
                        })
                    });
                })
                .catch(error => console.error(error));
        }
        else {
            console.error(response.statusText);
        }
    }
}




const profilsNonLiques = ref([]);
const fetchDecouverteProfil = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/profiles/showProfil`, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error("Erreur lors de la récupération des données.");
            return;
        }
        const result = await response.json();

        // Filtre les profils pour n'afficher que ceux qui ne sont pas likés
        profilsNonLiques.value = result.filter(profil => !idLiked.value.includes(profil.id_user));


        if (profilsNonLiques.value.length === 0) {
            console.log("Tous les profils ont été likés !");
            sansUser.value = true
            return;
        }

        // Affiche le profil suivant parmi les non-likés
        const profil = profilsNonLiques.value[nbId.value % profilsNonLiques.value.length];
        urlImage.value = profil.selfie;
        idUser.value = profil.id_user;
        description.value = profil.description
        nbId.value = (nbId.value + 1) % profilsNonLiques.value.length;




        fetchUser();

    } catch (error) {
        console.error('Erreur lors du fetch showprofil :', error);
    }
};

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
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/listUser/${idUser.value}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();



        age.value = calculateAge(result[0].birthdate);
        nameImage.value = result[0].firstname

    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
}

const fetchLike = async () => {
    const data = {
        id_user_liker: user.value.id,
        id_user_liked: idUser.value
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/likes/addLikes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        await response.json();



    } catch (err) {
        console.error('Error during fetch like:', err);
    }
}

const fetchLikedID = async () => {
    const data = {
        id_user: user.value.id,
        id_liked: idUser.value
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/profiles/modifyProfil`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        // Vérifie si le statut de la réponse indique une erreur
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Profil modifié avec succès:', result); // Traiter le retour si nécessaire

    } catch (err) {
        console.error('Error during fetch like id:', err);
    }
};

const fetchLikedShowID = async () => {
    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/listUser/${user.value.id}`, {
            method: 'post',

        })

        if (!response.ok) {

            console.log(error);

            return;
        }
        const result = await response.json();




        idLiked.value = result[0].id_liked




    } catch (error) {
        console.error('Erreur lors du fetch user profilview :', error);
    }
};

</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

}

.description {
    padding: 5px 10px;
    color: white;
}

.chiffre {
    font-size: xx-large;
    opacity: 0.5;

}

.matches {
    display: flex;
    align-items: center;
    height: 100px;
    background-color: #FCE2E2;

    a {
        text-decoration: none;
        color: black;

        div {
            margin: 0 5px 0 5px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                display: flex;
                justify-content: center;
                border: 1px solid $primary;
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            p {
                font-size: 0.8em;
            }
        }

        div:nth-of-type(1) {
            margin-left: 15px;
        }
    }
}


h1 {
    font-weight: 300;
    padding: 10px;
    padding-left: 40px;
    font-size: medium;
    text-align: left
}

.buttonRound {
    margin: 20px;
    gap: 80px;
    display: flex;
    flex-direction: row;
}

.round {
    height: 90px;
    width: 90px;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    border-radius: 99999%;
    background-color: $white;


    img {
        height: 40%;

    }
}

.round2 {
    height: 90px;
    width: 90px;
    align-items: center;
    align-content: center;
    border-radius: 99999%;
    background-color: rgb(202, 202, 202);

    .icon {
        opacity: 0.5;
        width: 85%;
        height: 80%;
    }
}

.textImage {
    color: whitesmoke;

}

h2 {
    margin: 30px;
}

.file-upload {
    width: 350px;
    height: 450px;
    border: 1px solid rgba(249, 112, 104, 1);
    display: flex;
    flex-direction: column;
    background-color: $primary;
    background-position: center;
    background-size: cover;
    align-items: left;
    justify-content: left;
    border-radius: 35px;
    margin: auto;

}

.file-upload2 {
    width: 350px;
    height: 450px;
    border: 1px solid rgba(249, 112, 104, 1);
    display: flex;
    flex-direction: column;
    background-color: $primary;
    background-position: center;
    background-size: cover;
    align-items: left;
    justify-content: left;
    border-radius: 35px;
    margin: auto;
    padding-top: 70px;
    margin-bottom: 80px;

    img {
        background-color: rgb(0, 0, 0, 0.2);
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture {
    width: 60px;
    height: 60px;
}
</style>