<template>
      <div>
        <img :src="src || 'https://picsum.photos/200/300'" />
      </div>
  </template>
  
  <script lang="ts">
  
  export default {
    props: {
        src: String,
    }
  }
  </script>