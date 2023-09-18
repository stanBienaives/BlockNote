<template>
    <div class="slash-menu" ref="slashmenu" :class="{ 'fake-hide': !showElement}">
        <!-- <SlashMenuItem icon="h1" name="Titre 1" description="Utiliser pour les titres principaux"/>
        <SlashMenuItem icon="h2" name="Titre 2" description="Utiliser pour les sections intermédiaires"/>
        <SlashMenuItem icon="h3" name="Titre 3" description="Utiliser pour les sous groupes"/>
        <div>
            {{  filteredItems }}
        </div> -->
        <SlashMenuItem v-for="(item, index) in items" :key="index" :icon="item.icon" :name="item.name" :description="item.description" :selected="selected == index"/>
        <!-- <SlashMenuItem icon="bold" name="Bold" description="Make text bold"/> -->
        <!-- <SlashMenuItem icon="bold" name="Bold" description="Make text bold"/> -->
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref, DeepReadonly, computed} from 'vue'
import type { BlockNoteEditor} from '@blocknote/core';
import SlashMenuItem from './SlashMenuItem.vue';
import { IconNames } from './icons/icons';
import {
  BaseSlashMenuItem,
//   BlockNoteEditor,
  DefaultBlockSchema,
} from "@blocknote/core";
type TSlashMenuProps = {
    // DeepReadonly is giving me reason to hate typescript and vue
    editor: DeepReadonly<BlockNoteEditor>
}


type ItemNames = 'Heading' | 'Heading 2' | 'Heading 3' | 'Bullet List' | 'Numbered List' | 'Paragraph';


type TFilteredItem = BaseSlashMenuItem<DefaultBlockSchema>

type Item = {
    name: string,
    description: string,
    icon: IconNames,
}


const allItems : Record<ItemNames, Item> = {
    'Heading': {
        name: 'Titre 1',
        description: 'Utiliser pour les titres principaux',
        icon: 'h1',
    },
    'Heading 2': {
        name: 'Titre 2',
        description: 'Utiliser pour les sections intermédiaires',
        icon: 'h2',
    },
    'Heading 3': {
        name: 'Titre 3',
        description: 'Utiliser pour les sous groupes',
        icon: 'h3',
    },
    'Bullet List': {
        name: 'Liste à puces',
        description: 'Utiliser pour les listes à puces',
        icon: 'list',
    },
    'Numbered List': {
        name: 'Liste numérotée',
        description: 'Utiliser pour les listes numérotées',
        icon: 'listnumber',
    },
    'Paragraph': {
        name: 'Paragraphe',
        description: 'Utiliser pour les paragraphes',
        icon: 'paragraph',
    },
};


const {editor} = defineProps<TSlashMenuProps>();
const slashmenu = ref<HTMLElement | null>(null);

const showElement = ref(false);
const top = ref(0);
const left = ref(0);
const topPx = computed(() => `${top.value}px`);
const leftPx = computed(() => `${left.value}px`);

const filteredItems = ref<TFilteredItem[]>([]);


const selected = ref(0);


const items = computed<Item[]>(() => {
    return filteredItems.value.map(({name}) => allItems[name as ItemNames])
})

onMounted(() => {
    editor.slashMenu.onUpdate((slashMenuState) => {
        if (slashMenuState.show) {
            showElement.value = true;
            
            top.value = slashMenuState.referencePos.top + slashMenuState.referencePos.height + 15;
            left.value = slashMenuState.referencePos.left

            filteredItems.value = slashMenuState.filteredItems;
            selected.value = slashMenuState.keyboardHoveredItemIndex
            console.log(JSON.stringify(filteredItems.value.map(({name}) => name)))
        } else {
            showElement.value = false;
        }
    });

})

</script>

<style scoped>


.slash-menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 300px;
    top: v-bind(topPx);
    left: v-bind(leftPx);
    border-radius: 5px;
    z-index: 2000;
    padding: 5px;
    box-shadow: rgb(207, 207, 207) 0px 4px 12px;
    background-color: white;
}


.fake-hide {
    height: 0px;
    overflow: hidden;
    box-shadow: none;
    padding: 0px;
}
</style>