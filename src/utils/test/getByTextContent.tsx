import { screen } from '@testing-library/react';

function getByTextContent(textMatch: string | RegExp): HTMLElement {
  return screen.getByText((_, node) => {
    const hasText = (newNode: Element) => newNode.textContent === textMatch;
    const nodeHasText = hasText(node as Element);
    const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  });
}

export default getByTextContent;
