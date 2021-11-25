import { isPage } from '../boolean';

export const getNodePage = (node) => (isPage(node) ? node : getNodePage(node.parent));
