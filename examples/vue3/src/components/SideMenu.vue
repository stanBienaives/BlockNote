<template>
  <div class="side-menu" ref="sidemenu" :class="{ 'fake-hide': !showElement}">
    <div class='side-menu-item' @click="addBlock"><PlusIcon/></div>
    <div @click="showSideMenuSelector = !showSideMenuSelector" class='side-menu-item' draggable="true" @dragstart="blockDragStart" @dragend="blockDragEnd">
      <DragIcon />
    </div>
    <div v-if="showSideMenuSelector" class="side-menu-selector" @mousemove.prevent.stop>
      <div  @click="deleteBlock"> Delete</div>
      <div  @click="updateHeading('1')()"> > Titre 1 </div>
      <div  @click="updateHeading('2')()"> > Titre 2 </div>
      <div  @click="updateHeading('3')()"> > Titre 3 </div>
      <div  @click="updateBlock({type: 'paragraph'})()"> Paragraphe </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="BSchema extends BlockSchema = DefaultBlockSchema">
import { ref, onMounted, computed, watch, toRaw, shallowRef} from 'vue';
import type { BlockNoteEditor, Block, DefaultBlockSchema, PartialBlock, BlockSchema} from '@blocknote/core';
import DragIcon from './icons/DragIcon.vue';
import PlusIcon from './icons/PlusIcon.vue';
import { addBlockMonkeyPatch } from './monkeyPatchAddBlock';


type TSideMenuProps = {
  // DeepReadonly is giving me reason to hate typescript and vue
  editor: BlockNoteEditor<BSchema>
}
  
const {editor} = defineProps<TSideMenuProps>();

const showElement = ref(false);
const sidemenu = ref<HTMLElement | null>(null);
const top = ref(0);
const left = ref(0);
const topPx = computed(() => `${top.value}px`);
const leftPx = computed(() => `${left.value}px`);
const showSideMenuSelector = ref(false)
const block = shallowRef<Block<BSchema> | null>(null);
    
    
    
    
const deleteBlock = () => {
  if (block.value)
    editor.removeBlocks([block.value.id])
  showSideMenuSelector.value = false;
}

const updateBlock = (update: PartialBlock<BSchema>) => () => {

  console.log(update)
  editor.updateBlock(block.value!.id, update)
  showSideMenuSelector.value = false;
}

const updateHeading = (level: '1' |'2' | '3') => () => {
  console.log('update heading')
  //@ts-ignore
  updateBlock({type: 'heading', props: { level }})()
}
    
    
    
onMounted(() => {
  editor.sideMenu.onUpdate((sideMenuState) => {
    block.value = sideMenuState.block
    if (sideMenuState.show) {
      showElement.value = true;
      top.value = sideMenuState.referencePos.top + sideMenuState.referencePos.height / 2 - 30 / 2; // sidemenu.value!.offsetHeight = 30;
      left.value = sideMenuState.referencePos.left -  (sidemenu.value?.offsetWidth || 0);
      // TODO: use referencePos.height to position the menu in the middle of the block
    } else {
      showElement.value = false;
    }
  });
});


watch(block,
  () => showSideMenuSelector.value = false
)

watch(showSideMenuSelector, 
(value) => {
  if (value)
  editor.sideMenu.freezeMenu()
  else
    setTimeout(() => {
      editor.sideMenu.unfreezeMenu()
    }, 2000);
}
)


const addBlock = () => {
  // monkey patching the addBlock method to account for 'atomic' node (see tiptap docs about dynamic views )
  //@ts-ignore
  addBlockMonkeyPatch.bind(toRaw(editor.sideMenu.sideMenuView))() 
  // editor.sideMenu.addBlock();
};

const blockDragStart = (event: DragEvent) => {
  editor.sideMenu.blockDragStart(event);
};

const blockDragEnd = () => {
  editor.sideMenu.blockDragEnd();
};
</script>
  
<style scoped>
  .side-menu {
    position: fixed;
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    z-index: 100;
    top: v-bind(topPx);
    left: v-bind(leftPx);
  }
  
  
  .side-menu-selector {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: calc(100% + 0px);
    top: 0px;
    opacity: 1;
    background-color: white;
    z-index: 200;
    min-width: 200px;
    gap: 2px;
    border-radius: 5px;
    padding: 5px;
    box-shadow: rgb(207, 207, 207) 0px 4px 12px;
  }
  
  
  
  .side-menu-selector > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .side-menu-selector > div:hover {
    background-color: #eee;
  }
  
  
  .fake-hide {
    height: 0px;
    overflow: hidden;
  }
  
  
  .side-menu .side-menu-item {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    opacity: 0.7;
    /* display: block;
    width: 30px;
    padding: 0px; */
  }
  
  .side-menu .button:hover {
    background-color: #eee;
  }
  
  
  /* Add your styles here */
  
</style>
