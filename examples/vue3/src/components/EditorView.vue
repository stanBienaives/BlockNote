<template>
    <div id="root" ref="root" class="container-editor">
      <EditorContentWithSlots  v-if="editor" :editor="(editor._tiptapEditor as typeof editor._tiptapEditor)" 
      >
        <SideMenu  :editor="editor"/>
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
import { ref, onMounted , markRaw} from 'vue';
import { Block, BlockNoteEditor, FormattingToolbarView} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
import FormattingToolbar from './FormattingToolbar.vue';
import SlashMenu from './SlashMenu.vue';
import "@blocknote/core/style.css";
import EditorContentWithSlots from './EditorContentWithSlots.vue';
import { useBlockNote } from '../hooks/useBlockNote'
import { h } from 'vue'
import { imageBlock, insertImage, customSchema } from './ImageBlock'
import { getDefaultSlashMenuItems } from "@blocknote/core";
// import { resolve } from 'path';

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor | null>(null);
// const editor = ref<BlockNoteEditor<typeof customSchema>| null>(null);
const html = ref<string>("");


onMounted(async () => {
    editor.value = useBlockNote({
      onEditorContentChange: async (editor) => {
        // html.value = await editor.blocksToHTML(editor.topLevelBlocks);
        // console.log(await editor._tiptapEditor.getHTML())
        // console.log(await editor.blocksToHTML(editor.topLevelBlocks))
        console.log('hoi')
      },
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


    await new Promise(resolve => setTimeout(resolve, 1000));


    const blocks = await editor.value?.HTMLToBlocks("<h1>titre1</h1><p>le <strong>coucou</strong></p><p>c est moi</p>");
    // const blocks = await editor.value?.HTMLToBlocks("<h1>titre1</h1> <p>coucou</p> <p>c'est moi</p><div data-content-type='imageComponent' data-src='https://res.cloudinary.com/hello-tickets/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_800/v1645844269/gd99ktjpmrtkwwlyn8hx.jpg' ></div>")
    // console.log(blocks)

    // editor.value?.insertBlocks(await editor.value.HTMLToBlocks("<h1>titre1</h1><p>coucou</p></div>"), editor.value.topLevelBlocks[0]);
    // editor.value?.insertBlocks(await editor.value.HTMLToBlocks("<h1>titre1</h1> <p>coucou</p> <p>c'est moi</p><div data-content-type='imageComponent' data-src='https://res.cloudinary.com/hello-tickets/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_800/v1645844269/gd99ktjpmrtkwwlyn8hx.jpg' ></div>"), editor.value.topLevelBlocks[0]);
    // editor.value?.insertBlocks(await editor.value.HTMLToBlocks("<h1>titre1</h1> <p>coucou</p> <p>c'est moi</p><image-component src='https://res.cloudinary.com/hello-tickets/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_800/v1645844269/gd99ktjpmrtkwwlyn8hx.jpg' ></image-component>"), editor.value.topLevelBlocks[0]);

    editor.value?.insertBlocks(blocks!, editor.value.topLevelBlocks[0]);
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