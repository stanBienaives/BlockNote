
<template>
  <header>
  </header>

  <main>
    <EditorView :onContentChange="onContentChange" :initialContent="initialContent" :editable="true"/>
  </main>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref} from 'vue';
import EditorView from './components/EditorView.vue';



const initialContent = ref<string>(localStorage.getItem('blocknote') || '<p> Empty </p>')

const onContentChange = (html: string) => {
  localStorage.setItem('blocknote', html);
}

onBeforeMount(() => {

    console.log('before mounted')
    initialContent.value = localStorage.getItem('blocknote') || '<p> Empty </p>';
})
</script>

