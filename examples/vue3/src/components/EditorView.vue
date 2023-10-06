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
  
<script setup lang="ts">
import { ref, onMounted, defineProps, watch, computed, shallowRef } from 'vue';
import { Block, BlockNoteEditor} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
import FormattingToolbar from './FormattingToolbar.vue';
import SlashMenu from './SlashMenu.vue';
import "@blocknote/core/style.css";
import EditorContentWithSlots from './EditorContentWithSlots.vue';
import { useBlockNote } from '../composables/useBlockNote'
import { insertImage} from './ImageBlock'
import {customSchema, CustomBlockSchema } from './blockSchema'
import { getDefaultSlashMenuItems } from "@blocknote/core";
import { insertImageWithCaption } from './ImageWithCaption';

const {editable, onContentChange, initialContent} = defineProps<{
  editable: boolean,
  onContentChange: (string: string) => void,
  initialContent: string,
}>()

const root = ref(null);
const blocks = ref<Block<CustomBlockSchema>[]>();
// Shallow ref is used to avoid typescript errors (ts(7056)) on using DeepReadonly
const editor = shallowRef<BlockNoteEditor<CustomBlockSchema> | null>(null);
const html = ref<string>("");

const cleanBlocks = computed(() => {
  return JSON.stringify(blocks.value, null, 2);
})


function removeClassAttributesUsingDOM(html: string) : string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const allElementsWithClass = doc.querySelectorAll('[class]');
    allElementsWithClass.forEach(el => el.removeAttribute('class'));

    return doc.body.innerHTML;
}

function removeTrailingEmptyParagraphs(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const children = Array.from(doc.body.children);
    let removed = false;

    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i] as HTMLElement; // Type cast to HTMLElement
        if (child.tagName === 'P' && !child.textContent?.trim()) {
            child.remove();
            removed = true;
        } else if (removed) {
            break;
        }
    }

    return doc.body.innerHTML;
}


function cleanHtml(html: string) : string{
    return removeTrailingEmptyParagraphs(removeClassAttributesUsingDOM(html));
}

// watch(initialContent, async (value) => {
// })

onMounted(async () => {
    editor.value = useBlockNote({
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
        insertImage,
        insertImageWithCaption
      ],
      domAttributes: {
        editor: {
          class: "editor",
        },
      },
    })!;
    const blocksFromHtml = await editor.value?.HTMLToBlocks(initialContent);
    editor.value?.insertBlocks(blocksFromHtml, editor.value.topLevelBlocks[0]);

    // const htmlStored = localStorage.getItem('blocknote') || '<p> Empty </p>';
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