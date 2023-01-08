<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import leaflet from 'leaflet';

let mapInstance = null;
const popup = leaflet.popup();

/**
 * TODO: How to create marker + event on hover OR set the title attribute with marker name
 * TODO: Save all markers into localStorage
 * TODO: How to form in popup with three inputs
 */

onMounted(() => {
  mapInstance = leaflet.map('mapID').setView([48.383022, 31.1828699], 13);

  // Add map skin
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapInstance);

  // Map events
  mapInstance.on('click', onMapClick);
});

onBeforeUnmount(() => {
  mapInstance.off('click', onMapClick);
  mapInstance = null;
});

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(`LatLng ${e.latlng}`)
    .openOn(mapInstance)
}
</script>

<template>
  <div class="map-wrapper">
    <div id="mapID" />
  </div>
</template>

<style lang="scss">
.map-wrapper {
  margin-top: -15px;
}

#mapID {
  width: 100%;
  height: 96vh;
}
</style>
