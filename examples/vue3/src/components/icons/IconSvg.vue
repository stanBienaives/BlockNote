<template>
    <svg 
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em" width="1em"
        xmlns="http://www.w3.org/2000/svg"
        v-html="path"
    >
    </svg>
</template>
<script  setup lang="ts">
import { computed} from 'vue'

import * as icons from './icons'

const {identifier} = defineProps<{
    identifier: keyof typeof icons
}>()

const path = computed(() => icons[identifier])
</script>