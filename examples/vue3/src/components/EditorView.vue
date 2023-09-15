<template>
    <div id="root" ref="root" class="container-editor">
      <sideMenu v-if="editor" :editor="editor" />
    </div>
    <div >
      {{  html }}
    </div>
    <div>
      {{ blocks }}
    </div>
</template>
  
<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Block, BlockNoteEditor, BlockSchema} from "@blocknote/core";
import SideMenu from './SideMenu.vue';
// import { BlockNoteEditor } from "../../../../packages/core/src/";


export default {
    setup() : { root: any, blocks: any, html: any, editor: BlockNoteEditor<BlockSchema> } {
        const root = ref(null);
        const blocks = ref<Block<BlockSchema>[]>();
        const editor = ref<BlockNoteEditor<BlockSchema> | null>(null);
        const html = ref<string>("");
        onMounted(() => {
            if (root.value)
                editor.value = new BlockNoteEditor<BlockSchema>({
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
                });
        });
        return {
            editor,
            root,
            blocks,
            html
        };
    },
    components: { SideMenu }
};
</script>

<style>
.editor-container {
  position: relative;
  /* margin: 100px; */
  
}


#root {
  height: 100%;
}

.editor {
  padding: 0 calc((100% - 731px) / 2);
  /* height: 100%; */
  /* width: 731px; */
  /* margin: auto; */
}
</style>