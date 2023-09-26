<template>
  <div class="formatting-menu" ref="menu" v-show="showElement" > 
    <template v-if="!linkEditorOpen">
      <div class="button" @click.stop="() => setStyle('bold')">
        <IconSvg identifier="bold" />
      </div>
      <div class="button" @click="() => setStyle('italic')">
        <IconSvg identifier="italic" />
      </div>
      <div class="button" @click="linkEditorOpen = true">
        <IconSvg identifier="link" />
      </div>
    </template>
    <template v-else>
      <input ref="linkEditorInput"  />
      <div class="button" @click="setLink">
        <IconSvg identifier="link" />
      </div>
    </template>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import IconSvg from './icons/IconSvg.vue';
import type { BlockNoteEditor} from '@blocknote/core';
import type { DeepReadonly } from 'vue';
import { CustomBlockSchema } from './blockSchema';

    
type YFormattingMenuProps = {
  // DeepReadonly is giving me reason to hate typescript and vue
  editor: DeepReadonly<BlockNoteEditor<CustomBlockSchema>>
}

const {editor} = defineProps<YFormattingMenuProps>();
const showElement = ref(false);
const menu = ref<HTMLElement | null>(null);
const top = ref(0);
const left = ref(0);
const topPx = computed(() => `${top.value}px`);
const leftPx = computed(() => `${left.value}px`);

const linkEditorOpen = ref(false);
const linkEditorInput = ref<HTMLInputElement>();

const setStyle = (style: string) => {
  console.log('okok')
  if (!editor)
    return;
  editor.toggleStyles({[style]: true})
  showElement.value = false;
};

const setLink = () => {
  if (!editor || !linkEditorInput.value)
    return;
  editor.createLink(linkEditorInput.value.value)
  linkEditorOpen.value = false;
};

onMounted(() => {
  editor.formattingToolbar.onUpdate((formattingToolbar) => {
    console.log(formattingToolbar.show)
    if (formattingToolbar.show) {
      showElement.value = true;
      top.value = formattingToolbar.referencePos.top - 40;
      left.value = formattingToolbar.referencePos.x;
      
    } else {
      // Use settimeout to fix Some race condition: FormattingToolbarView disappear before applying style
      setTimeout(() => showElement.value = false, 100)
    }
  });
});
</script>
  
<style scope>
.formatting-menu {
  position: fixed;
  z-index: 200;
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(207, 207, 207) 0px 4px 12px;
  border: 1px solid rgb(239, 239, 239);
  border-radius: 6px;
  gap: 2px;
  padding: 2px;
  width: fit-content;
  top: v-bind(topPx);
  left: v-bind(leftPx);
}


.formatting-menu .button {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}


.formatting-menu .button:hover {
  background-color: #e0e0e0;
}
  
</style>