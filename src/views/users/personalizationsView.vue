<!-- <template>

    <div class="">
        <div class="">
            <h2 class="">Création de votre profil</h2>
            <progress class="" :value="QuestionIndex" :max="max" />
        </div>

        <form @submit.prevent="fetchProfil" enctype="multipart/form-data" class=" ">

            <div v-if="QuestionIndex === 0">
                <h3>selectio</h3>

                <select name="sexe" id="">
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                </select>
            </div>


            <div v-if="QuestionIndex === 1">
                <p>vous etes un : </p>
                <select name="sexe" id="">
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                </select>
                <p>et vous rechercher : </p>
                <select name="sexe" id="">
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                </select>
            </div>

            <div v-if="QuestionIndex === 2">
                <p>une description pour votre profil </p>
                <textarea name="" id="" rows="10" cols="50"></textarea>
            </div>

            <div v-if="QuestionIndex === 3">
                <p>Votre ville :</p>
                <input type="text" v-model="ville" @input="filterCities" placeholder="Tapez le nom de votre ville" />
                <div class="suggestions" v-if="filteredCities">
                    <div class="suggestion-item" v-for="(city, index) in filteredCities" :key="index"
                        @click="selectCity(city)">
                        {{ city }}
                    </div>
                </div>
            </div>

            <div v-if="QuestionIndex === 4">
                <p>Félicitations, votre profil est maintenant complet !</p>
                <button class="" @click.prevent="Continuer">Continuer</button>
            </div>

            <div class="">
                <button class="" @click.prevent="precedent"
                    v-if="QuestionIndex > 0 && QuestionIndex < max">Précédent</button>
                <button class="" @click.prevent="suivant" v-if="QuestionIndex < max">Suivant</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted, computed } from 'vue';

const QuestionIndex = ref(0);
const max = ref(4);
const user = ref(computed(() => store.state.user));




const suivant = () => {
    if (QuestionIndex.value < max.value) {
        QuestionIndex.value++;
        //  fetchProfil()
    }
};

const precedent = () => {
    if (QuestionIndex.value > 0) {
        QuestionIndex.value--;
    }
};
const Continuer = () => {
    router.push('')
};




// Fonction pour envoyer les données au serveur
const fetchProfil = async () => {

    const fileInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('description', "t"); // Ajoute d'autres données
    formData.append('localisation', "t");
    formData.append('gender', "t");
    formData.append('sexual_preference', "t");
    formData.append('id_user', 10);

    const data = {
        description: "t",
        localisation: "t",
        gender: "t",// Assurez-vous que l'image est en base64
        sexual_preference: "t",
        id_user: 10
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/profiles/createProfil`, {
            method: 'POST',
            body: formData,
            //image: formData
        })

    } catch (error) {
        console.error('Erreur lors de l\'upload :', error);
    }

};


onMounted(() => {

});

</script>

<style scoped>

</style> -->
