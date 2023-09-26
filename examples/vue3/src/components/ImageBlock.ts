

//@ts-ignore
import { defaultProps, defaultBlockSchema } from "@blocknote/core";
import { createVueBlockSpec } from "./VueBlockSpec";
import { h } from 'vue'
//@ts-ignore
import ImageComponent from './ImageComponent.vue'
import { insertBlocks } from "../../../../packages/core/src/api/blockManipulation/blockManipulation";
import type { BaseSlashMenuItem} from '@blocknote/core'
import type { CustomBlockSchema } from "./blockSchema";


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
  render: ({node}) => h(ImageComponent, node.attrs),
});


export const insertImage : BaseSlashMenuItem<CustomBlockSchema> = {
  name: "Insert Image",
  execute: (editor) => {
    const src = null;
    const alt = null;
    const randomWord = Math.random().toString(36).substring(2, 7);
    editor.insertBlocks(
      [
        {
          type: "imageComponent",
          props: {
            src: src || `https://picsum.photos/seed/${randomWord}/200/300`,
            alt: alt || "image",
          },
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
      );
    },
    aliases: ["image-component", "image", "img", "picture", "media"],
  } 
  