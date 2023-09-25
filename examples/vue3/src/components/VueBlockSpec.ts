import {
    BlockConfig,
    BlockNoteDOMAttributes,
    BlockNoteEditor,
    BlockSchema,
    BlockSpec,
    blockStyles,
    camelToDataKebab,
    createTipTapBlock,
    mergeCSSClasses,
    parse,
    PropSchema,
    propsToAttributes,
    render,
  } from "@blocknote/core";

  import {
    NodeViewContent,
    NodeViewWrapper,
    VueNodeViewRenderer,
  } from "@tiptap/vue-3";
  import type { NodeViewProps } from '@tiptap/vue-3' 
  import { defineComponent, h } from 'vue'
//   import { createContext, ElementType, FC, HTMLProps, useContext } from "react";
  
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
    render: FC<{
      block: Parameters<
        BlockConfig<Type, PSchema, ContainsInlineContent, BSchema>["render"]
      >[0];
      editor: Parameters<
        BlockConfig<Type, PSchema, ContainsInlineContent, BSchema>["render"]
      >[1];
    }>;
  };
  
//   const BlockNoteDOMAttributesContext = createContext<BlockNoteDOMAttributes>({});
  
//   export const InlineContent = <Tag extends ElementType>(
//     props: { as?: Tag } & HTMLProps<Tag>
//   ) => {
//     const inlineContentDOMAttributes =
//       useContext(BlockNoteDOMAttributesContext).inlineContent || {};
  
//     const classNames = mergeCSSClasses(
//       props.className || "",
//       blockStyles.inlineContent,
//       inlineContentDOMAttributes.class
//     );
  
//     return (
//       <NodeViewContent
//         {...Object.fromEntries(
//           Object.entries(inlineContentDOMAttributes).filter(
//             ([key]) => key !== "class"
//           )
//         )}
//         {...props}
//         className={classNames}
//       />
//     );
//   };



  
  
