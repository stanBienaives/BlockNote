<template>
    <div class="slash-menu" ref="slashmenu" :class="{ 'fake-hide': !showElement}">
        <SlashMenuItem 
            v-for="(item, index) in filteredItems" 
            :key="index"
            :icon="itemMetaHash[item.name].icon" 
            :name="item.name" 
            :description="itemMetaHash[item.name].description" 
            :selected="selected == index" 
            :onClick="() => editor.slashMenu.itemCallback(item)"
        />
    </div>
</template>


<script setup lang="ts" generic="BSchema extends BlockSchema = DefaultBlockSchema">
import { onMounted, ref, DeepReadonly, computed} from 'vue'
import type { BlockNoteEditor} from '@blocknote/core';
import SlashMenuItem from './SlashMenuItem.vue';
import { IconNames } from './icons/icons';
import { BlockSchema, DefaultBlockSchema } from '@blocknote/core';
import {
  BaseSlashMenuItem,
} from "@blocknote/core";
type TSlashMenuProps = {
    // DeepReadonly is giving me reason to hate typescript and vue
    // editor: DeepReadonly<BlockNoteEditor<T>> // fixed with shallowRef on editor
    editor: BlockNoteEditor<BSchema>
}


type ItemNames = BaseSlashMenuItem<BSchema>['name'];
// type ItemNames = 'Heading' | 'Heading 2' | 'Heading 3' | 'Bullet List' | 'Numbered List' | 'Paragraph' | 'Insert Image';


type TFilteredItem = BaseSlashMenuItem<BSchema>

type ItemMeta = {
    name: string,
    description: string,
    icon: IconNames,
}



const itemMetaHash : Record<ItemNames, ItemMeta> = {
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
    'Insert Image': {
        name: 'Insérer une image',
        description: 'Insérer une image',
        icon: 'h1',
    },
    'Insert Image With caption': {
        name: 'Insérer une image',
        description: 'Insérer une image',
        icon: 'h1',
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


// const items = computed<Item[]>(() => {
//     return filteredItems.value.map((item) => {
//         return {...allItems[item.name as ItemNames], item: item} satisfies Item;
//     }) satisfies Item[];
// })

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