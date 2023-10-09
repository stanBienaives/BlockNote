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
      <!-- {{  html }} -->
    </div>
    <div >
      {{  html }}
    </div>
    <textarea :value="cleanBlocks" name="" id="myTextarea" cols="200" rows="200">
    </textarea>
</template>
  
<script setup lang="ts" generic="BSchema extends BlockSchema = DefaultBlockSchema">
import { ref, onMounted, defineProps, watch, computed, shallowRef } from 'vue';
import { BaseSlashMenuItem, Block, BlockNoteEditor} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
import FormattingToolbar from './FormattingToolbar.vue';
import SlashMenu from './SlashMenu.vue';
import "@blocknote/core/style.css";
import EditorContentWithSlots from './EditorContentWithSlots.vue';
import { useBlockNote } from '../composables/useBlockNote'
// import {customSchema, CustomBlockSchema } from './blockSchema'
import { getDefaultSlashMenuItems, BlockSchema, DefaultBlockSchema } from "@blocknote/core";
import { cleanHtml } from './cleanHtml';

const {editable, onContentChange, initialContent, customSchema, additionalSlashMenuItems} = defineProps<{
  editable: boolean,
  onContentChange: (string: string) => void,
  initialContent: string,
  customSchema: BSchema,
  additionalSlashMenuItems: BaseSlashMenuItem<BSchema>[],
}>()

const root = ref(null);
const blocks = ref<Block<BSchema>[]>();
// Shallow ref is used to avoid typescript errors (ts(7056)) on using DeepReadonly
const editor = shallowRef<BlockNoteEditor<BSchema> | null>(null);
const html = ref<string>("");

const cleanBlocks = computed(() => {
  return JSON.stringify(blocks.value, null, 2);
})


// watch(initialContent, async (value) => {
// })

onMounted(async () => {
    editor.value = useBlockNote<BSchema>({
      onEditorContentChange: async (editor) => {
        blocks.value = editor.topLevelBlocks;
        onContentChange(await editor.blocksToHTML(editor.topLevelBlocks))
        const htmlStored = cleanHtml(await editor.blocksToHTML(editor.topLevelBlocks))
        localStorage.setItem('blocknote', htmlStored);
        html.value = htmlStored;
      },
      editable,
      blockSchema: customSchema,
      slashMenuItems: [
        ...getDefaultSlashMenuItems(customSchema),
        ...additionalSlashMenuItems
      ],
      domAttributes: {
        editor: {
          class: "editor",
        },
      },
    })!;
    const blocksFromHtml = await editor.value?.HTMLToBlocks(initialContent);
    editor.value?.insertBlocks(blocksFromHtml, editor.value.topLevelBlocks[0]);
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