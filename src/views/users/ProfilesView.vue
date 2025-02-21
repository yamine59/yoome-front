<template>
    <div class="bodyRegister , logo-repete">
        <div class="progressFull">
            <div :style="`width:${getPercentage()}%`" class="progress"></div>
        </div>


        <div class="bodypage" v-if="QuestionIndex === 0">
            <p>1/6. Combien d’enfants avez-vous ? </p>
           
            <div class="suggestion-item" v-for="(question, index) in question1" :key="index"
                @click="add(question, index)" :class="{ selected: selectedQuestionIndex === index }">
                {{ question }}
            </div>
        </div>

        <div class="bodypage" v-if="QuestionIndex === 1">
            <p>2/6. Quelle est votre situation ? </p>
            <div class="suggestion-item" v-for="(question, index) in question2" :key="index"
                @click="add(question, index)" :class="{ selected: selectedQuestionIndex === index }">
                {{ question }}
            </div>
        </div>

        <div class="bodypage2" v-if="QuestionIndex === 2">
            <p>3/6. Décrivez-vous . 3 MAX </p>
            <div class="characterTraits-container">
                <div class="characterTraits-item" v-for="(question, index) in question3" :key="index"
                    @click="toggleSelection(index, question)" :class="{ selected: descrip.includes(question) }">
                    {{ question }}
                </div>
            </div>
        </div>
        <div class="bodypage2" v-if="QuestionIndex === 3">
            <p>4/6. Qu'aimer-vous ? 3 MAX</p>
            <div class="characterTraits-container">
                <div class="characterTraits-item" v-for="(question, index) in question4" :key="index"
                    @click="toggleSelection(index, question)" :class="{ selected: like.includes(question) }">
                    {{ question }}
                </div>
            </div>
        </div>

        <div class="bodypage3" v-if="QuestionIndex === 4">
            <h3>5/6. Ajouter votre <br> photo principale </h3>


            <!-- <img v-if="imageUrl" :src="imageUrl" alt="Aperçu de votre photo" class="apercuImage"><br>

            <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
             -->
             <label class="file-upload">
                <input type="file" id="image" name="image" accept="image/*" @change="onFileChange" />
                <!-- <img v-if="imageUrl" :src="imageUrl" alt="Aperçu de votre photo" class="file-upload"> -->
                <div v-if="imageUrl" :style="`background-image:url('${imageUrl}')`" class="file-upload"></div>
                <MdOutlinedAddAPhoto v-if="!imageUrl" class="uploadPicture"/>
            </label>
            <div class="texticonimage">

                <p>
                    <AnOutlinedCheckCircle class="icon" />
                    Soyez reconnaissable
                </p>
                <p>
                    <AnOutlinedCheckCircle class="icon" />
                    N’inclut pas de 2ème personne
                </p>
                <p>
                    <AnOutlinedCheckCircle class="icon" />
                    Ne contient pas de photos inappropriées
                </p>
                <p>
                    <AnOutlinedCheckCircle class="icon" />
                    N’est pas floues ou de mauvaise qualité
                </p>
            </div>



        </div>

        <div @submit.prevent class="bodypage" v-if="QuestionIndex === 5">
            <p class="titreInfo">INFORMATION SUPPLEMENTAIRE</p>
            <p class="nomInput3">VOTRE VILLE</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="ville" id="ville" v-model="localisation" required>
                    <option value=""></option>
                    <option value="lille">Lille</option>
                    <option value="tourcoing">Tourcoing</option>
                    <option value="roubaix">Roubaix</option>
                    <option value="paris">Paris</option>
                    <option value="marseille">Marseille</option>
                    <option value="lyon">Lyon</option>
                    <option value="toulouse">Toulouse</option>
                    <option value="nice">Nice</option>
                    <option value="nantes">Nantes</option>
                    <option value="strasbourg">Strasbourg</option>
                    <option value="montpellier">Montpellier</option>
                    <option value="bordeaux">Bordeaux</option>
                </select>
            </div>
            <p class="nomInput2">GENRE RECHERCHÉ</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="sexe" id="" v-model="genreRecherche" required>
                    <option value=""></option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                </select>
            </div>
            <div class="textarea">
                <MdDescription class="email" />
                <textarea placeholder="Décrivez-vous ainsi que la personne de vos rêves." name="" v-model="description" id=""></textarea>
            </div>
            <button type="submit" v-if="QuestionIndex === 5" @click="continuer" >continuer</button>
        </div>
        <button type="submit" @click="suivant" v-if="QuestionIndex <5" :disabled="!disa">SUIVANT</button>
        
    </div>
</template>

<script setup>
/*eslint-disable no-undef*/
import router from '@/router';
import { ref } from 'vue';
import { FlFilledPeopleCommunity, MdDescription, AnOutlinedCheckCircle,MdOutlinedAddAPhoto } from '@kalimahapps/vue-icons';
import { computed } from 'vue';
import store from '@/store';

const user = computed(() => store.state.user || {});

const question1 = ["1", "2", "3", "4", "5 ET +"];
const question2 = ["CÉLIBATAIRE", "SÉPARÉ/ÉE", "DIVORCÉ/ÉE", "VEUF/VEUVE"];
const question3 = [
    "EMPATHIQUE",
    "ATTENTIONNÉ/E",
    "CRÉATIF/VE",
    "AMBITIEUX/IEUSE",
    "INTROVERTI",
    "CURIEUX/EUSE",
    "ORGANISÉ/E",
    "EXTRAVERTI",
    "AVENTURIER",
    "PASSIONNÉ/E",
    "PATIENT/E",
    "RÉSERVÉ",
    
    "CALME",
    
]
const question4 = [
    "PHOTOGRAPHIE",
    "JUNK FOOD",
    "RANDONNÉE",
    "HEALTHY FOOD",
    "MANGA",
    "LECTURE",
    "MUSIQUE",
    "VOYAGES",
    "JEUX VIDÉOS",
    "ANIMAUX",
    "SPORT",
    "MUSÉE",
    "SOIRÉES ENTRE AMIS",
    "CINÉMA/SÉRIES TV",
];


