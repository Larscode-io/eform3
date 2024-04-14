<script setup>
const handleFileUpload = (event) => {
  const files = event.target.files;
  console.log(files);
};
</script>
<template>
  <div class="p-4">
    <h1 class="mb-4 text-2xl font-bold">Opladen van de documenten</h1>
    <div class="mb-4">
      <!-- Document upload instructions -->
    </div>
    <div>
      <form @submit.prevent="submit">
        <fieldset class="mb-4">
          <legend class="font-bold">Digitaal ondertekend stuk van rechtspleging</legend>
          <div class="p-4 border border-blue-900 rounded-md shadow-md bg-gray-50 w-36">
            <label for="upload1" class="flex flex-col items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-white stroke-blue-900" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium text-gray-600">Upload file</span>
            </label>
            <input id="upload1" type="file" multiple class="hidden" @change="handleFileUpload">
          </div>
        </fieldset>
        <fieldset class="mb-4">
          <legend class="font-bold">Bijlage(n) bij het stuk van rechtspleging</legend>
          <div class="p-4 border border-blue-900 rounded-md shadow-md bg-gray-50 w-36">
            <label for="upload2" class="flex flex-col items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-white stroke-blue-900" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium text-gray-600">Upload file</span>
            </label>
            <input id="upload2" type="file" class="hidden" @change="handleFileUpload" multiple />
          </div>
        </fieldset>
        <fieldset class="mb-4">
          <legend class="font-bold">Word-versie van het stuk van rechtspleging</legend>
          <div class="p-4 border border-blue-900 rounded-md shadow-md bg-gray-50 w-36">
            <label for="upload3" class="flex flex-col items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-white stroke-blue-900" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium text-gray-600">Upload file</span>
            </label>
            <input id="upload3" type="file" class="hidden" @change="handleFileUpload" multiple />
          </div>
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