import { mergeAttributes, Node } from '@tiptap/core'
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
    // console.log('creatingNode')
    const node = createTipTapBlock<
      BType,
      {
        editor: BlockNoteEditor<BSchema>;
        domAttributes?: BlockNoteDOMAttributes;
      }
    >({

    // const node = Node.create({
        name: blockConfig.type,
        content: "",
        atom: true,
        addAttributes() {
            return propsToAttributes(blockConfig);
        },
        parseHTML() {
            console.log('parseHtml')
            console.log(blockConfig)
            console.log(parse(blockConfig))
            // return [
            //     { tag: 'div'}
            // ]
            return parse(blockConfig)
        },
        
        renderHTML(all) {
            console.log('renderHtml')
            console.log(all)
            console.log(mergeAttributes(all.HTMLAttributes))
            // return render(blockConfig, mergeAttributes(all.HTMLAttributes));
            return [blockConfig.type, mergeAttributes(all.HTMLAttributes), ['div', { "data-content-type": all.node.type.name, ...mergeAttributes(all.HTMLAttributes)}]]
        },

        addNodeView() {
            // const blockContentDOMAttributes = this.options.domAttributes?.blockContent || {};

            // // Add props as HTML attributes in kebab-case with "data-" prefix
            // const htmlAttributes: Record<string, string> = {};
            // for (const [attribute, value] of Object.entries(props.node.attrs)) {
            // if (
            //     attribute in blockConfig.propSchema &&
            //     value !== blockConfig.propSchema[attribute].default
            // ) {
            //     htmlAttributes[camelToDataKebab(attribute)] = value;
            // }
            // }

            // // Gets BlockNote editor instance
            // const editor = this.options.editor! as BlockNoteEditor<
            // BSchema & { [k in BType]: BlockSpec<BType, PSchema> }
            // >;
            // // Gets position of the node
            // const pos =
            // typeof props.getPos === "function" ? props.getPos() : undefined;
            // // Gets TipTap editor instance
            // const tipTapEditor = editor._tiptapEditor;
            // // Gets parent blockContainer node
            // const blockContainer = tipTapEditor.state.doc.resolve(pos!).node();
            // // Gets block identifier
            // const blockIdentifier = blockContainer.attrs.id;
            // // Get the block
            // const block = editor.getBlock(blockIdentifier)!;
            // if (block.type !== blockConfig.type) {
            // throw new Error("Block type does not match");
            // }
            const tipTapEditor = this.options.editor._tiptapEditor;


            // return VueNodeViewRenderer(blockConfig.component)
            const wrapper = defineComponent({
                props: nodeViewProps,
                components: {
                    NodeViewWrapper
                },
                render() {
                    return  h(NodeViewWrapper, {...this.$props, className: 'okok'}, [ h(blockConfig.component, this.$props.node.attrs)])
                }                // render: () => h(blockConfig.component)
            })
            return VueNodeViewRenderer(wrapper, { editor: tipTapEditor })
        },

    })


    return {
        node: node,
        propSchema: blockConfig.propSchema,
    }

    // return VueNodeViewRenderer(node)

    //   content: blockConfig.containsInlineContent ? "inline*" : "",
    //   selectable: blockConfig.containsInlineContent,
  
    //   addAttributes() {
    //     return propsToAttributes(blockConfig);
    //   },
  
    //   parseHTML() {
    //     console.log('parseHtml')
    //     console.log(parse(blockConfig))
    //     return parse(blockConfig);
    //   },
  
    //   renderHTML({ HTMLAttributes }) {
    //     console.log('renderHtml')
    //     console.log(render(blockConfig, HTMLAttributes))
        
    //     return render(blockConfig, HTMLAttributes);
    //   },
  
    //   addNodeView() {
    //     const BlockContent: FC<NodeViewProps> = (props: NodeViewProps) => {
    //       const Content = blockConfig.render;

    //       console.log('conetenn')
  
    //       // Add custom HTML attributes
    //       const blockContentDOMAttributes =
    //         this.options.domAttributes?.blockContent || {};
  
    //       // Add props as HTML attributes in kebab-case with "data-" prefix
    //       const htmlAttributes: Record<string, string> = {};
    //       for (const [attribute, value] of Object.entries(props.node.attrs)) {
    //         if (
    //           attribute in blockConfig.propSchema &&
    //           value !== blockConfig.propSchema[attribute].default
    //         ) {
    //           htmlAttributes[camelToDataKebab(attribute)] = value;
    //         }
    //       }
  
    //       // Gets BlockNote editor instance
    //       const editor = this.options.editor! as BlockNoteEditor<
    //         BSchema & { [k in BType]: BlockSpec<BType, PSchema> }
    //       >;
    //       // Gets position of the node
    //       const pos =
    //         typeof props.getPos === "function" ? props.getPos() : undefined;
    //       // Gets TipTap editor instance
    //       const tipTapEditor = editor._tiptapEditor;
    //       // Gets parent blockContainer node
    //       const blockContainer = tipTapEditor.state.doc.resolve(pos!).node();
    //       // Gets block identifier
    //       const blockIdentifier = blockContainer.attrs.id;
    //       // Get the block
    //       const block = editor.getBlock(blockIdentifier)!;
    //       if (block.type !== blockConfig.type) {
    //         throw new Error("Block type does not match");
    //       }
  
    //       return (
    //         h(
    //           NodeViewWrapper, 
    //           {
    //             ...Object.fromEntries(
    //                 Object.entries(blockContentDOMAttributes).filter(
    //                 ([key]) => key !== "class"
    //                 )
    //             ),
    //             className: mergeCSSClasses(
    //                 blockStyles.blockContent,
    //                 blockContentDOMAttributes.class
    //             ),
    //             "data-content-type": blockConfig.type,
    //             ...htmlAttributes
    //           },
    //           [
    //             h(Content)
    //           ]
    //         )
    //         // <NodeViewWrapper
    //         //   {...Object.fromEntries(
    //         //     Object.entries(blockContentDOMAttributes).filter(
    //         //       ([key]) => key !== "class"
    //         //     )
    //         //   )}
    //         //   className={mergeCSSClasses(
    //         //     blockStyles.blockContent,
    //         //     blockContentDOMAttributes.class
    //         //   )}
    //         //   data-content-type={blockConfig.type}
    //         //   {...htmlAttributes}>
    //         //   <BlockNoteDOMAttributesContext.Provider
    //         //     value={this.options.domAttributes || {}}>
    //         //     <Content block={block as any} editor={editor} />
    //         //   </BlockNoteDOMAttributesContext.Provider>
    //         // </NodeViewWrapper>
    //       );
    //     };
  
    //     return VueNodeViewRenderer(BlockContent, {
    //       className: blockStyles.VueNodeViewRenderer,
    //     });
    //   },
    // });
  
    
    // return {
    //   node: node,
    //   propSchema: blockConfig.propSchema,
    // };
  }