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

import {defineComponent, h} from 'vue';
import type { PropType } from 'vue'
import { EditorContent, Editor } from '@tiptap/vue-3'

export const EditorContentWithSlots = defineComponent({
  name: 'EditorContentWithSlots',
  
  props: {
    editor: {
      default: null,
      type: Object as PropType<Editor>,
    },
  },
  
  setup(props : {editor: Editor}, { slots }) {
    const instance = EditorContent.setup!(props, {} as any) as Record<string, any>; // Calls setup function of parent component
    const rootEl = instance.rootEl; // Reuse rootEl ref from parent
    
    
    return () => h(
      'div',
      {
        ref: (el) => {
          rootEl.value = el;
        },
      },
      [
        EditorContent.render?.call(instance), // This is the VNode from the parent
        slots?.default ? slots.default() : null // Inject the default slot, if any
      ]
      )
    }
  })
  