<script setup>
import { shallowRef, ref, watch } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  isLastPage: {
    type: Boolean,
    required: true
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
        :disabled="$props.page === 1"
        @click="$emit('prev')"
      >
        &#8606;
      </button>
      <div class="pagination-control__page">
        {{ $props.page }}
      </div>
      <button
        type="button"
        class="pagination-control__next"
        :disabled="$props.isLastPage"
        @click="$emit('next')"
      >
        &#8608;
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
  padding: 5px 10px;

  &__option {
    &:checked {
      display: none;
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
    padding: 5px 10px;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background-color: gray;

      &:hover {
        opacity: 1;
        cursor: default;
      }
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
