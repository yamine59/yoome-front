<template>
    <div class="bodyRegister">

        <h3>Modifier mon profil</h3>
        <form @submit.prevent="verify" class="bodypage">

            <h4> INFORMATION PERSONNELLES</h4>
            <p>Nom d'utilisateur :</p>
            <input type="text" placeholder="Modifier le nom d’utilisateur" v-model="lastname" required />


            <p>Prenom d'utilisateur : </p>
            <input type="text" placeholder="Modifier le prenom d’utilisateur" v-model="firstname" required />


            <p>Adresse mail :</p>
            <input type="email" placeholder="Modifier l’adresse email" v-model="email" required />

            <div class="ligne"></div>
            <!-- 
            <h4> DESCRIPTION</h4>

            <p>À propos de moi : </p>
            <textarea placeholder="Parlez un peu de vous..." name=""  v-model="description" rows="5"  id=""></textarea>

            <div class="ligne"></div>

            <h4> PREFERENCE DE RENCONTRE</h4>

            <p class="nomInput2">GENRE RECHERCHÉ</p>
            <div class="paddNone">
               
                <select name="sexe" id="" v-model="genreRecherche" required>
                    <option value=""></option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                </select>
            </div>

            <div class="ligne"></div> -->

            <h4> MOT DE PASSE</h4>
            <p class="">Modifier le mot de passe :</p>

            <div>
                <input type="password" placeholder=" Nouveau mot de passe" v-model="password" required />
            </div>
            <div>
                <input type="password" placeholder="Confirmer le nouveau mot de passe" v-model="password2" required />
            </div>


            <button type="submit">Sauvegarder</button>
        </form>
        <div class="ligne"></div>
        <button type="">supprimer mon compte </button>
        <h4>Cette action est définitive. <br> Votre profil, ainsi que toutes vos données, <br> seront supprimés de façon
            irréversible.</h4>
        <div class="ligne"></div>
    </div>
</template>

<script setup>
/*eslint-disable no-undef*/
import router from '@/router';
import { computed, ref } from 'vue';
import store from '@/store';

const user = computed(() => store.state.user || {});

const email = ref('');
const firstname = ref('');
const lastname = ref('');
// const birthdate = ref('');
// const description = ref('')
// const genreRecherche = ref('')
// const oldpassword = ref('');
const password = ref('');
const password2 = ref('');




const verify = () => {


    if (password.value.length > 0 && email.value.length > 0 &&
        firstname.value.length > 0 && lastname.value.length > 0 &&
        password.value === password2.value) {
        fetchModify(); // Appelle la fonction pour modifier les informations de l'utilisateur
    } else {
        alert("Les mots de passe ne correspondent pas.");
    }

};



const fetchModify = async () => {
    const data = {
       
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        birthdate: user.value.birthdate,
        password: password.value
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/modifyUser/${user.value.id}`, {
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
        router.push('/monProfil')
        console.log('Profil modifié avec succès:', result); // Traiter le retour si nécessaire

    } catch (err) {
        console.error('Error during fetch modifier user', err);
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/variablecouleur.scss";

.bodyRegister {
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;

}

h3 {
    color: $primary;
    padding: 30px;
}

h4 {
    padding-bottom: 10px;
}

p {

    text-align: left;
}

input,
select,
textarea {
    border: 0;
    padding: 5px;
    width: 100%;
    margin: 10px 0;
    border-radius: 5px;
    background-color: rgba(227, 227, 227, 1)
}

.ligne {
    height: 1px;
    width: 80%;
    background-color: $primary;
    margin: 20px;
}

button {
    height: 10px;
    border-radius: 5px;

}
</style>