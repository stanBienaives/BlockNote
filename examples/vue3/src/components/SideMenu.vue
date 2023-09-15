<template>
    <div class="side-menu" ref="sidemenu" :style="elementStyle" v-show="showElement">
      <div class='button' @click="addBlock"><PlusIcon/></div>
      <div class='button' draggable="true" @dragstart="blockDragStart" @dragend="blockDragEnd">
        <DragIcon />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, nextTick, StyleValue, CSSProperties } from 'vue';
  import { BlockNoteEditor } from '@blocknote/core';
  import DragIcon from './icons/dragIcon.vue';
  import PlusIcon from './icons/PlusIcon.vue';


  type TSideMenuProps = {
    editor: BlockNoteEditor
  }
  
  const sideMenuComponent : any = {
    components: {
      DragIcon,
      PlusIcon,
    },
    props: {
      editor: {
        type: Object as () => BlockNoteEditor,
        required: true
      }
    },
    setup(props : TSideMenuProps) {
      const elementStyle = ref<CSSProperties>({
        // display: 'none'
      });
      const showElement = ref(false);
      const sidemenu = ref<HTMLElement | null>(null);
      
      onMounted(() => {
        props.editor.sideMenu.onUpdate((sideMenuState : any) => {
          if (sideMenuState.show) {
            showElement.value = true;
            const top = sideMenuState.referencePos.top;
            const left = sideMenuState.referencePos.x -  sidemenu.value!.offsetWidth;

            
            elementStyle.value = {
              ...elementStyle.value,
              top: `${top}px`,
              left: `${left}px`
            };
          } else {
            showElement.value = false;
          }
        });
      });
  
      const addBlock = () => {
        console.log('click')
        props.editor.sideMenu.addBlock();
      };
  
      const blockDragStart = (event: DragEvent) => {
        props.editor.sideMenu.blockDragStart(event);
      };
  
      const blockDragEnd = (event: DragEvent) => {
        props.editor.sideMenu.blockDragEnd();
      };
  
      return {
        elementStyle,
        showElement,
        addBlock,
        blockDragStart,
        blockDragEnd,
        sidemenu
      };
    }
  };

  export default sideMenuComponent;
  </script>
  
  <style>

.side-menu {
    position: absolute;
    opacity: 0.7;
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

}


.side-menu .button {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    z-index: 100;
    /* display: block;
    width: 30px;
    padding: 0px; */
}

.side-menu .button:hover {
    background-color: #eee;
}


  /* Add your styles here */

  </style>
  