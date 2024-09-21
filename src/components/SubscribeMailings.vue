<script setup>
import { ref, reactive, computed } from 'vue';
import { useMailmanStatus } from '@/composables/useMailmanStatus.js';

const { isOnline, error, loading, isMailmanOnline } = useMailmanStatus();
const isMailmanStatusButtonClicked = ref(false);
const checkMailmanStatus = async () => {
    isMailmanStatusButtonClicked.value = true;
    await isMailmanOnline();
};
const showModal = ref(true);
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
const translateLang = (lang) => {
    switch (lang) {
        case Languages.ENGLISH:
            return 'Engels';
        case Languages.FRENCH:
            return 'Nieuwsbrief in het Frans';
        case Languages.DUTCH:
            return 'Nieuwsbrief in het Nederlands';
        case Languages.GERMAN:
            return 'Nieuwsbrief in het Duits (niet voor alle arresten en zonder trefwoorden)';
        default:
            return 'Onbekend';
    }
};
const closeModal = () => {
    showModal.value = false;
};

const form = reactive({
    usermail: '',
    selectedLang: '',
    isSubmitting: false,
    userFeedbackMessage: '',
});
const resetForm = () => {
    form.usermail = '';
    form.selectedLang = '';
    form.isSubmitting = false;
    form.userFeedbackMessage = '';
};
const selectedList = computed(() => {
    return defaultListLang.find((item) => item.lang === form.selectedLang)?.mlist;
});

// Validation PRE submit request to mailman
const emailIsValid = computed(() => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return form.usermail.length > 0 && emailPattern.test(form.usermail.toLowerCase());
});
const listHasBeenSelected = computed(() => {
    return selectedList.value !== undefined;
});
const formIsValid = computed(() => {
    return emailIsValid.value && listHasBeenSelected.value;
});

// when the form is dirty, the user has interacted with the form
// from that moment we want to show the validation messages
const formDirty = ref({
    email: false,
    mailinglist: false,
});

const clearAllDirty = () => {
    Object.entries(formDirty.value).forEach((el) => {
        const [k,] = el
        formDirty.value[k] = false
    });
}
const makeAllDirty = () => {
    Object.entries(formDirty.value).forEach((el) => {
        const [k,] = el
        formDirty.value[k] = true
    });
};

const formFieldsErrorIndicator = computed(() => {
    return {
        email: formDirty.value.email && !emailIsValid.value,
        mailinglist: formDirty.value.mailinglist && !listHasBeenSelected.value,
    };
});

