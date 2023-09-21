

import { createBlockSpec, defaultProps, defaultBlockSchema } from "@blocknote/core";
import { createVueBlockSpec } from "./VueBlockSpec";
import { NodeViewWrapper } from "@tiptap/vue-3";
import { h } from 'vue'
import ImageComponent from './ImageComponent.vue'
import { insertBlocks } from "../../../../packages/core/src/api/blockManipulation/blockManipulation";


export const ImageBlock = createVueBlockSpec({
  type: 'imageComponent',
  propSchema: {
    ...defaultProps, 
    src: {
      default: "https://picsum.photos/200/300",
    },
    alt: {
      default: "image",
    },
  },
  containsInlineContent: false,
  component: ImageComponent,
  // render: ({block}) => {
  //   console.log('render')
  //   return h('div' , { id: 'image-wrapper' }, 
  //   [
  //     h('img', {
  //       src: 'https://via.placeholder.com/1000',
  //       alt: 'okokok'
  //     })
  //   ])
  //   // ['div', { id: 'image-wrapper'}, [ 'img', { src: 'https://via.placeholder.com/1000', alt: 'okokok' }]]
  // } 
  // console.log(editor.blocksToMarkdown(editor.topLevelBlocks));
});


console.group(ImageBlock)


export const customSchema = {
  ...defaultBlockSchema,
  "imageComponent": ImageBlock
}


export const insertImage = {
  name: "Insert Image",
  execute: (editor : any) => {
    // const src: string | null = prompt("Enter image URL");
    // const alt: string | null = prompt("Enter image alt text");
    const src = null;
    const alt = null;
    
    console.log(insertBlocks)
    editor.insertBlocks(
      [
        {
          type: "imageComponent",
          props: {
            src: src || "https://picsum.photos/200/300",
            alt: alt || "image",
          },
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
      );
    },
    aliases: ["image-component", "image", "img", "picture", "media"],
    group: "Media",
    icon: 'some',
    hint: "Insert an image",
  } 
  