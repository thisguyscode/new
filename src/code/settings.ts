export const dataKeys = {
  copy: 'copiedNodesIds',
  incompatible: 'incompatibleNodesIds',
  variants: 'variants',
};

export const CLOSE_PLUGIN_MSG = '_CLOSE_PLUGIN_';
export const PLUGIN_NAME = 'New';

export const settings = {
  notification: {
    default: { timeout: 4000 } as NotificationOptions,
    long: { timeout: 6000 } as NotificationOptions,
  },
  message: {
    counter: { compatibles: 0, incompatibles: 0, newSelection: 0 },
    state: { mask: true },
  },
  opacity: {
    min: 0.1,
    max: 1,
  },
  rotation: {
    max: 180,
  },
  size: {
    min: 0.1,
    max: 1,
  },
  constraints: {
    vertical: 'MIN',
    horizontal: 'MIN',
  },
  effect: {
    effects: [],
    effectStyleId: '',
  },
  frame: {
    minSize: 0.01,
    autolayout: {
      layoutMode: 'HORIZONTAL',
      itemSpacing: 0,
      primaryAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'MIN',
      counterAxisSizingMode: 'AUTO',
      counterAxisAlignItems: 'MIN',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    reactions: [
      {
        action: {
          type: 'NODE',
          destinationId: null,
          navigation: 'NAVIGATE',
          transition: null,
          preserveScrollPosition: false,
        },
        trigger: {
          type: 'ON_CLICK',
        },
      },
    ],
  },
  componentSet: {
    reactions: [
      {
        action: {
          type: 'NODE',
          destinationId: null,
          navigation: 'CHANGE_TO',
          transition: null,
          preserveScrollPosition: false,
        },
        trigger: {
          type: 'ON_CLICK',
        },
      },
    ],
  },
  fill: {
    fills: [],
    fillStyleId: '',
  },
  stroke: {
    strokes: [],
    strokeWeight: 1,
    strokeMiterLimit: 4,
    strokeAlign: 'INSIDE',
    strokeCap: 'NONE',
    strokeJoin: 'MITER',
    dashPattern: [],
    strokeStyleId: '',
  },
  cornerRadius: {
    cornerRadius: 0,
    cornerSmoothing: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
  },
  vectorNetwork: {
    regions: [],
    segments: [{ start: 0, end: 1 }],
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ],
  },
};
