import { isComponent, isInstanceWithVariants } from './modules/utils/boolean';
import { closePlugin } from './modules/utils/helpers/close-plugin';
import { getIndexesToInstances, getInstancesByStoredIndexes } from './modules/utils/helpers/get-variant-structure';
import { getVariantsAllPosibleCases } from './modules/utils/helpers/get-variants-possible-cases';
import { messages } from './modules/utils/message';
import { CLOSE_PLUGIN_MSG, PLUGIN_NAME, settings } from './settings';

console.clear();

const createVariant = (node: ComponentNode, properties: VariantMixin, instancesIndexes: number[][] = []) => {
  const { parent } = node;

  const newVariant = node.clone();
  parent.appendChild(newVariant);
};

const initPluginAsync = async () => {
  const command = figma.command;
  const node = figma.currentPage.selection[0] as ComponentNode;

  if (!isComponent(node)) {
    closePlugin(messages().default().info);
  }

  if (command === 'test') {
    const validInstances = node.findAll(isInstanceWithVariants) as InstanceNode[];

    const indexesToInstances = getIndexesToInstances(validInstances);

    const newInstances = getInstancesByStoredIndexes(node, indexesToInstances);

    const test = getVariantsAllPosibleCases(validInstances);
    console.log('🚀 ~ test', test);

    debugger;

    // console.log('🚀 ~ indexesToInstances', indexesToInstances);
    // console.log('🚀 ~ variantsKeys', instanceProps);
    // console.log('🚀 ~ instanceValues', instanceValues);
    // console.log('🚀 ~ instancesGroupPropsLength', instancesGroupPropsLength);
    // console.log('🚀 ~ allCases', possibleCases);

    closePlugin(messages().default().success);
  }
};

const runPlugin = async () => {
  // Performance data starts
  const automaterStartTime = new Date().getTime();
  const automaterRunStartTime = new Date().toLocaleString('en-GB');
  console.log(`${PLUGIN_NAME} start time: ${automaterRunStartTime}`);

  // Code running
  try {
    await initPluginAsync();
  } catch (error) {
    if (error === CLOSE_PLUGIN_MSG) {
      figma.closePlugin();
    } else {
      figma.notify(String(error), settings.notification.long);
      figma.closePlugin();
      throw error;
    }
  }

  // Performance data ends
  const automaterEndTime = new Date().getTime();
  const automaterDiffTime = automaterEndTime - automaterStartTime;
  console.log(`${PLUGIN_NAME} runtime:`, automaterDiffTime, `ms`);
  console.log(`--- ${PLUGIN_NAME} stopped running ---`);
  console.log(` `);
};

runPlugin();
