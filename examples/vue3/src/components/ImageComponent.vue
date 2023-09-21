<template>
    <!-- <node-view-wrapper class="vue-component"> -->
    <div>
      <!-- <img :src="src || 'https://picsum.photos/200/300'" /> -->
      <img :src="src || 'https://picsum.photos/200/300'" />
    </div>
      <!-- <img :src="node.attrs.src" /> -->
    <!-- </node-view-wrapper> -->
  </template>
  
  <script lang="ts">
//   import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
  
  export default {
    // components: {
    //   NodeViewWrapper,
    // },
  
    // props: nodeViewProps,
    props: {
        // node: nodeViewProps.node,
        src: String,
    }
    // props: nodeViewProps,

    // setup() {
    //     console.log('coucou')
    // }
  
    // methods: {
    //   increase() {
    //     this.updateAttributes({
    //       count: this.node.attrs.count + 1,
    //     })
    //   },
    // },
  }
  </script>