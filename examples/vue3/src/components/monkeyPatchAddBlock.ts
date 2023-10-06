//@ts-nocheck
import { slashMenuPluginKey } from "@blocknote/core/extensions/SlashMenu/SlashMenuPlugin"
import { getBlockInfoFromPos } from "@blocknote/core/extensions/Blocks/helpers/getBlockInfoFromPos"

// In the original addBlock function of the SideMenuPlugin 
// The addblock method check if the content is empty.
// - If it is not empty it creates a new block
// - if empty it reset the current block. 
// 
//This behavior does not work well with atom nodes (node view that does not have any content in it)
// We monkey patch this behaviour to align the behavior on atomic nodes to the behavior node with content.
export function addBlockMonkeyPatch() {

  console.log('monkey patch', this)
  if (this.sideMenuState?.show) {
    this.sideMenuState.show = false;
    this.updateSideMenu(this.sideMenuState);
  }
  
  this.menuFrozen = true;
  
  const blockContent = this.hoveredBlock!.firstChild! as HTMLElement;
  const blockContentBoundingBox = blockContent.getBoundingClientRect();
  
  const pos = this.pmView.posAtCoords({
    left: blockContentBoundingBox.left + blockContentBoundingBox.width / 2,
    top: blockContentBoundingBox.top + blockContentBoundingBox.height / 2,
  });
  if (!pos) {
    return;
  }
  
  const blockInfo = getBlockInfoFromPos(
    this.editor._tiptapEditor.state.doc,
    pos.pos
    );
    if (blockInfo === undefined) {
      return;
    }
    
    const { contentNode, endPos } = blockInfo;
    
    // HERE IS THE MONKEY PATCH we added contentNode.isAtom to the if statement the rest of the fucntion is identical to the sidemenu.addBlock
    // Creates a new block if current one is not empty or is atom for the suggestion menu to open in.
    if (contentNode.textContent.length !== 0 || contentNode.isAtom) {
      const newBlockInsertionPos = endPos + 1;
      const newBlockContentPos = newBlockInsertionPos + 2;
      
      this.editor._tiptapEditor
      .chain()
      .BNCreateBlock(newBlockInsertionPos)
      .BNUpdateBlock(newBlockContentPos, { type: "paragraph", props: {} })
      .setTextSelection(newBlockContentPos)
      .run();
    } else {
      this.editor._tiptapEditor.commands.setTextSelection(endPos);
    }
    
    // Focuses and activates the suggestion menu.
    this.pmView.focus();
    this.pmView.dispatch(
      this.pmView.state.tr.scrollIntoView().setMeta(slashMenuPluginKey, {
        // TODO import suggestion plugin key
        activate: true,
        type: "drag",
      })
    );
}