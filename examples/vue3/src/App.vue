
<template>
  <header>
  </header>

  <main>
    <EditorView :onContentChange="onContentChange" :initialContent="initialContent" :editable="true" :customSchema="customSchema" :additionalSlashMenuItems="additionalSlashMenuItems"/>
  </main>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref} from 'vue';
import EditorView from './components/EditorView.vue';
import { customSchema, CustomBlockSchema } from './blockSchema';
import { insertImage } from './ImageBlock';
import { insertImageWithCaption } from './ImageWithCaption';






const initialContent = ref<string>(localStorage.getItem('blocknote') || '<p> Empty </p>')


const additionalSlashMenuItems = [
  insertImage,
  insertImageWithCaption,
]

const onContentChange = (html: string) => {
  localStorage.setItem('blocknote', html);
}

onBeforeMount(() => {

    console.log('before mounted')
    initialContent.value = localStorage.getItem('blocknote') || '<p> Empty </p>';
})
</script>

