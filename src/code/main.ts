import { CLOSE_PLUGIN_MSG, PLUGIN_NAME, settings } from './settings';

console.clear();

const initPluginAsync = async () => {
  const command = figma.command;
  const selection = figma.currentPage.selection;

  if (command === 'test') {
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
