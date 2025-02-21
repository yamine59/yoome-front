<template>

    <header class="">
        <div>
            <p>Une second chance en amour,</p>
            <p>pour vous et votre famille</p>
        </div>
        <div class="separator"></div>
    </header>

    <p class="description">Chez <span>Yoome</span> , nous comprenons que trouver l'amour peut être un défi en étant parent célibataire. Nous avons conçu une plateforme qui vous aide à rencontrer des personnes qui partagent vos valeurs et qui comprennent votre quotidien.</p>

    <section>
      <div>
        <img src="./../../assets/pictures/home/logo-m.png" alt="short logo yoome">
        <p>Créez des connexions sincères et authentiques.</p>
      </div>
      <div>
        <img src="./../../assets/pictures/home/logo-m.png" alt="short logo yoome">
        <p>Un espace sécurisé et respectueux pour échanger.</p>
      </div>
      <div>
        <img src="./../../assets/pictures/home/logo-m.png" alt="short logo yoome">
        <p>Des fonctionnalités spécialement pensées pour les parents célibataires.</p>
      </div>
    </section>

    <a>Prêt(e) à écrire la prochaine 
      page de votre histoire ?</a>
  
  
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped lang="scss">
  @import './../../style/variablecouleur.scss';
  
  header{
    background: rgba(0, 0, 0, 0.5) url("./../../assets/pictures/home/family.jpg");
    background-size: cover;
    background-blend-mode: darken;
    background-repeat: no-repeat;
    background-position: top;
    height: 45vh;
    
    display: flex;
    flex-direction: column;

    div{
      height: 80%;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: end;
      font-weight: 600;
    }
    .separator{
      display: flex;
      justify-content: flex-start;
      height: 1px;
      width: 50px;
      background-color: $primary;
      margin: 10px auto 0 auto
    }
}

.description{
  color: black;
  border: 1px solid $primary;
  border-radius: 10px;
  width: 80%;
  margin: 20px auto;
  padding: 10px;
  span{
    color: $primary;
  }
}

section{
  color: black;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  div{
    display: flex;
    img{
      display: block;
      width: 20px;
      height: 20px;
    }
    p{
      color: black;
      font-weight: 600;
      text-align: left;
      margin: 0px 0 10px 10px;
      font-size: 0.9em;
    }
  }
}

a{
  display: block;
  width: 80%;
  padding: 10px 20px;
  margin: 20px auto 40px auto;
  background-color: #f97068;
  color: white;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9em;
}
  
  

  </style>