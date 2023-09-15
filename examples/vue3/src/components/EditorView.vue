<template>
    <div id="root" ref="root" class="container-editor">
      <SideMenu v-if="editor" :editor="editor"/>
      <FormattingToolbar v-if="editor" :editor="editor"/>
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

const root = ref(null);
const blocks = ref<Block[]>();
const editor = ref<BlockNoteEditor | null>(null);
const html = ref<string>("");
onMounted(() => {
  if (root.value)
    editor.value  = markRaw(new BlockNoteEditor({
      parentElement: root.value,
      onEditorContentChange: async (editor) => {
          blocks.value = editor.topLevelBlocks;
          html.value = await editor.blocksToHTML(blocks.value);
      },
      domAttributes: {
          editor: {
              class: "editor",
          },
      },
    }));
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