// PRE submit request to mailman
const params = computed(() => {
    return {
        email: form.usermail?.replace(/(["'|])/g, '\\'),
        'login-remind': 'Subscribe',
    };
});

const queryString = computed(() => {
    return Object.entries(params.value)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
});



const fetchData = async () => {
    try {
        const response = await fetch(
            `https://mailman.const-court.be/mailman/subscribe/${selectedList.value}`,
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
        form.userFeedbackMessage = 'Er is een fout opgetreden bij het aanmelden. Probeer het later opnieuw.';
    }
};

const submitRequest = async () => {
    form.isSubmitting = true;

    makeAllDirty();
    await fetchData();

    // We check the content of the response of the mailman server
    // to determine if the subscription was successful
    if (mailmanSubmitIsValid.value) {
        form.userFeedbackMessage = 'Uw aanmeldingsverzoek is ontvangen en zal zo spoedig mogelijk worden verwerkt.';
        setTimeout(() => {
            resetForm();
            showModal.value = false;
            responseData.value = '';
            clearAllDirty();
        }, 5000);
    } else if (emailsSeemsInvalid.value) {
        form.userFeedbackMessage = 'U moet een geldig e-mailadres opgeven.';
    } else if (subscriptionSeemsInvalid.value) {
        form.userFeedbackMessage = 'Uw aanmeldingsverzoek is niet geldig.';
    } else {
        form.userFeedbackMessage = 'Er is een fout opgetreden bij het aanmelden. Probeer het later opnieuw.';
    }

    form.isSubmitting = false;
};

// POST submit request to mailman
const responseData = ref('');
const parser = new DOMParser();

const subscriptionResponse = computed(() => {
    const defaultResponse = '';
    if (!responseData.value) {
        return defaultResponse;
    }

    const doc = parser.parseFromString(responseData.value, 'text/html');
    const bodyElement = doc.querySelector('body');

    if (!bodyElement) return defaultResponse;

    const bodyText = bodyElement.textContent;
    // bodyText: '\n' + 'Resultaat van uw aanmelding bij info_nl\n' + 'Uw aanmeldingsverzoek is ontvangen en zal ...
    return bodyText;
});

// POST submit request to mailman
const subscriptionSeemsValid = computed(() => {
    const validSubTextRegex = /Uw aanmeldingsverzoek is ontvangen en zal zo spoedig mogelijk worden|Ihr Abonnement-Antrag ist soeben eingetroffen|Your subscription request has been received|Votre demande d'abonnement a/;
    const isValid = validSubTextRegex.test(subscriptionResponse.value);
    return isValid;
});
const emailsSeemsInvalid = computed(() => {
    const invalidEmailTextRegex = /Die von Ihnen angegebene E-Mail-Adresse ist ungültig|Het door u opgegeven e-mailadres is niet geldig|adresse courriel fournie n'est pas valide./;
    const isInvalid = invalidEmailTextRegex.test(subscriptionResponse.value);
    return isInvalid;
});

const subscriptionSeemsInvalid = computed(() => {
    const invalidSubTextRegex = /niet geldig|ungültig|not valid|n'est pas valide./;
    const isInvalid = invalidSubTextRegex.test(subscriptionResponse.value);
    return isInvalid;
});

const mailmanSubmitIsValid = computed(() => {
    return subscriptionSeemsValid.value && !emailsSeemsInvalid.value && !subscriptionSeemsInvalid.value;
});

</script>

<template>
    <div>
        <!-- Button to toggle the modal -->
        <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded-lg">
            Inschrijven nieuwsbrief
        </button>

        <!-- Modal -->
        <!-- Semi-transparent backdrop to obscure the page content behind it. -->
        <div @click="closeModal" v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <!-- The modal content container holds the actual content of the modal, displayed on top of the backdrop -->
            <div @click.stop class="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <!-- Modal header -->
                <!-- Modal body -->

                <div class="py-4">
                    <p class="mb-4 text-gray-600">
                        U kan zich abonneren op de nieuwsbrief van het Hof door uw e-mailadres hieronder in te voeren en
                        op “Aanmelden” te klikken.
                    </p>

                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="mailid"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geef uw
                                    e-mail:</label>
                                <input type="email" id="mailid" @blur="formDirty.email = true"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                                    :class="{ 'border-red-500': formFieldsErrorIndicator?.email }" placeholder="John"
                                    required v-model="form.usermail" />
                                <p v-if="formFieldsErrorIndicator?.email" class="text-sm text-red-500">
                                    Een geldig email adres is nodig.
                                </p>
                                <label for="mailings"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Kies de gewenste taal van de nieuwsbrief:</label>
                                <select id="mailings" @change="formDirty.mailinglist = true"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    v-model="form.selectedLang">
                                    <option v-for="i in defaultListLang" :value="i.lang" :key="i.lang">
                                        {{ translateLang(i.lang) }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div v-if="form.userFeedbackMessage" class="p-2 mt-2 font-bold text-white bg-purple-900 rounded">
                        {{ form.userFeedbackMessage }}
                    </div>
                    <div v-else>
                        <p class="mt-2 mb-4 text-gray-600">
                            U ontvangt vervolgens een e-mail waarin u wordt gevraagd om uw inschrijving te bevestigen
                            door op een link te klikken. Onmiddellijk daarna ontvangt u een bevestiging die de
                            inschrijving bevestigt.
                        </p>
                        <p class="mt-2 mb-4 text-gray-600">
                            Opgelet, deze e-mails kunnen mogelijk in de map “ongewenste e-mail” terechtkomen: zowel de
                            e-mail waarin u wordt gevraagd om uw inschrijving te bevestigen, als de e-mail ter
                            bevestiging en de e-mails met de nieuwsbrieven.
                        </p>
                    </div>
                </div>
                <div>
                    <button @click="checkMailmanStatus" :disabled="loading"
                        class="px-4 py-2 text-white bg-blue-300 rounded-lg ">Controleer server</button>
                    <div v-if="loading">Loading...</div>
                    <div v-if="error">Error: {{ error }}</div>
                    <div v-if="isOnline">
                        <span style="color: green;">✓</span> Mailman is online!
                    </div>
                    <div v-else-if="!loading && !error && isMailmanStatusButtonClicked">
                        <span style="color: red;">✗</span> Mailman is offline.
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-end pt-3 space-x-3 border-t">
                    <button :disabled="form.isSubmitting || !formIsValid" @click="submitRequest"
                        class="px-4 py-2 text-white rounded-lg" :class="formIsValid ? 'bg-blue-600' : 'bg-gray-400'">
                        {{ form.isSubmitting ? 'Aanmelden...' : 'Aanmelden' }}
                    </button>
                    <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg">
                        Annuleren
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
