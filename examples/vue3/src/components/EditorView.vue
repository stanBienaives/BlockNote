<template>
    <div> coucou </div>
    <div id="root" ref="root" class="container-editor">
      <EditorContent  v-if="editor" :editor="(editor._tiptapEditor as typeof editor._tiptapEditor)" 
      >
        <SideMenu v-if="editor" :editor="editor"/>
        <FormattingToolbar v-if="editor" :editor="editor"/>
        <SlashMenu v-if="editor" :editor="editor"/>
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
import SlashMenu from './SlashMenu.vue';
import "@blocknote/core/style.css";
import { EditorContentWithSlots as EditorContent } from './EditorContentWithSlots';
import { useBlockNote } from '../hooks/useBlockNote'

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor | null>(null);
const html = ref<string>("");
onMounted(() => {
    editor.value = useBlockNote({
      onEditorContentChange: async (editor) => {
        html.value = await editor.blocksToHTML(editor.topLevelBlocks);
      },
      domAttributes: {
        editor: {
          class: "editor",
        },
      },
    })!;
});
</script>

<style>
.editor-container {
}


#root {
  margin-top: 100px;
  position: relative;
  /* height: 100%; */
}

.editor {
  padding: 0 calc((100% - 731px) / 2);
  /* height: 100%; */
  /* width: 731px; */
  /* margin: auto; */
}
</style>