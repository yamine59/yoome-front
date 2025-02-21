<template>



    <section class="matches">
        <div v-for="match in matchs" :key="match.channel" >
            <a :href="`${ipAddressFront}/conversation/${match.channel}`">
                <div>
                    <img :src="`${url}${match.selfie}`" alt="selfie">
                    <p>{{match.firstname}}</p>
                </div>
            </a>

        </div>
    </section>

    <section class="conversation">
        <h2>MESSAGES</h2>
        
        <div v-for="match in matchs" :key="match.channel">
            <a :href="`${ipAddressFront}/conversation/${match.channel}`">
                <div>
                    <img class="selfie" :src="`${url}${match.selfie}`" alt="">
                    <div class="information">
                        <p>{{ match.firstname }} - {{ match.age }}</p>
                        <p>hey ! i just met you !</p>
                    </div>
                    <p class="hour"> 15:00</p>
                </div>
            </a>

        </div>

    </section>
    
</template>

<script setup>
/*eslint-disable no-undef*/
//import router from '@/router';

import { ref, computed } from 'vue';
import store from '@/store';

const user = computed(() => store.state.user || {});
const matchs = ref([]);
const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;
const ipAddressFront = process.env.VUE_APP_IP_FRONT
const idUser = user.value.id



console.log("a", process.env.VUE_APP_IP_ADDRESS);





// TODO POSSIBLE PROBLEME AVEC IDUSER EN HAUT
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

fetch(`${process.env.VUE_APP_IP_ADDRESS}/api/matchs/listMatch/${idUser}`, options).then(handleFetch);

function handleFetch(response)
{
  if(response.ok)
    {
      response.json()
        .then(data=>{
            console.log("data",data);
            
            data.forEach(listMatch => {
                matchs.value.push({
                    firstname: listMatch.firstname,
                    selfie: listMatch.selfie,
                    channel: listMatch.id_channel,
                })                
            });
        })
        .catch(error=>console.error(error));
    }
    else
    {
        console.error(response.statusText);
    }
  }

/*
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

fetch(`http://10.0.1.87:3000/api/matchs/listMatch/${id}`, options).then(handleFetch);

function handleFetch(response)
{
  if(response.ok)
    {
      response.json()
        .then(data=>{
            console.log("data",data);
            
            data.forEach(listMatch => {
                console.log("listmatch", listMatch);
                
                matchs.value.push({
                    firstname: listMatch.firstname,
                    selfie: listMatch.selfie,
                    channel: listMatch.id_channel
                })                
            });
        })
        .catch(error=>console.error(error));
    }
    else
    {
        console.error(response.statusText);
    }
  }
*/
</script>

<style scoped lang="scss">
@import './../../style/variablecouleur.scss';

.matches{
    display: flex;
    align-items: center;
    height: 100px;
    background-color: #FCE2E2;
    a{
        text-decoration: none;
        color: black;
        div{
            margin: 0 5px 0 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                display: flex;
                justify-content: center;
                border: 1px solid $primary;
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            p{
                font-size: 0.8em;
            }
        }
        div:nth-of-type(1){
            margin-left: 15px;
        }
    }
}

.conversation{
    background-color: white;
    padding-bottom: 30px;
    h2{
        width: 90%;
        color: black;
        text-align: left;
        padding: 5px;
        margin: auto;
        font-size: 1em;
    }
    a{
        text-decoration: none;
        color: black;
        div{
            width: 90%;
            margin: 5px auto;
            padding: 10px;
            display: grid;
            grid-template-columns: 30px 1fr 30px;
            align-items: center;
            border-bottom: 1px solid lightgrey;
                .selfie{
                    display: block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid black;
                }
                .information{
                    display: flex;
                    flex-direction: column;
                    border-bottom: none;
                    align-items: flex-start;
                    justify-content: center;
                    p:nth-child(1){
                        color: black;
                        font-weight: bolder;
                        margin-bottom: 2px;
                    }
                    p:nth-child(2){
                        font-size: 0.8em;
                    }
                }
                .hour{
                    font-size: 0.8em;
                }
            }
    }
    
}

</style>
  