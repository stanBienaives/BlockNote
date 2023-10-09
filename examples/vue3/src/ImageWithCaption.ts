

//@ts-ignore
import { defaultProps, defaultBlockSchema } from "@blocknote/core";
import { createVueBlockSpec } from "./components/VueBlockSpec";
import { h } from 'vue'
//@ts-ignore
import ImageWithCaptionComponent from './ImageWithCaptionComponent.vue'
import type { BaseSlashMenuItem} from '@blocknote/core'
import type { CustomBlockSchema } from "./blockSchema";



export const ImageWithCaptionBlock = createVueBlockSpec({
  type: 'imageWithCaptionComponent',
  propSchema: {
    ...defaultProps, 
    src: {
      default: "https://picsum.photos/200/300",
    },
    alt: {
      default: "image",
    },
  },
  containsInlineContent: true,
  render: ({node}) => h(ImageWithCaptionComponent, node.attrs),
});


export const insertImageWithCaption : BaseSlashMenuItem<CustomBlockSchema> = {
  name: "Insert Image With caption",
  execute: (editor) => {
    const src = null;
    const alt = null;
    const randomWord = Math.random().toString(36).substring(2, 7);
    editor.insertBlocks(
      [
        {
          type: "imageWithCaptionComponent",
          props: {
            src: src || `https://picsum.photos/seed/${randomWord}/200/300`,
            alt: alt || "image",
          },
        },
      ],
      editor.getTextCursorPosition().block,
      undefined
      );
    },
    aliases: ["image-component", "image", "img", "picture", "media"],
  } 
  