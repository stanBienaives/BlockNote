<template>
    <node-view-wrapper class="vue-component">
      <!-- <span class="label">Vue Component</span> -->
  
      <div class="content">
        <button>
            coucou
          <!-- This button has been clicked {{ node.attrs.count }} times. -->
        </button>
      </div>
    </node-view-wrapper>
  </template>
  
  <script lang="ts">
  import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
  
  export default {
    components: {
      NodeViewWrapper,
    },
  
    props: nodeViewProps,

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