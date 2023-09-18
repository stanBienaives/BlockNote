<template>
    <!-- <div id="root" ref="root" class="container-editor">
    
      <SideMenu v-if="editor" :editor="editor"/>
      <FormattingToolbar v-if="editor" :editor="editor"/>
    </div> -->
    <div> coucou </div>
    <!-- <div> {{ editor?._tiptapEditor  }}</div> -->
    <div id="root" ref="root" class="container-editor">
      <EditorContent class="editor" v-if="editor" :editor="(editor._tiptapEditor as typeof editor._tiptapEditor)" 
      >
        <!-- <SideMenu v-if="editor" :editor="editor"/>
        <FormattingToolbar v-if="editor" :editor="editor"/> -->
        <div> cokok</div>
        <SideMenu v-if="editor" :editor="editor"/>
        <FormattingToolbar v-if="editor" :editor="editor"/>
      </EditorContent>
    </div>
    <div >
      {{  html }}
    </div>
    <div>
      {{ blocks }}
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted , markRaw} from 'vue';
import { Block, BlockNoteEditor, FormattingToolbarView} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
import FormattingToolbar from './FormattingToolbar.vue';
// import { EditorContent, Editor } from '@tiptap/vue-3'
import { EditorContentWithSlots as EditorContent } from './EditorContentWithSlots';
import { useBlockNote } from '../hooks/useBlockNote'

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor | null>(null);
const html = ref<string>("");
onMounted(() => {
    editor.value = useBlockNote()!;
});
</script>

<style>
.editor-container {
  position: relative;
}


#root {
  margin-top: 100px;
  height: 100%;
}

.editor {
  padding: 0 calc((100% - 731px) / 2);
  /* height: 100%; */
  /* width: 731px; */
  /* margin: auto; */
}
</style>