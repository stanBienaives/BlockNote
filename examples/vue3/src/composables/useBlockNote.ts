import { ref, watch } from 'vue'
import { Editor } from '@tiptap/vue-3'
import type {  BlockNoteEditorOptions, BlockSchema, DefaultBlockSchema } from '@blocknote/core'
import { BlockNoteEditor, defaultBlockSchema} from '@blocknote/core'
// import { getDefaultReactSlashMenuItems } from '../SlashMenu/defaultReactSlashMenuItems'
import { ImageBlock } from '../components/ImageBlock'


import { Plugin } from 'prosemirror-state';

const confirmDeletePlugin = new Plugin({
  filterTransaction: (transaction, state) => {
    if (isDeletionOfProtectedNode(transaction)) {
      return window.confirm('Are you sure you want to delete this?');
    }
    return true;  // Allow all other transactions to proceed
  },
});


function isDeletionOfProtectedNode(transaction) {
 console.log('check for deletion')
 return 
}


class BlockNoteEditorVue<T extends BlockSchema = DefaultBlockSchema> extends BlockNoteEditor<T> {
    // _tiptapEditor: Editor
    constructor(options: Partial<BlockNoteEditorOptions<T>>) {
        super(options)
        const newOptions = this._tiptapEditor.options
        this._tiptapEditor.destroy()


        // @ts-ignore
        this._tiptapEditor = new Editor(newOptions) as Editor
        // this._tiptapEditor = new Editor({
            // ...newOptions,
            // extensions: [
            //     ...newOptions.extensions,
            //     // ImageBlock.node
            // ]
        // }) as Editor
    }
}


const initEditor = <BSchema extends BlockSchema>(
    options: Partial<BlockNoteEditorOptions<BSchema>>
  ) => {
    const editor = new BlockNoteEditorVue<BSchema>({
    //   slashMenuItems: getDefaultReactSlashMenuItems<BSchema | DefaultBlockSchema>(
    //     options.blockSchema || defaultBlockSchema
    //   ),
      ...options,
    });
    // editor._tiptapEditor = new Editor(editor._tiptapEditor.options) as Editor
    return editor
  }

export const useBlockNote = <BSchema extends BlockSchema = DefaultBlockSchema>(
    options : Partial<BlockNoteEditorOptions<BSchema>> = {},
    deps = []
  ): BlockNoteEditorVue<BSchema> | undefined => {

  const editorRef = ref<BlockNoteEditor<BSchema>>()

  watch(
    () => deps,
    () => {
    //   if (editorRef.value) {
    //     editorRef.value!._tiptapEditor.destroy()
    //   }
      editorRef.value = initEditor(options)
    },
    { immediate: true }
  )

  return editorRef.value
}