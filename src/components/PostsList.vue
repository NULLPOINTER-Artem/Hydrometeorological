<script setup>
import {
  onMounted,
  ref,
  reactive,
  watch,
  computed,
  shallowRef,
  triggerRef
} from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

// Components
import PaginationComponent from './PaginationComponent.vue';
import SearchComponent from './SearchComponent.vue';

// API
import { getPosts } from '../API/posts.js';
import { getCommentsForPosts } from '../API/comments.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const charData = shallowRef({
  labels: [],
  datasets: [
    {
      label: 'Chars Length of emails',
      backgroundColor: '#f87923',
      data: []
    }
  ]
});

const posts = ref([]);
const filterValue = reactive({
  field: 'title',
  value: ''
});
const filteredPosts = computed(() => {
  if (filterValue.value.length) return posts.value
    .filter((post) => post[filterValue.field].includes(filterValue.value));
  else return [];
});

const isShowStatistic = ref(false);
const paginationOpts = reactive({
  prePage: 10,
  page: 1,
  isLastPage: false,
});

function fetchPosts({ isNext } = { isNext: false }) {
  getPosts(paginationOpts.prePage, isNext ? paginationOpts.page + 1 : paginationOpts.page)
    .then(async (fetchedPosts) => {
      if (fetchedPosts.length !== 0) {
        const comments = await getCommentsForPosts(
          fetchedPosts.map((post) => post.id)
        );

        posts.value = fetchedPosts.map((post) => {
          return {
            ...post,
            comments: comments.filter((comment) => comment.postId === post.id)
          }
        });

        // Clear old chart data
        if (charData.value.labels.length) {
          charData.value.labels = [];
          charData.value.datasets[0].data = [];
        }

        posts.value.forEach((post) => {
          charData.value.labels.push(post.title);
          const chars = post.comments.reduce((acc, item) => acc + item.email.length, 0);
          charData.value.datasets[0].data.push(chars);
        });

        if (paginationOpts.isLastPage) paginationOpts.isLastPage = false;
        if (isNext) paginationOpts.page++;

        // Update chart data
        triggerRef(charData);
      }
      else paginationOpts.isLastPage = true;
    });
}

onMounted(() => fetchPosts());

watch(() => paginationOpts.prePage, () => fetchPosts());
function onSelectedLimit(newLimit) {
  paginationOpts.prePage = newLimit;
  // for overwrite pagination history
  paginationOpts.page = 1;
}

function onPrev() {
  if (paginationOpts.page > 1) {
    paginationOpts.page--;
    fetchPosts();
  }
}
function onNext() {
  // first fetch the posts for identify the last page
  if (!paginationOpts.isLastPage) fetchPosts({ isNext: true });
}

function onChangeSearchValue(value) {
  filterValue.value = value;
}
</script>

<template>
  <div class="posts-wrapper">
    <SearchComponent
      v-show="!isShowStatistic"
      placeholder="Search by title"
      @change-value="onChangeSearchValue"
    />
    <div class="show-switcher">
      <button
        type="button"
        :class="['show-switcher__btn', { 'show-switcher__btn--active': !isShowStatistic }]"
        @click="() => isShowStatistic = false"
      >
        Posts
      </button>
      <button
        type="button"
        :class="['show-switcher__btn', { 'show-switcher__btn--active': isShowStatistic }]"
        @click="() => isShowStatistic = true"
      >
        Statistic
      </button>
    </div>
    <Bar
      v-if="isShowStatistic"
      :data="charData"
      :options="{ responsive: true, maintainAspectRatio: true }"
    />
    <div
      v-else-if="
        posts.length && !filterValue.value.length ||
          filteredPosts.length && filterValue.value.length
      "
      class="posts-list"
    >
      <div
        v-for="post in filteredPosts.length ? filteredPosts : posts"
        :key="post.id"
        class="posts-item"
      >
        <div
          class="posts-item__title"
          :title="post.title"
        >
          {{ post.title }}
        </div>
        <p class="posts-item__info">
          {{ post.body }}
        </p>
        <div class="posts-item__comments">
          comments: {{ post.comments.length }}
        </div>
      </div>
    </div>
    <div v-else class="posts-list--no-items">
      Not found posts
    </div>
    <PaginationComponent
      v-show="!isShowStatistic"
      :page="paginationOpts.page"
      :is-last-page="paginationOpts.isLastPage"
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
  height: 79vh;
  overflow-y: scroll;

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
  position: relative;

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

  &__comments {
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 16px;
    color: #fff;
  }
}

.show-switcher {
  margin-bottom: 15px;
  padding: 0 15px;

  &__btn {
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 7px;

    &:hover {
      opacity: 0.8;
    }

    &:first-child {
      margin-left: 0;
    }

    &--active {
      background-color: antiquewhite;
      border: 1px solid #000;
    }
  }
}
</style>
