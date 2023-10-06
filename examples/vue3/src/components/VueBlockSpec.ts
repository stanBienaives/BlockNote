import {
    BlockNoteEditor,
    blockStyles,
    createTipTapBlock,
    mergeCSSClasses,
    parse,
    propsToAttributes,
  } from "@blocknote/core";
  import type {
    BlockConfig,
    PropSchema,
    BlockNoteDOMAttributes,
    BlockSchema,
    BlockSpec,
    render,
  } from '@blocknote/core'

  import {
    NodeViewWrapper,
    VueNodeViewRenderer,
    NodeViewContent,
  } from "@tiptap/vue-3";
  import type { NodeViewProps } from '@tiptap/vue-3' 
  import { defineComponent, h } from 'vue'
//   import { createContext, ElementType, FC, HTMLProps, useContext } from "react";
  
export function camelToDataKebab(str: string): string {
  return "data-" + str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}


export const InlineContent = (
  props: any
) => {
  // const inlineContentDOMAttributes =
  //   useContext(BlockNoteDOMAttributesContext).inlineContent || {};

  const classNames = mergeCSSClasses(
    props.className || "",
    //@ts-ignore
    blockStyles.inlineContent,
    // inlineContentDOMAttributes.class
  );

  console.log(classNames)

  return h(NodeViewContent, 
    {
      class: classNames
    }
  );
};


  // extend BlockConfig but use a React render function
  export type VueBlockConfig<
    Type extends string,
    PSchema extends PropSchema,
    ContainsInlineContent extends boolean,
    BSchema extends BlockSchema
  > = Omit<
    BlockConfig<Type, PSchema, ContainsInlineContent, BSchema>,
    "render"
  > & {
    render: (props: NodeViewProps) => ReturnType<typeof h>;
  };
  
import { mergeAttributes} from '@tiptap/core'
import { nodeViewProps } from '@tiptap/vue-3'
  // A function to create custom block for API consumers
  // we want to hide the tiptap node from API consumers and provide a simpler API surface instead
  export function createVueBlockSpec<
    BType extends string,
    PSchema extends PropSchema,
    ContainsInlineContent extends boolean,
    BSchema extends BlockSchema
  >(
    blockConfig: VueBlockConfig<BType, PSchema, ContainsInlineContent, BSchema>
  ): BlockSpec<BType, PSchema> {
    const node = createTipTapBlock<
      BType,
      {
        editor: BlockNoteEditor<BSchema>;
        domAttributes?: BlockNoteDOMAttributes;
      }
    >({

        name: blockConfig.type,
        atom: blockConfig.containsInlineContent ? false : true,
        content: blockConfig.containsInlineContent ? "inline*" : "",
        addAttributes() {
          return propsToAttributes(blockConfig);
        },
        parseHTML() {
          return parse(blockConfig)
        },
        
        renderHTML({HTMLAttributes, node}) {
          // return render(blockConfig, HTMLAttributes)
          if (node.isAtom) {
            return [blockConfig.type, mergeAttributes(HTMLAttributes), ['div', {"data-content-type": blockConfig.type, ...mergeAttributes(HTMLAttributes)}]]
          }
          return [blockConfig.type, mergeAttributes(HTMLAttributes), ['div', {"data-content-type": blockConfig.type, ...mergeAttributes(HTMLAttributes)}, 0]]
        },

        addNodeView() {
          // Add custom HTML attributes
          const blockContentDOMAttributes =
            this.options.domAttributes?.blockContent || {};

            // Not sure if this is needed
            // // Add props as HTML attributes in kebab-case with "data-" prefix
            const  buildHtmlAttribute = (props: NodeViewProps) : Record<string, string> => {
              const htmlAttributes: Record<string, string> = {};
              for (const [attribute, value] of Object.entries(props.node.attrs)) {
                if (
                  attribute in blockConfig.propSchema &&
                  value !== blockConfig.propSchema[attribute].default
                ) {
                  htmlAttributes[camelToDataKebab(attribute)] = value;
                }
              }
              return htmlAttributes;
            }


            const wrapper = defineComponent({
                props: nodeViewProps,
                components: {
                    NodeViewWrapper
                },
                render() {
                    return  h(NodeViewWrapper, {
                      as: 'div',
                      ...buildHtmlAttribute(this.$props),
                      "data-content-type": blockConfig.type,
                      className: mergeCSSClasses(
                        //@ts-ignore
                        blockStyles.blockContent,
                        blockContentDOMAttributes.class
                      )
                    // }, [h(blockConfig.render, {...this.$props, block: getBlock(this.$props)})])
                    }, [h(blockConfig.render, {...this.$props})])
                    
                }                
            })

            return VueNodeViewRenderer(wrapper)
        },

    })

    return {
        node: node,
        propSchema: blockConfig.propSchema,
    }
  }