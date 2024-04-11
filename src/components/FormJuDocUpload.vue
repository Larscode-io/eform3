<template>
  <div>
    <h1>Opladen van de documenten</h1>
    <p>{{ componentName }}</p>
    <div>
      Toelichting bij het opladen van documenten: U moet hieronder uw digitaal ondertekend stuk van rechtspleging in
      pdf-formaat (bv. verzoekschrift, memorie, …) opladen. Het is verplicht om minstens één bestand op te laden. Het
      stuk van rechtspleging dient ondertekend te zijn door middel van een gekwalificeerde elektronische handtekening.
      Opgelet, een ingescande handtekening volstaat niet. U kan hieronder in voorkomend geval de bijlage(n) bij het stuk
      van rechtspleging (bv. afschrift van de bestreden norm, overtuigingsstukken, …) opladen. U wordt eveneens verzocht
      om uw stuk van rechtspleging in een Word-bestand op te laden. Dit zorgt voor een vlottere behandeling van de zaak.
    </div>
    <div>
      <h2>Opladen van de documenten</h2>
      <form @submit.prevent="submit">
        <fieldset>
          <legend>Digitaal ondertekend stuk van rechtspleging</legend>
          <input type="file" />
        </fieldset>
        <fieldset>
          <legend>Bijlage(n) bij het stuk van rechtspleging</legend>
          <input type="file" multiple />
        </fieldset>
        <fieldset>
          <legend>Word-versie van het stuk van rechtspleging</legend>
          <input type="file" />
        </fieldset>
        <fieldset>
          <legend>Vermeld het e-mailadres waarop u een bewijs van het tijdstip van neerlegging wenst te ontvangen.
          </legend>
          <!-- Input fields for additional data if needed -->
        </fieldset>
        <button type="reset" @click="clear">Clear</button>
        <button type="submit">Neerleggen</button>
      </form>
    </div>
  </div>
</template>

<script setup>

const componentName = 'FormJuDocUpload';

function clear() {
  // Logic to reset form
}

function submit() {
  // Submit form data
}
</script>
