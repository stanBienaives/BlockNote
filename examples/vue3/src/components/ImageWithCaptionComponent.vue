<template>
    <!-- <node-view-wrapper class="vue-component"> -->
      <!-- <img :src="src || 'https://picsum.photos/200/300'" /> -->
      <div class="wrapper">
        <div clas="okok">
          <InlineContent class="caption"/>
        </div>
        <!-- <img :src="src || 'https://picsum.photos/200/300'" /> -->
        <!-- <slot></slot> -->
      </div>
      <!-- <node-view-content class="caption"/> -->
      <!-- <slot></slot> -->
      <!-- <img :src="node.attrs.src" /> -->
    <!-- </node-view-wrapper> -->
  </template>
  
<script setup lang="ts">
//   import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewContent } from '@tiptap/vue-3';
import { computed } from 'vue';
import { InlineContent } from './VueBlockSpec';


const { src } = defineProps<{
    src: string,
}>()



const backgroundCss = computed(() => {
  return `url('${src}')`
})
  
  </script>

  <style >
  .caption {
    background-color: #333;
    color: white;
  }
  .wrapper {
    height: 100px;
    background-image: v-bind("backgroundCss");
    /* background-color: red; */
    background-size: cover;
  }
  
  </style>