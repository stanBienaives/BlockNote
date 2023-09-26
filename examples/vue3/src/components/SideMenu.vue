<template>
    <div class="side-menu" ref="sidemenu" :class="{ 'fake-hide': !showElement}">
        <div class='button' @click="addBlock"><PlusIcon/></div>
        <div class='button' draggable="true" @dragstart="blockDragStart" @dragend="blockDragEnd">
        <DragIcon />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import type { BlockNoteEditor} from '@blocknote/core';
import type { DeepReadonly } from 'vue';
import DragIcon from './icons/DragIcon.vue';
import PlusIcon from './icons/PlusIcon.vue';
import { CustomBlockSchema } from './blockSchema';


type TSideMenuProps = {
    // DeepReadonly is giving me reason to hate typescript and vue
    editor: DeepReadonly<BlockNoteEditor<CustomBlockSchema>>
}

const {editor} = defineProps<TSideMenuProps>();

const showElement = ref(false);
const sidemenu = ref<HTMLElement | null>(null);
const top = ref(0);
const left = ref(0);
const topPx = computed(() => `${top.value}px`);
const leftPx = computed(() => `${left.value}px`);

onMounted(() => {
    editor.sideMenu.onUpdate((sideMenuState) => {
        if (sideMenuState.show) {
            showElement.value = true;
            top.value = sideMenuState.referencePos.top + sideMenuState.referencePos.height / 2 - 30 / 2; // sidemenu.value!.offsetHeight = 30;
            left.value = sideMenuState.referencePos.left -  sidemenu.value!.offsetWidth;
        // TODO: use referencePos.height to position the menu in the middle of the block
        } else {
        showElement.value = false;
        }
    });
});

const addBlock = () => {
    editor.sideMenu.addBlock();
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
    opacity: 0.7;
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


.fake-hide {
    height: 0px;
    overflow: hidden;
}


.side-menu .button {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    /* display: block;
    width: 30px;
    padding: 0px; */
}

.side-menu .button:hover {
    background-color: #eee;
}


  /* Add your styles here */

  </style>
  