const nbenfant = ref('');
const situation = ref('');
const descrip = ref([])
const like = ref([])
const localisation = ref('')
const genreRecherche =ref('')
const description = ref('')

const selectedQuestionIndex = ref(null);
const QuestionIndex = ref(0);
const max = ref(5);
const disa = ref(false)
const imageUrl = ref('');
const imageName = ref('');
const getPercentage = () => {
    return (QuestionIndex.value / max.value) * 100;
};

const continuer = () => {


    fetchProfil();
 
}

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

        imageName.value = file.name;  // Stocke le nom de l'image
        const reader = new FileReader();

        reader.onload = (e) => {
            imageUrl.value = e.target.result; // Contient les données de l'image en base64

        };
        if (imageName.value.length >= 1) {
            disa.value = true
        } else disa.value = false
        reader.readAsDataURL(file); // Convertit le fichier en Base64
    }
};
const add = (question, index) => {
    selectedQuestionIndex.value = index; // Mettez à jour l'index sélectionné

    if (QuestionIndex.value === 0) {
        nbenfant.value = question; // Mettez à jour le nombre d'enfants

        
        disa.value = true
    }
    if (QuestionIndex.value === 1) {
        situation.value = question;
        disa.value = true
    }



};

const toggleSelection = (index, question) => {
    if (QuestionIndex.value === 2) {

        if (descrip.value.includes(question)) {
            descrip.value = descrip.value.filter(item => item !== question);
        } else if (descrip.value.length < 3) {
            descrip.value.push(question);



        }
        if (descrip.value.length >= 1) {
            disa.value = true
        } else disa.value = false
    }
    if (QuestionIndex.value === 3) {

        if (like.value.includes(question)) {
            like.value = like.value.filter(item => item !== question);
        } else if (like.value.length < 3) {
            like.value.push(question);


        }
        if (like.value.length >= 1) {
            disa.value = true
        } else disa.value = false
    }


};
const fileInput = ref(null)
const suivant = () => {
    if (QuestionIndex.value === 4 ){
        fileInput.value = document.getElementById('image');
    }
    selectedQuestionIndex.value = "";
    QuestionIndex.value++;
    disa.value = false
 
    

   
};

const fetchProfil = async () => {

    const formData = new FormData();
    formData.append('children', nbenfant.value);
    formData.append('situation', situation.value);
    formData.append('personality', descrip.value);
    formData.append('hobby', like.value);
    formData.append('description', description.value); // Ajoute d'autres données
    formData.append('localisation',localisation.value);
    formData.append('image', fileInput.value.files[0]);
    formData.append('sexual_preference', genreRecherche.value);
    formData.append('id_user',user.value.id);
    

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/profiles/createProfil`, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            alert("inscription du profil deja existant  ");
            console.log(error);
            
            return;
        }
        router.push('/')
    } catch (error) {
        console.error('Erreur lors du fetch profil :', error);
    }

};

</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.icon {

    color: $primary;
}

button{
    z-index: 50; 
}

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

.logo-repete {
    position: relative; /* Set position relative for pseudo-element */
    width: 100%;
    height: 100%;
}

.logo-repete::before {
    content: ''; /* Necessary for the pseudo-element */
    position: absolute; /* Position it absolutely */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('./../../../public/pattern.png'); 
    background-size: 60px;
    background-repeat: repeat;
    opacity: 0.1; /* Set opacity for the background image */
    z-index: 0; /* Send it to the back */
}

.file-upload {
    width: 350px;
    height: 400px;
    border: 1px solid rgba(249, 112, 104, 1);
    display: flex;
    background-position: center;
    background-size: cover;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 35px;
    margin: auto;
}

.file-upload input[type="file"] {
    display: none;
}

.uploadPicture{
    width: 60px;
    height: 60px;
}
.bodyRegister {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 1; 

    .progressFull {
        height: 10px;
        background-color: rgba(255, 255, 255, 1);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: start;
        left: 0;
        width: 100%;
        top: 0px;
        z-index: 5;

        .progress {
            z-index: 6;
            height: 50%;
            transition: 0.5s;
            background-color: rgba(250, 177, 173, 1);
        }
    }

    .bodypage {
        display: flex;
        margin-top: 100px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: $primary;
        font-weight: 600;
        z-index: 50; 
        h3,
        p {
            color: black;
            margin-bottom: 40px;

        }

        .apercuImage {
            background-color: aqua;
            height: 80%;
            width: 80%;

        }

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

    .bodypage2 {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: $primary;
        font-weight: 600;
        z-index: 50; 

        h3,
        p {
            color: black;
            margin-bottom: 40px;
        }

        .characterTraits-container {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;

            width: 85%;

            .characterTraits-item {
                display: flex;
                margin: 10px;
                flex-direction: row;
                align-items: center;
                height: 50px;
                border: 1px solid;
                border-color: $primary;
                border-radius: 999px;
                text-align: center;
                padding: 0 20px;
                cursor: pointer;

                input {
                    width: 80vw;
                    height: 40px;
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
        }


    }

    .bodypage3 {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: $primary;
        font-weight: 600;
        z-index: 50; 
        .texticonimage {
            margin-top: 50px;
        }

        h3,
        p {
            text-align: left;
            margin: 5px;
            color: black;
        }
    }
}
</style>