<template>

    <header>
        <h1>Boostez votre expérience</h1>
        <p>Débloquez de nouvelles possibilités et multipliez</p>
        <p>vos rencontres</p> 
    </header>

    <section class="notSubscribed">
        <h2>NOS ABONNEMENTS</h2>

        <div class="free">
            <img src="./../../assets/pictures/home/yoome-blue-version1.png" alt="">
            <div>
                <p>Nombre de likes/jour</p>
                <span>5</span>
            </div>
            <div>
                <p>Nombre de messages/jour</p>
                <span>5</span>
            </div>
        </div>
    </section>

    <section class="subscribed">
        <div class="sub">
                <img src="./../../assets/pictures/home/yoome-white.png" alt="">
                <p>Nombre de likes/jour</p>
                <p>Nombre de messages/jour</p>
                <p>Voir qui a visité votre profil</p>
                <p>Suggestion premium</p>
                <p>Profil en suggestion</p>
                <p>Messages hors secteur</p>
        </div>
    </section>

    <section class="price">
        <div>
            <div>
                <p>MENSUEL</p>
                <p>9,99€ / mois</p>
                <a href="#">></a>
            </div>
            <span>Sans engagement, <strong>annulable à tout moment</strong> </span>
        </div>
        
        <div>
            <div>
                <p>TRIMESTRIEL</p>
                <p>24,99€ <span>(8,33/mois)</span></p>
                <a href="#">></a>
            </div>
            <span class="discount">ECONOMISEZ 16%</span>
            <span>Sans engagement, <strong>annulable à tout moment</strong> </span>
        </div>
        
        <div>
            <div>
                <p>ANNUEL</p>
                <p>79,99€ <span>(6,67/mois)</span></p>
                <a href="#">></a>
            </div>
            <span class="discount">ECONOMISEZ 33%</span>
            <span>Sans engagement, <strong>annulable à tout moment</strong> </span>
        </div>
    </section>
    
</template>

<script setup>

</script>

<style scoped lang="scss">
@import './../../style/variablecouleur.scss';

header{
    width: 100%;
    margin: auto;
    h1{
        margin-top: 5vh;
        color: $primary;
        font-size: 1.1em;
    }
    p{
        font-size: 0.9em;
    }
    p:nth-of-type(2){
        margin: auto;
        padding-bottom: 10px;
        width: fit-content;
        border-bottom: 1px solid black;
    }
}

.notSubscribed, .subscribed{
    margin: 20px 0;
    h2{
        font-size: 1em;
        color: black;
        margin: 30px auto 15px auto;
    }
    img{
        float: left;
        width: 130px;
        height: 70px;
        padding: 15px;
    }
    .free, .sub{
        background-color: #BACBEA;
        color: #6F83A9;
        width: 80%;
        border-radius: 15px;
        margin: auto;

        div{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 50px;
            text-align: left;
            padding: 10px 0 10px 15px;
        }
        div:nth-of-type(1){
            border-top: 1px solid #6F83A9;
            border-bottom: 1px solid #6F83A9;
        }
    }
}

.subscribed{
    .sub{
        background-color: $primary;
        display: flex;
        flex-direction: column;
        img{
            display: block;
        }
        p{
            color: white;
            display: flex;
            border-top: 1px solid #6F83A9;
            padding: 10px 0 10px 15px;
        }
    }
}

.price{
    margin: 40px 0 0 0;
    div{
        div{
            border: 1px solid $primary;
            display: grid;
            grid-template-columns: 140px 1fr 30px;
            align-items: center;
            width: 80%;
            margin: 15px auto 0 auto;
            border-radius: 5px;
            p:nth-of-type(1){
                background-color: $primary;
                color: white;
                padding: 5px 20px;
                font-weight: 600;
            }
            p:nth-of-type(2){
                color: $primary;
                padding: 5px;
                margin: 0 0 0 10px; 
                font-weight: 600;
                font-size: 1em;
            }
            a{
                text-decoration: none;
                color: $primary;
                font-size: 1.1em;
                font-weight: bolder;
            }
        }
        .discount{
            margin-top: 10px;
            display: block;
            color: $primary;
            font-size: 0.8em;
            font-weight: 600;
        }
        span{
            font-size: 0.7em;
        }
    }
}

</style>