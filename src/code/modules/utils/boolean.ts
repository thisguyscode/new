// Node types
export const isBooleanOp = (node) => node.type === 'BOOLEAN_OPERATION';
export const isPage = (node) => node.type === 'PAGE';
export const isFrame = (node) => node.type === 'FRAME';
export const isGroup = (node) => node.type === 'GROUP';
export const isComponent = (node) => node.type === 'COMPONENT';
export const isComponentSet = (node) => node.type === 'COMPONENT_SET';
export const isInstance = (node) => node.type === 'INSTANCE';

export const isVector = (node) => node.type === 'VECTOR';
export const isEllipse = (node) => node.type === 'ELLIPSE';
export const isPolygon = (node) => node.type === 'POLYGON';
export const isRectangle = (node) => node.type === 'RECTANGLE';
export const isStar = (node) => node.type === 'STAR';
export const isLine = (node) => node.type === 'LINE';
export const isSlice = (node) => node.type === 'SLICE';
export const isText = (node) => node.type === 'TEXT';

export const isShape = (node) => {
  return ['VECTOR', 'ELLIPSE', 'POLYGON', 'RECTANGLE', 'STAR', 'LINE'].includes(node.type);
};

export const isPartOfNode = (part, rootNode): boolean => {
  const { parent } = part;

  if (parent === rootNode) {
    return true;
  }

  if (isPage(parent)) {
    return false;
  }

  return isPartOfNode(parent, rootNode);
};

export const isPartOfNodeType = (node, types: Exclude<NodeType, 'PAGE' | 'DOCUMENT'>[]): boolean => {
  const { parent } = node;

  if (types.some((type) => parent.type === type)) {
    return true;
  }

  if (isPage(parent)) {
    return false;
  }

  return isPartOfNodeType(parent, types);
};

export const isPartOfInstance = (node) => isPartOfNodeType(node, ['INSTANCE']);

export const isPartOfContainer = (node) => isPartOfNodeType(node, ['FRAME', 'COMPONENT', 'COMPONENT_SET']);

export const isContainer = (node) => isFrame(node) || isComponent(node) || isComponentSet(node);

export const isNotSliceOrGroup = (node) => !(isSlice(node) || isGroup(node));

export const isArrayEmpty = (array) => !array?.length;
export const isRotated = (node) => node.rotation !== 0;

export const hasCornerRadius = (node) => 'cornerRadius' in node;
export const hasTopLeftRadius = (node) => 'topLeftRadius' in node;

export const isInCurrentPage = (node) => !!figma.currentPage.findOne((item) => item === node);
export const isInCurrentDocument = (node) => !!figma.root.findOne((item) => item === node);

export const isWrappable = (node) => !(isComponentSet(node.parent) || isPartOfInstance(node));

//
export const hasLayoutMode = (node) => 'layoutMode' in node;
export const hasAutoLayout = (node) => hasLayoutMode(node) && ['VERTICAL', 'HORIZONTAL'].includes(node.layoutMode);

//
export const hasChildrenProp = (node) => 'children' in node;
export const hasChildren = (node) => hasChildrenProp(node) && node.children.length > 0;

//
export const hasEffectsProp = (node) => 'effects' in node;
