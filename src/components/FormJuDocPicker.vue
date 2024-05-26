<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import JuDocSelect from '@/components/JuDocSelect.vue';
const emit = defineEmits(['update']);
const props = defineProps({
  name: String,
  form: Object,
});

const selectedJuDoc = ref(null);

watch(selectedJuDoc, (newValue) => {
  emit('update', { docType: newValue, currentFormIsValid: isValid });
});

const isValid = computed(() => selectedJuDoc.value !== null);
onMounted(() => {
  emit('update', { currentFormIsValid: isValid });
  if (props.form.docType) {
    selectedJuDoc.value = props.form.docType;
  }
});
const handleSelect = (data) => {
  // data looks like { selected: { name: 'LME', description: 'Laatste memorie' } }
  selectedJuDoc.value = data.selected;
};
</script>

<template>
  <div>
    <JuDocSelect :docType="form.docType" @update="handleSelect">
      <template #option="{ juDoc }">
        <span>{{ juDoc.name }} - <em>{{ juDoc.description }}</em></span>
      </template>
    </JuDocSelect>
  </div>
</template>
