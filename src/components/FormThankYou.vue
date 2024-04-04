<template>
  <div>
    <h1 class="title">
      Dank u.
    </h1>
    <p>
      {{ $options.name }}
    </p>
    <h2 class="subtitle">
      Bedankt voor de neerlegging van uw stuk van rechtspleging. Gelieve te
      controleren of u via e-mail een bewijs van het tijdstip van neerlegging
      heeft ontvangen. Opgelet, het is mogelijk dat de e-mail in kwestie is
      terechtgekomen in de map met "ongewenste e-mail".
    </h2>
  </div>
</template>

<script>
export default {
  name: 'FormThankYou',
}
</script>

<style scoped>

</style>