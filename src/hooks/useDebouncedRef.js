import { customRef } from 'vue';

export default function useDebouncedRef(value, delay = 150) {
  let timeout = null;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    }
  })
}
