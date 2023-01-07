<script setup>
import { shallowRef, ref, watch } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['selected-limit', 'prev', 'next']);

const limits = shallowRef([ 10, 25, 30 ]);
const selectedLimit = ref(limits.value[0]);
watch(selectedLimit, (newVal) => emit('selected-limit', newVal));
</script>

<template>
  <div class="pagination-wrapper">
    <select
      class="pagination-limit"
      v-model="selectedLimit"
    >
      <option
        v-for="limit in limits"
        :key="limit"
        class="pagination-limit__option"
      >
        {{ limit }}
      </option>
    </select>
    <div class="pagination-control">
      <button
        type="button"
        class="pagination-control__prev"
        @click="$emit('prev')"
      >
        &#8592;
      </button>
      <div class="pagination-control__page">
        {{ $props.page }}
      </div>
      <button
        type="button"
        class="pagination-control__next"
        @click="$emit('next')"
      >
        &#8594;
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: beige;
  padding: 10px 15px;
}

.pagination-limit {
  margin-right: 50px;

  &__option {
    &:checked {
      color: aqua;
    }
  }
}

.pagination-control {
  &__prev, &__next {
    display: inline-block;
    background-color: black;
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;

    &:hover {
      opacity: 0.8;
    }
  }

  &__page {
    display: inline-block;
    margin-right: 10px;
  }

  &__prev {
    margin-right: 10px;
  }
}
</style>
