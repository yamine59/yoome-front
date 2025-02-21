<template>
    <div class="legal-container">
      <h1>Mentions Légales</h1>
  
      <section class="legal-section">
        <h2>Éditeur du site</h2>
        <p><strong>Yoome</strong></p>
        <p>123 Rue de l'Amour</p>
        <p>75000 Paris</p>
        <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
        <p><strong>Email :</strong> <a href="mailto:support@yoome.com">support@yoome.com</a></p>
        <p><strong>Numéro SIRET :</strong> 123 456 789 00010</p>
      </section>
  
      <section class="legal-section">
        <h2>Propriété intellectuelle</h2>
        <p>
          Le contenu du site Yoome (textes, images, logos, etc.) est la propriété exclusive de Yoome ou de tiers ayant autorisé
          l’utilisation de ces éléments. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable, est interdite.
        </p>
      </section>
  
      <section class="legal-section">
        <h2>Données personnelles</h2>
        <p>
          En vertu de la loi Informatique et Libertés du 6 janvier 1978 et du Règlement Général sur la Protection des Données (RGPD),
          vous disposez d’un droit d’accès, de rectification et de suppression des données personnelles vous concernant.
          Pour exercer ces droits, vous pouvez nous contacter à l’adresse suivante : 
          <a href="mailto:support@yoome.com">support@yoome.com</a>.
        </p>
      </section>
  
      <section class="legal-section">
        <h2>Cookies</h2>
        <p>
          Le site Yoome utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez choisir d'accepter ou de refuser
          les cookies. Pour en savoir plus, consultez notre politique de cookies.
        </p>
      </section>
  
      <section class="legal-section">
        <h2>Conditions d'utilisation</h2>
        <p>
          L’utilisation du site Yoome implique l’acceptation pleine et entière des présentes mentions légales.
          Les utilisateurs s’engagent à respecter les règles de bonne conduite et à ne pas utiliser le site à des fins illégales ou nuisibles.
        </p>
      </section>
  
      <section class="legal-section">
        <h2>Limitation de responsabilité</h2>
        <p>
          Yoome ne pourra être tenu responsable des dommages directs ou indirects résultant de l’utilisation du site
          ou de l’impossibilité d’y accéder.
        </p>
      </section>
  
      <section class="legal-section">
        <h2>Modifications des mentions légales</h2>
        <p>
          Yoome se réserve le droit de modifier ces mentions légales à tout moment. Il est conseillé aux utilisateurs de
          consulter régulièrement cette page.
        </p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MentionsLegales'
  }
  </script>
  
  <style scoped>
  .legal-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    text-align: left; /* Alignement du texte à gauche */
  }
  
  h1 {
    font-size: 2rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .legal-section {
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
  