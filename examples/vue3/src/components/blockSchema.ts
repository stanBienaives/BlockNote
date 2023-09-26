import { defaultBlockSchema } from "@blocknote/core";
import { ImageBlock } from "./ImageBlock";


export const customSchema = {
  ...defaultBlockSchema,
  "imageComponent": ImageBlock
}

export type CustomBlockSchema = typeof customSchema

