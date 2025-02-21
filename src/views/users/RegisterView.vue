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

            <p class="nomInput">GENRE</p>
            <div class="paddNone">
                <FlFilledPeopleCommunity class="icon" />
                <select name="sexe" id="" v-model="genre" required>
                    <option value=""></option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                </select>
            </div>
            <p class="nomInput2">DATE DE NAISSANCE</p>
            <div class="paddNone">
                <McBirthday2Fill class="icon" />
                <input type="date" class="dateN" placeholder="Date de naissance" v-model="birthdate" max="2006-01-01"
                    required />
            </div>
            <div>
                <CoBrandMailRu class="email" />
                <input type="email" placeholder="EMAIL" v-model="email" required />
            </div>
            <div>
                <CgKeyhole class="icon" />
                <input type="password" placeholder="MOT DE PASSE" v-model="password" required />
            </div>
            <div>
                <CgKeyhole class="icon" />
                <input type="password" placeholder="VALIDER MOT DE PASSE" v-model="password2" required />
            </div>
            <button type="submit" >SUIVANT</button>
        </form>

    </div>
</template>

<script setup>
/*eslint-disable no-undef*/
import router from '@/router';
import { ref } from 'vue';
import store from '@/store';
import { HeFilledUiUserProfile, IcProfileCircle, FlFilledPeopleCommunity, McBirthday2Fill, CoBrandMailRu, CgKeyhole} from '@kalimahapps/vue-icons';

const email = ref('');
const firstname = ref('');
const lastname = ref('');
const birthdate = ref('');
const password = ref('');
const password2 = ref('');

const genre = ref('');


const verify = () => {

    
    if (password.value.length && email.value.length && firstname.value.length && lastname.value.length && birthdate.value.length && password.value === password2.value) {
        register();
      
    } else {
        alert("Les mots de passe ne correspondent pas.");
    }
};



const register = async () => {
    const data = {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        birthdate: birthdate.value,
        password: password.value
    };

    try {
        const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/users/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            alert("Erreur lors de l'inscription.");
            return;
        }

        await response.json();
        login()
       
    } catch (err) {
        console.error('Error during register:', err);
    }
};
const setTokenStore = (token) => {
  const user = JSON.parse(atob(token.split('.')[1]));
  store.commit('setUser', user);
  store.commit('setToken', token);
  store.commit('createToken', token);

 
};

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
    
  };

  try {
    const response = await fetch('http://10.0.1.87:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    
    
    if (!response.ok) {
      console.log("ERREUR");
      alert("utilisateur inconnu ou mot de passe incorrect");
      return;
    }

    const result = await response.json();

    router.push('/profiles')
    setTokenStore(result.token);
  } catch (err) {
    console.error('Error during login:', err);
  }
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