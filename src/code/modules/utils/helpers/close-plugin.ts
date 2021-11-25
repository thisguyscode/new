import { CLOSE_PLUGIN_MSG, settings } from '../../../settings';

export const closePlugin = (message = 'Fallback', notificationTime = settings.notification.default) => {
  figma.notify(message, notificationTime);
  throw CLOSE_PLUGIN_MSG;
};
