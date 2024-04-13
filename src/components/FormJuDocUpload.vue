<template>
  <div class="p-4">
    <h1 class="mb-4 text-2xl font-bold">Opladen van de documenten</h1>
    <p class="mb-4">{{ componentName }}</p>
    <div class="mb-4">
      <!-- Document upload instructions -->
    </div>
    <div>
      <h2 class="mb-4 text-xl font-bold">Opladen van de documenten</h2>
      <form @submit.prevent="submit">
        <fieldset class="mb-4">
          <legend class="font-bold">Digitaal ondertekend stuk van rechtspleging</legend>
          <input type="file" class="p-2 border" />
        </fieldset>
        <fieldset class="mb-4">
          <legend class="font-bold">Bijlage(n) bij het stuk van rechtspleging</legend>
          <input type="file" multiple class="p-2 border" />
        </fieldset>
        <fieldset class="mb-4">
          <legend class="font-bold">Word-versie van het stuk van rechtspleging</legend>
          <input type="file" class="p-2 border" />
        </fieldset>
        <fieldset class="mb-4">
          <legend class="font-bold">Vermeld het e-mailadres waarop u een bewijs van het tijdstip van neerlegging wenst
            te ontvangen.</legend>
          <!-- Input fields for additional data if needed -->
        </fieldset>
        <button type="reset" @click="clear" class="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded">Clear</button>
        <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded">Neerleggen</button>
      </form>
    </div>
  </div>
</template>
