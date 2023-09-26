<template>
    <div id="root" ref="root" class="container-editor">
      <EditorContentWithSlots  v-if="editor" :editor="(editor._tiptapEditor as typeof editor._tiptapEditor)" 
      >
        <SideMenu :editor="editor"/>
        <FormattingToolbar  :editor="editor"/>
        <SlashMenu  :editor="editor"/>
      </EditorContentWithSlots>
    </div>
    <div >
      {{  html }}
    </div>
    <div>
      {{ blocks }}
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Block, BlockNoteEditor} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
import FormattingToolbar from './FormattingToolbar.vue';
import SlashMenu from './SlashMenu.vue';
import "@blocknote/core/style.css";
import EditorContentWithSlots from './EditorContentWithSlots.vue';
import { useBlockNote } from '../composables/useBlockNote'
import { h } from 'vue'
import { insertImage} from './ImageBlock'
import {customSchema, CustomBlockSchema } from './blockSchema'
import { getDefaultSlashMenuItems } from "@blocknote/core";

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor<CustomBlockSchema> | null>(null);
const html = ref<string>("");


onMounted(async () => {
    editor.value = useBlockNote({
      onEditorContentChange: async (editor) => {
        const htmlStored = await editor.blocksToHTML(editor.topLevelBlocks)
        localStorage.setItem('blocknote', htmlStored);
        html.value = htmlStored;
      },
      // editable: true,
      blockSchema: customSchema,
      slashMenuItems: [
        ...getDefaultSlashMenuItems(customSchema),
        insertImage,
      ],
      domAttributes: {
        editor: {
          class: "editor",
        },
      },
    })!;

    const htmlStored = localStorage.getItem('blocknote') || '<p> Empty </p>';
    const blocksFromHtml = await editor.value?.HTMLToBlocks(htmlStored!);

    editor.value?.insertBlocks(blocksFromHtml!, editor.value.topLevelBlocks[0]);
});
</script>

<style>

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