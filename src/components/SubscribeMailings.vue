<template>
    <!-- Button to toggle the modal -->
    <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded-lg">
        Inschrijven nieuwsbrief
    </button>

    <!-- Modal structure -->
    <div v-if="showModal" @click="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <!-- Modal content container -->
        <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md" @click.stop>
            <!-- Modal header -->
            <!-- Modal body -->
            <div class="py-4">
                <p class="text-gray-600">
                    With less than a month to go before the European Union enacts new
                    consumer privacy laws for its citizens, companies around the world are
                    updating their terms of service agreements to comply.
                </p>
                <p class="mt-2 mb-4 text-gray-600">
                    The European Union’s General Data Protection Regulation (G.D.P.R.)
                    goes into effect on May 25 and is meant to ensure a common set of data
                    rights in the European Union.
                </p>

                <form>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="mailid"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geef uw
                                e-mail</label>
                            <input type="email" id="mailid"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                                placeholder="John" required />
                            <label for="mailings"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kies de taal van de
                                gewenste nieuwsbrief</label>
                            <select id="mailings"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                v-model="selected">
                                <option v-for="i in defaultListLang" :value="i.lang" :key="i.lang">
                                    {{ i.lang }}
                                </option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Modal footer -->
            <div class="flex justify-end pt-3 space-x-3 border-t">
                <button @click="showModal = false" class="px-4 py-2 text-white bg-blue-600 rounded-lg">
                    Subscribe
                </button>
                <button @click="showModal = false" class="px-4 py-2 bg-gray-200 rounded-lg">
                    Decline
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

// Reactive state for modal visibility
const showModal = ref(true);
const selected = ref('');
const Languages = {
    ENGLISH: 'en',
    FRENCH: 'fr',
    DUTCH: 'nl',
    GERMAN: 'de',
};
const defaultListLang = [
    { lang: Languages.DUTCH, mlist: 'info_nl' },
    { lang: Languages.FRENCH, mlist: 'info_fr' },
    { lang: Languages.GERMAN, mlist: 'pdf_de' },
];
function closeModal() {
    showModal.value = false;
}
</script>
