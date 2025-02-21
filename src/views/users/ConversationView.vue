<template>

  <section class="matches navuser">
    <div class="comeBack" @click="comeBack">
      <BsArrowLeftShort />
    </div>
    <div >
      <div  v-for="user in match" :key="user.username">

      <a href="">
        <div>
          <div>
            <img :src="`${url}${user.selfie}`" alt="selfie">
            <div class="otherData">
              <p>{{ user.firstname }}</p>
              <p>{{ user.age }} ans</p>
            </div>
          </div>
        </div>
      </a>

    </div>
    </div>
    
  </section>

  <div class="chat-container">

    <div class="chat-window">
      <div class="messages-container" ref="article">

        <div v-for="(val, index) in messages" :key="index"
          :class="[val.user === idUser ? 'right-bubble' : 'left-bubble']">
          <p class="message">
            <span class="firstname">{{ val.user }}</span>
            {{ val.message }}
          </p>
          <p class="hour">{{ val.hour }}</p>
        </div>

      </div>

      <div class="chat-input">
        <form @submit.prevent="sendMessage(username, text)">
          <input @input="handleTyping" class="writing" type="text" v-model="text" placeholder="Ecrivez votre message" />
          <button class="sendMessage" type="submit">
            <BsArrowUpCircleFill />
          </button>
          <button class="smiley" type="button" @click="toggleEmojiPicker">😊</button>
          <EmojiPicker v-if="showEmojiPicker" @select="addEmoji" style="position: absolute; bottom: 50px; right: 0;" />
        </form>
      </div>
      <div class="lignne"></div>
      <div class="typing-indicator" v-if="typingUser">
        <section class="exe1">
          <p>{{ typingUser }} est en train d'écrire...</p>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </div>

    </div>
  </div>
  <!-- <emoji-picker
          v-if="showEmojiPicker"
          @emoji-click="addEmoji"
          style="position: absolute; bottom: 50px; left: 0;"
        /> -->



</template>

<script setup>
/*eslint-disable no-undef*/
import { useRouter } from 'vue-router';

import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { BsArrowUpCircleFill, BsArrowLeftShort } from '@kalimahapps/vue-icons';
import store from '@/store';

//emoji
// pour installer -> npm install vue3-emoji-picker
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
const showEmojiPicker = ref(false);

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Function to add the selected emoji to the message input
const addEmoji = (emoji) => {
  console.log("emoji", emoji);

  text.value += emoji.i; // Ajoute l'émoji à la zone de texte
  showEmojiPicker.value = false; // Masquer le sélecteur après sélection
};



import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const router = useRouter();
const user = computed(() => store.state.user || {});
const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const idUser = user.value.id;
const match = ref([]);
const route = useRoute()
const id = route.params.id

console.log("idUser", idUser);





//-----------------------Return to matches

const comeBack = () => {
  router.push('/matchs')
}



//---------------------------------------------------- retreive message

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
};

fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/messages/listMessage/${id}`, options).then(handleFetch);

function handleFetch(response) {

  if (response.ok) {
    response.json()
      .then(data => {
        console.log("message", data);

        data.forEach(allMessage => {
          messages.value.push({
            message: allMessage.message,
            hour: format(parseISO(allMessage.created_at), 'HH:mm', { locale: fr }),
            user: allMessage.id_user
          })

        });

      })
      .catch(error => console.error(error));
  }
  else {
    console.error(response.statusText);
  }
}

//---------------------------------------------------- show the current match

const optionsMatch = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // body: id,
  }
};

fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/matchs/match?idUser=${idUser}&id=${id}`, optionsMatch).then(handleFetch2);

function handleFetch2(response) {

  if (response.ok) {
    response.json()
      .then(user => {

        let ageOfperson;

        const calculateAge = (birthdate) => {

          const birthDate = new Date(birthdate);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return ageOfperson = age
        };
        calculateAge(user[0].birthdate)



        match.value.push({
          firstname: user[0].firstname,
          selfie: user[0].selfie,
          age: ageOfperson
        })
        console.log(match.value);

      })
      .catch(error => console.error(error));
  }
  else {
    console.error(response.statusText);
  }
}




//-------------------------------------- WEBSOCKET

const username = ref(user.value.firstname)

const text = ref(null)
const messages = ref([])
const socket = new WebSocket(`ws://${process.env.VUE_APP_WEB_SOCKET}`)

