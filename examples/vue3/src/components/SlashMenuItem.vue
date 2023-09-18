<template>
  <div class="slash-menu-item" :class="{selected: selected}">
    <div class="icon">
      <IconSvg :identifier="icon" />
    </div>
    <div class="text">
      <div class="name"> {{ name  }}</div>
      <div class='description'> {{ description  }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import IconSvg from './icons/IconSvg.vue';
import { IconNames } from './icons/icons';

type Props = {
  icon: IconNames,
  onClick?: () => void,
  name: string,
  description: string,
  selected?: boolean,
}
const { icon, onClick, name, description} = defineProps<Props>();


</script>


<style scoped>
.slash-menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
}

.slash-menu-item:hover {
  background-color: #eee;
}

.slash-menu-item.selected {
  background-color: #eee;
}


.icon {
  background-color: #eee;;
  border-radius:  5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
}

.text {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-left: 10px;
}


.name {
  font-weight: bold;
}

.description {
  font-size: 0.8em;
  color: #333;
}

</style>