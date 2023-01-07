<script setup>
import { onMounted, ref, reactive, watch } from 'vue';

// Components
import PaginationComponent from './PaginationComponent.vue';

// API
import { getPosts } from '../API/posts.js';

const posts = ref([]);
const paginationOpts = reactive({
  prePage: 10,
  page: 1,
});

function fetchPosts() {
  getPosts(paginationOpts.prePage, paginationOpts.page)
    .then((response) => {
      posts.value = response;
    });
}

onMounted(() => fetchPosts());

watch(() => paginationOpts.prePage, () => fetchPosts());
function onSelectedLimit(newLimit) {
  paginationOpts.prePage = newLimit;
}

watch(() => paginationOpts.page, () => fetchPosts());
function onPrev() {
  if (paginationOpts.page > 1) {
    paginationOpts.page = paginationOpts.page - 1;
  }
}
function onNext() {
  paginationOpts.page = paginationOpts.page + 1;
}
</script>

<template>
  <div class="posts-wrapper">
    <div v-if="posts.length" class="posts-list">
      <div
        v-for="post in posts"
        :key="post.id"
        class="posts-item"
      >
        <div class="posts-item__title">
          {{ post.title }}
        </div>
        <p class="posts-item__info">
          {{ post.body }}
        </p>
      </div>
    </div>
    <div v-else class="posts-list--no-items">
      Not found posts
    </div>
    <PaginationComponent
      :page="paginationOpts.page"
      @selected-limit="onSelectedLimit"
      @prev="onPrev"
      @next="onNext"
    />
  </div>
</template>

<style lang="scss">
.posts-list {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 10px;

  &--no-items {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin: 0 auto 15px;
  }
}

.posts-item {
  text-align: center;
  width: 320px;
  height: 150px;
  background-color: brown;
  border-radius: 15px;
  padding: 15px;

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin-bottom: 10px;
  }

  &__info {
    text-align: left;
    font-size: 12px;
    color: lightgray;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.6;
  }
}
</style>
