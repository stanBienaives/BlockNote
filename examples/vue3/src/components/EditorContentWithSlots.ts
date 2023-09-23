/**
 * EditorContentWithSlots Component
 * 
 * Overview:
 * This component is an extension of the EditorContent component provided by the @tiptap/vue-3 library.
 * It serves to include custom slots along with the standard content, 
 * This is needed because the BlockNoteEditor need the activators to be in the same element as the content editor. 
 *
 * Props:
 * - editor (PropType<Editor>): The editor instance passed in, default is null.
 * 
 * Slots:
 * - default: Optional slot for injecting custom Vue components or HTML elements.
 * 
 * Implementation Details:
 * - The component uses Vue's Composition API to reuse the logic and elements from the EditorContent parent component.
 * - The setup function from the parent (EditorContent) is explicitly called to inherit its properties and logic.
 * - The `rootEl` ref from the parent component is reused to maintain a single point of reference for the DOM.
 * 
 * Usage:
 * <EditorContentWithSlots :editor="editorInstance">
 *   <YourCustomComponent />
 * </EditorContentWithSlots>
 * 
 **/
  

import {
  Teleport,
  defineComponent,
  getCurrentInstance,
  h
} from 'vue'

// import { EditorContent } from '@tiptap/vue-3'
import { EditorContent } from './EditorContent'


export const EditorContentWithSlots = defineComponent<typeof EditorContent>({
  name: 'EditorContentWithSlots',
  props: EditorContent.props,
  render() {
    const render = h(EditorContent, this.props)
    console.log(render)
    return render;
  }
})


// export const EditorContentWithSlots = defineComponent<typeof EditorContent>({
//   name: 'EditorContentWithSlots',
//   props: EditorContent.props,
//   setup: EditorContent.setup,
//   // setup(props, { slots }){
//   //   const instance = getCurrentInstance()
//   //   return {
//   //     //@ts-ignore
//   //     ...EditorContent.setup.bind(instance)(props),
//   //     slots,
//   //   }
//   // },
//   render() {
    
//     const contentNode = EditorContent.render!.bind(this)()
//     contentNode.children = [
//       // @ts-ignore
//       ...contentNode.children || [],
//       ...this.$slots?.default?.() || [],
//     ]

//     return contentNode
//   },
// })
