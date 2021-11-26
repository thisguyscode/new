import { allPossibleCases } from './modules/utils/array';
import { isComponent, isInstanceWithVariants } from './modules/utils/boolean';
import { closePlugin } from './modules/utils/helpers/close-plugin';
import { getVariantGroupProps } from './modules/utils/helpers/get-variant-group-props';
import { getIndexesToInstances, getInstanceByStoredIndexes } from './modules/utils/helpers/get-variant-structure';
import { messages } from './modules/utils/message';
import { CLOSE_PLUGIN_MSG, PLUGIN_NAME, settings } from './settings';

console.clear();

const createVariant = (node: ComponentNode, properties: VariantMixin) => {
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
    const instances = node.findAll(isInstanceWithVariants) as InstanceNode[];

    const testTwo = getIndexesToInstances(instances);
    console.log('🚀 ~ testTwo', testTwo);

    const bbb = testTwo.map((item) => getInstanceByStoredIndexes(node, item));
    console.log('🚀 ~ bbb', bbb);

    const instanceAllProps = getVariantGroupProps(instances);
    console.log('🚀 ~ instanceAllProps', instanceAllProps);
    debugger;

    const { keys, values } = Object;
    const instanceProps = [].concat(...instanceAllProps.map((group) => keys(group)));
    const instanceValues = [].concat(...instanceAllProps.map((group) => values(group))).map((el) => el.values);

    const allCases = allPossibleCases(instanceValues);

    let counter = 0;

    const groupedInstances = instances.map((instance, instanceIndex) => {
      const props = Object.keys(instance.variantProperties);
      const propsIndexes = props.map((key) => counter++);

      return {
        instance,
        propsIndexes,
      };
    });

    /* console.log('🚀 ~ variantsKeys', instanceProps);
    console.log('🚀 ~ instanceValues', instanceValues);
    console.log('🚀 ~ allCases', allCases);
    console.log('🚀 ~ groupedInstances', groupedInstances); */

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
