<template>
    <div class="cgv-container">
        <h1>Conditions Générales</h1>

        <section class="cgv-section">
            <h2>1. Objet</h2>
            <p>Les présentes CG régissent les relations entre Yoome et ses utilisateurs. En utilisant nos services, vous
                acceptez ces conditions.</p>
        </section>

        <section class="cgv-section">
            <h2>2. Données personnelles</h2>
            <p>Vos données personnelles sont protégées conformément à notre <a @click="politique">Politique de
                    Confidentialité</a>.</p>
        </section>

        <section class="cgv-section">
            <h2>3. Inscription et compte utilisateur</h2>
            <p>Pour utiliser Yoome, vous devez créer un compte avec des informations précises. Vous êtes responsable de
                la sécurité de votre compte.</p>
        </section>

        <section class="cgv-section">
            <h2>4. Abonnements et paiements</h2>
            <p><strong>Types d'abonnements :</strong> Options gratuites et payantes.</p>
            <p><strong>Paiement :</strong> Effectué par carte de crédit, PayPal ou autres moyens.</p>
            <p><strong>Remboursement :</strong> Les abonnements ne sont pas remboursables.</p>
        </section>

        <section class="cgv-section">
            <h2>5. Durée des abonnements</h2>
            <p>Les abonnements sont renouvelés automatiquement, sauf annulation 24 heures avant la fin de la période.
            </p>
        </section>

        <section class="cgv-section">
            <h2>6. Obligations de l'utilisateur</h2>
            <p>Vous vous engagez à fournir des informations véridiques et à respecter les autres utilisateurs.</p>
        </section>

        <section class="cgv-section">
            <h2>7. Résiliation</h2>
            <p>Nous pouvons suspendre ou résilier votre compte en cas de violation des CGV. Aucun remboursement ne sera
                effectué.</p>
        </section>

        <section class="cgv-section">
            <h2>8. Limitation de responsabilité</h2>
            <p>Nous ne sommes pas responsables des dommages indirects ou imprévus liés à l'utilisation de nos services.
            </p>
        </section>

        <section class="cgv-section">
            <h2>9. Modifications des CGV</h2>
            <p>Nous pouvons modifier ces CGV. Vous serez informé des changements par e-mail.</p>
        </section>

        <section class="cgv-section">
            <h2>10. Contact</h2>
            <p>Pour toute question, contactez-nous à :</p>
            <p><strong>E-mail :</strong> <a href="mailto:support@yoome.com">support@yoome.com</a></p>
            <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
        </section>
    </div>
</template>

<script setup>
import router from '@/router';

const politique = () => {
    router.push('/MentionsLégals')
}
</script>

<style scoped>
.cgv-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
    font-family: Arial, sans-serif;
    color: #333;
}

h1 {
    font-size: 2rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5rem;
}

.cgv-section {
    margin-bottom: 1.5rem;
}

h2 {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 0.5rem;
}

p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0.5rem 0;
}

a {
    color: #3498db;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>