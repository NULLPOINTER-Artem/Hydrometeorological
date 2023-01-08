<script setup>
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import leaflet from 'leaflet';

// Not reactive variables
let mapInstance = null;
const popup = leaflet.popup();

// State
const formData = reactive({
  lat: 0,
  lng: 0,
  name: ''
});
const showModal = ref(false);

function getMarkers() {
  const markers = localStorage.getItem('markers');

  if (markers) return JSON.parse(markers)
  else return {}
}

function createMarker(formData) {
  leaflet.marker([formData.lat, formData.lng], {
    title: formData.name
  }).addTo(mapInstance);
}

 onMounted(() => {
  const markers = getMarkers();
  mapInstance = leaflet.map('mapID').setView([48.383022, 31.1828699], 13);

  // Add map skin
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapInstance);

  // Add existing markers to the map
  for (const [key, value] of Object.entries(markers)) {
    createMarker(value);
  }

  // Map events
  mapInstance.on('click', onMapClick);
});

onBeforeUnmount(() => {
  mapInstance.off('click', onMapClick);
  mapInstance = null;
});

function onMapClick(e) {
  const modalForm = document.querySelector('.modal-form');
  modalForm.style.top = e.containerPoint.y + 'px';
  modalForm.style.bottom = e.containerPoint.y + 'px';
  modalForm.style.right = e.containerPoint.x + 'px';
  modalForm.style.left = e.containerPoint.x + 'px';

  showModal.value = true;

  formData.lat = e.latlng.lat;
  formData.lng = e.latlng.lng;
}

function onCloseModalForm() {
  showModal.value = false;
  formData.lat = 0;
  formData.lng = 0;
  formData.name = '';
}

function onCreateMarker() {
  // Create marker and append to the map
  createMarker(formData);

  // Add to localStorage
  const markers = getMarkers();
  markers[[formData.lat, formData.lng].toString()] = {
    name: formData.name,
    lat: formData.lat,
    lng: formData.lng
  };
  localStorage.setItem('markers', JSON.stringify(markers));

  // Close Modal and clear old data
  onCloseModalForm();
}
</script>

<template>
  <div class="map-wrapper">
    <!-- The map -->
    <div id="mapID" />

    <!-- Form marker creation -->
    <div
      v-show="showModal"
      class="modal-form"
    >
      <button
        type="button"
        class="modal-form__close"
        @click.stop="onCloseModalForm"
      >
        X
      </button>
      <div class="modal-form__heading">
        Create Marker
      </div>
      <div class="modal-form__body">
        <input
          type="text"
          class="modal-form__input"
          placeholder="Enter marker name"
          v-model="formData.name"
        >
        <input
          type="text"
          class="modal-form__input"
          placeholder="Enter marker lat point"
          v-model="formData.lat"
        >
        <input
          type="text"
          class="modal-form__input"
          placeholder="Enter marker lng point"
          v-model="formData.lng"
        >
      </div>
      <div class="modal-form__controls">
        <button
          type="button"
          class="modal-form__controls-btn"
          @click="onCreateMarker"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.map-wrapper {
  margin-top: -15px;
  position: relative;
}

.modal-form {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 10000;
  background-color: rgba(105, 105, 105, 0.2);
  padding: 15px;
  border-radius: 15px;

  &__heading {
    text-align: center;
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 700;
  }

  &__close {
    position: absolute;
    cursor: pointer;
    background: transparent;
    right: 10px;
    top: 10px;
    font-size: 12px;
    transition: all 0.4s;

    &:hover {
      font-size: 15px;
    }
  }

  &__input {
    display: block;
    margin-bottom: 5px;
    padding: 5px 7px;
    width: 100%;
    border-radius: 7px;
  }

  &__body {
    margin-bottom: 20px;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-btn {
      cursor: pointer;
      border-radius: 7px;
      background-color: gray;
      color: white;
      font-size: 14px;
      padding: 5px 7px;
      transition: all 0.4s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

#mapID {
  width: 100%;
  height: 96vh;
}
</style>
