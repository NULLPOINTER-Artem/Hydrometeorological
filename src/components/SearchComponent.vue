<script setup>
// Hooks
import { watch } from 'vue';
import useDebouncedRef from '../hooks/useDebouncedRef.js';

const emit = defineEmits(['change-value']);
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Enter value'
  },
  delay: {
    type: Number,
    default: 350
  }
});

const searchValue = useDebouncedRef('', props.delay);
watch(searchValue, (newVal) => emit('change-value', newVal));
</script>

<template>
  <div class="search-wrapper">
    <input
      type="search"
      class="search-input"
      v-model="searchValue"
      :placeholder="$props.placeholder"
    >
  </div>
</template>

<style lang="scss">
.search-wrapper {
  background-color: antiquewhite;
  padding: 10px 15px;
  margin-bottom: 15px;
}

.search-input {
  font-size: 14px;
  background-color: transparent;
  border-bottom: 1px solid #000;
  padding: 3px 5px;

  &::placeholder {
    font-size: 14px;
  }

  &::-ms-clear,
  &::-ms-reveal {
    cursor: pointer;
  }

  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
}
</style>
