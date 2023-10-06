import { defaultBlockSchema } from "@blocknote/core";
import { ImageBlock } from "./ImageBlock";
import { ImageWithCaptionBlock } from "./ImageWithCaption";


export const customSchema = {
  ...defaultBlockSchema,
  "imageComponent": ImageBlock,
  "imageWithCaptionComponent": ImageWithCaptionBlock
}

export type CustomBlockSchema = typeof customSchema

