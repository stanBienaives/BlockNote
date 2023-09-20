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
// import { EditorContent } from './EditorContentWithSlots';
// import { EditorContent } from '@tiptap/vue-3';
import { useBlockNote } from '../hooks/useBlockNote'
import { h } from 'vue'
import { imageBlock, insertImage, customSchema } from './ImageBlock'

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor | null>(null);
// const editor = ref<BlockNoteEditor<typeof customSchema>| null>(null);
const html = ref<string>("");
onMounted(async () => {
    editor.value = useBlockNote({
      onEditorContentChange: async (editor) => {
        // html.value = await editor.blocksToHTML(editor.topLevelBlocks);
        // console.log('hoi')
      },
      blockSchema: customSchema,
      slashMenuItems: [
        insertImage,
      ],
      // content: "<p>coucou</p>",
      domAttributes: {
        editor: {
          class: "editor",
        },
      },
    })!;


    editor.value?.insertBlocks(await editor.value.HTMLToBlocks("<h1>titre1</h1> <p>coucou</p> <p>c'est moi</p><image-component>okokok</image-component>"), editor.value.topLevelBlocks[0]);
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