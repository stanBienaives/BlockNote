<template>
  <EditorContent id="editor_content" :editor="editor"/>
  <Teleport to='#editor_content'> 
    <slot></slot>
  </Teleport>
</template>

<script lang="ts">
import { Editor } from '@tiptap/vue-3';
import { EditorContent } from './EditorContent';
export default {
  name: 'EditorContentWithSlots',
  props: {
      editor: {
          type: Object,
          required: true,
      },
  },
  components: { EditorContent }
}
</script>