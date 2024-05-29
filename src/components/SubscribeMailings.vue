<script setup>
import { ref, computed } from 'vue';

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
const closeModal = () => {
    showModal.value = false;
};
const usermail = ref('');

const params = computed(() => {
    return {
        email: usermail.value?.replace(/(["'|])/g, '\\'),
        'login-remind': 'Subscribe',
    };
});

const queryString = computed(() => {
    return Object.entries(params.value)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
});

const responseData = ref('');
const parser = new DOMParser();
const subscriptionResponse = computed(() => {
    const defaultResponse = '';
    if (!responseData.value) {
        console.log('responseData.value is empty');
        return defaultResponse;
    }

    const doc = parser.parseFromString(responseData.value, 'text/html');
    const bodyElement = doc.querySelector('body');

    if (!bodyElement) return defaultResponse;

    const bodyText = bodyElement.textContent;
    console.log('bodyText:', bodyText);
    return bodyText;
});

const subscriptionSeemsValid = computed(() => {
    const validSubTextRegex = /Uw aanmeldingsverzoek is ontvangen en zal zo spoedig mogelijk worden|Ihr Abonnement-Antrag ist soeben eingetroffen und wird alsbald bearbeitet.|Your subscription request has been received, and will soon be acted upon|Votre demande d'abonnement a été reçue et sera bientôt traitée./;
    const isValid = validSubTextRegex.test(subscriptionResponse.value);
    console.log(`validSubTextRegex.test(subscriptionResponse.value) is ${isValid}`);
    return isValid;
});
const emailsSeemsInvalid = computed(() => {
    const invalidEmailTextRegex = /U moet een geldig e-mailadres opgeven./;
    const isInvalid = invalidEmailTextRegex.test(subscriptionResponse.value);
    console.log(`invalidEmailTextRegex.test(subscriptionResponse.value) is ${isInvalid}`);
    return isInvalid;
});
const subscriptionSeemsInvalid = computed(() => {
    const invalidSubTextRegex = /niet geldig|ungültig|not valid|n'est pas valide./;
    const isInvalid = invalidSubTextRegex.test(subscriptionResponse.value);
    console.log(`invalidSubTextRegex.test(subscriptionResponse.value) is ${isInvalid}`);
    return isInvalid;
});

const subscriptionStatus = computed(() => {
    if (subscriptionSeemsValid.value) {
        return 'valid';
    } else if (emailsSeemsInvalid.value) {
        return 'invalid email';
    } else if (subscriptionSeemsInvalid.value) {
        return 'invalid';
    } else {
        return 'unknown';
    }
});

const fetchData = async () => {
    try {
        const response = await fetch(
            // info_nl should be replaced with the selected mlist
            // depending on the selected language
            // e.g. info_nl for Dutch
            // e.g. info_fr for French
            // e.g. pdf_de for German
            'https://mailman.const-court.be/mailman/subscribe/info_nl',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: queryString.value,
            }
        );

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        responseData.value = await response.text();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

</script>

<template>
    <!-- Button to toggle the modal -->
    <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded-lg">
        Inschrijven nieuwsbrief
    </button>

    <!-- Modal -->
    <!-- The backdrop is a semi-transparent layer to obscure the page content behind it. -->
    <div @click="closeModal" v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <!-- The modal content container holds the actual content of the modal, displayed on top of the backdrop -->
        <div @click.stop class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
            <!-- Modal header -->
            {{ subscriptionStatus }}

            <!-- Modal body -->

            <div class="py-4">
                <p class="text-gray-600">
                    U kan zich abonneren op de nieuwsbrief van het Hof door uw e-mailadres
                    hieronder in te voeren.
                </p>

                <form>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="mailid"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geef uw
                                e-mail:</label>
                            <input type="email" id="mailid"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                                placeholder="John" required v-model="usermail" />
                            <label for="mailings"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kies de taal van de
                                gewenste nieuwsbrief:</label>
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
                <p class="mt-2 mb-4 text-gray-600">
                    U ontvangt vervolgens een e-mail van het e-mailadres [ info_nl-request
                    @ mailman.const-court.be ], waarin u wordt gevraagd om uw inschrijving
                    te bevestigen door op een link te klikken. Onmiddellijk daarna
                    ontvangt u van hetzelfde e-mailadres een bevestiging.
                </p>
                <p class="mt-2 mb-4 text-gray-600">
                    Opgelet, deze e-mails (zowel de e-mail waarin u wordt gevraagd om uw
                    inschrijving te bevestigen als de e-mail ter bevestiging en de e-mails
                    met de nieuwsbrieven) komen mogelijk in de map “ongewenste e-mail”
                    terecht. U kan dit verhelpen door het e-mailadres toe te voegen aan uw
                    vertrouwde afzenders.
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex justify-end pt-3 space-x-3 border-t">
                <button @click="fetchData" class="px-4 py-2 text-white bg-blue-600 rounded-lg">
                    Aanmelden
                </button>
                <button @click="showModal = false" class="px-4 py-2 bg-gray-200 rounded-lg">
                    Decline
                </button>
            </div>
        </div>
    </div>
</template>
