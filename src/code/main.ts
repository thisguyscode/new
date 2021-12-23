import { isArrayEmpty, isComponent, isComponentSet } from './modules/utils/boolean';
import { closePlugin } from './modules/utils/helpers/close-plugin';
import { createVariant, updateVariant } from './modules/utils/helpers/createVariant';
import {
  getIndexesToInstances,
  getInstanceByStoredIndexes,
} from './modules/utils/helpers/get-instances-by-stored-indexes';
import { getVariantsNodes } from './modules/utils/helpers/get-variants-nodes';
import { getVariantsAllPosibleCases } from './modules/utils/helpers/get-variants-possible-cases';
import { loadData } from './modules/utils/helpers/load-data';
import { saveData } from './modules/utils/helpers/save-data';
import { selectNodes } from './modules/utils/helpers/select-nodes';
import { messages } from './modules/utils/message';
import { CLOSE_PLUGIN_MSG, dataKeys, PLUGIN_NAME, settings } from './settings';

console.clear();

const getVariantPropsBySet = (node: ComponentSetNode) => {
  const getPropsByNodeId = (node: ComponentNode) => {
    return {
      id: node.id,
      type: node.type,
      properties: node.variantProperties,
    };
  };

  const propsByNodeID = node.children.map(getPropsByNodeId);

  const getSetProps = (node) => {
    return {
      id: node.id,
      type: node.type,
      children: propsByNodeID,
    };
  };

  return getSetProps(node);
};

const initPluginAsync = async () => {
  const command = figma.command;

  if (command === 'test') {
    const node = figma.currentPage.selection[0] as ComponentNode;

    if (!isComponent(node)) {
      closePlugin(messages().default().info);
    }

    const validInstances = getVariantsNodes(node);

    if (isArrayEmpty(validInstances)) {
      closePlugin(messages().default().info);
    }

    const variantIndexes = getIndexesToInstances(validInstances);

    const allVariantsCases = getVariantsAllPosibleCases(validInstances);

    debugger;
    return;
    const newSelection = allVariantsCases.map((variantCase) => {
      const match = node.parent.children.find((child: ComponentNode) =>
        variantIndexes.every((instanceIndex, idx) => {
          const instance = getInstanceByStoredIndexes(child, instanceIndex);

          return JSON.stringify(instance.variantProperties) === JSON.stringify(variantCase[idx]);
        }),
      ) as ComponentNode | undefined;

      const result = !match
        ? createVariant(node, variantCase, variantIndexes)
        : updateVariant(match, variantCase, variantIndexes);

      return result;
    });

    selectNodes(newSelection);
    closePlugin(messages().default().success);
  } else if (command === 'save') {
    const selection = figma.currentPage.selection;
    const compatibles = selection.filter((node) => isComponentSet(node)) as ComponentSetNode[];

    if (isArrayEmpty(compatibles)) {
      closePlugin(messages().default().info);
    }

    const cache = await loadData(dataKeys.variants);
    const compatiblesVariantProps = compatibles.map(getVariantPropsBySet);

    if (isArrayEmpty(cache)) {
      await saveData(dataKeys.variants, compatiblesVariantProps);

      closePlugin(messages().default().success);
    }

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
      console.log(error);
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