//sendMessage
const sendMessage = async () => {

  const date = new Date();
  let sendingTime = null;
  let sendingTimeChat = null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hour = String(date.getHours());
  const minute = String(date.getMinutes());
  const second = String(date.getSeconds());

  sendingTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  sendingTimeChat = `${hour}:${minute}`;

  const data = {
    message: text.value,
    id_channel: id,
    id_user: idUser,
    hour: sendingTime
  };

  try {
    const response = await fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/messages/addMessage`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      console.log("ERREUR");
      alert("Impossible de sauvegarder le message");
      return;
    }

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error('Message non sauvegarder:', err);
  }
  //TODO username et IDUSER

  const messageData = { user: idUser, message: text.value, hour: sendingTimeChat };
  // Send the message data to the server using WebSockets
  socket.send(JSON.stringify(messageData))
  // Add the message data to the messages array
  messages.value.push(messageData)
  // Clear the text input
  text.value = null;

  scrollEveryMessage();
}




// Define a WebSocket 'onmessage' event handler to receive messages from the server
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  messages.value.push(message);
}





//------------------------------- SCROLL

//------------------ go to the end + automatic scroll


const article = ref(null);

// onMounted(() => {
//       setTimeout(() => {
//         window.scrollTo(0, document.body.scrollHeight);
//       }, 300); 
//     });

// function goToTheEnd(){
//   setTimeout(() => {
//     window.scrollTo(0, document.body.scrollHeight);
//   }, 50);
// }

const scrollToEnd = () => {
  if (article.value) {
    setTimeout(() => {
      const { offsetTop, clientHeight } = article.value;
      console.log('cx', clientHeight);

      const end = offsetTop + clientHeight - (620);
      console.log('end', end);

      window.scrollTo({ top: end });
    }, 100);
  }
};

const scrollEveryMessage = () => {
  if (article.value) {
    setTimeout(() => {
      const { offsetTop, clientHeight } = article.value;
      const end = offsetTop + clientHeight - (620);
      window.scrollTo({ top: end, behavior: 'smooth' });
    }, 100);
  }
};


onMounted(() => {
  scrollToEnd();
});

//**************************

const isTyping = ref(false);
const typingUser = ref(null);

const handleTyping = () => {
  if (!isTyping.value) {
    isTyping.value = true;
    socket.send(JSON.stringify({ user: username.value, typing: true }));
  }

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    isTyping.value = false;
    socket.send(JSON.stringify({ user: username.value, typing: false }));
  }, 1000);
};

let typingTimeout;

text.value = ''; // Assure-toi d'initialiser text

socket.onmessage = (event) => {
  console.log(event);

  const message = JSON.parse(event.data);
  console.log('bugname', message);

  if (message.typing !== undefined) {
    typingUser.value = message.typing ? message.user : null;
  } else {
    messages.value.push(message);
  }
};




</script>

<style scoped lang="scss">
@import './../../style/variablecouleur.scss';
.navuser{
 
  width: 100%;
  top: 70px;
  left: 0;
  position: fixed;
}
.lignne{
  width: 100%;
  height: 2px;
background-color:white ;
  padding-bottom: 300px;
}

.matches {
  display: flex;
  height: 100px;
  background-color: #FCE2E2;
  justify-content: flex-start;
  align-items: center;

  .comeBack {
    cursor: pointer;
    height: 80%;
    font-size: 1.5em;
  }

  a {
    text-decoration: none;
    color: black;

    div {
      margin: 0 5px 0 5px;
      display: flex;
      justify-content: flex-start;
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
        margin-left: 10px;
        font-size: 1em;
        color: $primary;

      }
    }

    /*div:nth-of-type(1){
            display: flex;
            flex-direction: row;
            margin-left: 15px;
        }*/
    .otherData {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      p:nth-of-type(2) {
        font-size: 0.7em;
      }
    }
  }
}

.chat-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #3d2aac;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #333;
  text-align: center;
  color: white;
}

.modal-content input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
}

.modal-content button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #9b59b6;
  color: white;
}

.chat-window {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

form {
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
}

.chat-input {
  background-color: white;
  padding: 5px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.writing {
  padding: 5px;
  border: none;
  border-radius: 10px;
  background-color: $primary;
  color: white;
  margin-left: 20px;
  width: 90%;
  height: 50%;
}

.chat-input .sendMessage {
  background-color: white;
  color: rgb(249, 112, 104);
  padding: 5px;
  margin-left: 5px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 2em;
  display: flex;
  margin: 5px;

}

.smiley {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 5px;
  text-align: center;
  height: 10px;
  padding: 15px;
  margin: 5px;
  font-size: 1em;
}

.messages-container {
  background-color: white;
}

.right-bubble {
  background-color: #FCE2E2;
  border-radius: 15px;
  padding: 10px 15px;
  word-wrap: break-word;
  margin: 10px;
  float: right;
  color: black;
  width: 60%;
  text-align: right;
}

.left-bubble {
  background-color: #DBE4F5;
  border-radius: 15px;
  padding: 5px 10px;
  word-wrap: break-word;
  margin: 10px;
  float: left;
  color: black;
  width: 60%;
  text-align: left;
}

.firstname {
  display: none;
}

.hour {
  display: block;
  font-size: 0.72em;
  margin-top: 3px
}

section.exe1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.exe1 div {
  display: inline-block;
  height: 10px;
  width: 10px;
  background-color: $primary;
  border-radius: 50%;
  margin: 5px;
  animation: bounce 700ms infinite linear;
}

.exe1 div:nth-child(2) {
  animation-delay: 100ms;
}

.exe1 div:nth-child(3) {
  animation-delay: 200ms;
}


@keyframes bounce {
  20% {
    translate: 0 -50%;
  }

  60% {
    translate: 0 -50%;
  }
}
</style>