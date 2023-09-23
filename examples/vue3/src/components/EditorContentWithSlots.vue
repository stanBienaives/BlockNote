<template>
  <EditorContent :id="identifier" :editor="editor"/>
  <Teleport :to='`#${identifier}`'> 
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { EditorContent } from '@tiptap/vue-3';
import { ref } from 'vue';


defineProps<{
  editor: Editor,
}>()


const identifier = ref(`editor-${Math.floor(Math.random() * 0xFFFFFFFF).toString()}`)


</script>