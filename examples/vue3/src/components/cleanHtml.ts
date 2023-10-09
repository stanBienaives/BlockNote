function removeClassAttributesUsingDOM(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const allElementsWithClass = doc.querySelectorAll('[class]');
  allElementsWithClass.forEach(el => el.removeAttribute('class'));
  
  return doc.body.innerHTML;
}

function removeTrailingEmptyParagraphs(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const children = Array.from(doc.body.children);
  let removed = false;
  
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i] as HTMLElement; // Type cast to HTMLElement
    if (child.tagName === 'P' && !child.textContent?.trim()) {
      child.remove();
      removed = true;
    } else if (removed) {
      break;
    }
  }
  
  return doc.body.innerHTML;
}

export function cleanHtml(html: string): string {
  return removeTrailingEmptyParagraphs(removeClassAttributesUsingDOM(html));
}
