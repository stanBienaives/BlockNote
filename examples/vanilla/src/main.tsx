import { BlockNoteEditor } from "@blocknote/core";
import "./index.css";
import { addSideMenu } from "./ui/addSideMenu";
import { addFormattingToolbar } from "./ui/addFormattingToolbar";
import { addSlashMenu } from "./ui/addSlashMenu";
import { addHyperlinkToolbar } from "./ui/addHyperlinkToolbar";




const editor = new BlockNoteEditor({
  parentElement: document.getElementById("root")!,
  onEditorContentChange: () => {
    console.log(editor.topLevelBlocks)
  },
  domAttributes: {
    editor: {
      class: "editor",
    },
  },
});


// insert something in the editor betofe loading
editor.insertBlocks(await editor.markdownToBlocks("# Mon titre \n salut"), editor.topLevelBlocks[0])



console.log("editor created", editor);

addSideMenu(editor);
addFormattingToolbar(editor);
addSlashMenu(editor);
addHyperlinkToolbar(editor);
