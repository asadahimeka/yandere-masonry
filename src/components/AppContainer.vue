<template>
  <v-container class="_vcont pa-2" fluid>
    <PostList v-if="store.showPostList" />
    <PoolList v-if="store.showPoolList" />
    <Snackbar />
  </v-container>
</template>

<script setup lang="ts">
import PostList from './PostList.vue'
import PoolList from './PoolList.vue'
import Snackbar from './Snackbar.vue'
import store from '@/store'
</script>
