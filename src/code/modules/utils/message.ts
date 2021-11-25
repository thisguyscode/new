import { settings } from '../../settings';

// This is used to get the necessary props from the nodes
export const getMessageProps = (nodes, compatibleNodes = nodes) => {
  const compatibles = compatibleNodes.length;
  const incompatibles = nodes.length - compatibles;
  const newSelection = figma.currentPage.selection.length;

  return {
    counter: { compatibles, incompatibles, newSelection },
    state: { mask: newSelection[0]?.isMask },
  };
};

// All messages function
// Done like this for Autocomplete
export const allMessages = (options) => {
  const { counter = settings.message.counter, state = settings.message.state } = { ...options };

  const SPACER = '\u3164';

  const formatGeneric = (helper: string) => {
    const incompatibles = counter.incompatibles === 0 ? `` : ` ${SPACER} ℹ️ Incompatible: ${counter.incompatibles}`;

    return `✅ ${helper}: ${counter.newSelection}`.concat(incompatibles);
  };

  const formatInfo = (string: string) => `ℹ️ ${string}`;
  const formatWarning = (string: string) => `⚠️ ${string}`;
  const formatSuccess = (string: string) => `✅ ${string}`;

  // All messages
  // TODO: rename all infos to notSupported, and add instruction for empty selection
  return {
    default: () => ({
      info: formatInfo(`Selected layers are not supported.`),
      success: formatGeneric(`Updated`),
    }),
    emptySelection: () => formatInfo(`This feature requires at least one layer to be selected.`),
    unexpected: () => `🤯 This should not happen. Nothing changed, but you should check in any case and Undo.`,
  };
};
