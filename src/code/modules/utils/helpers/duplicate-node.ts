import { isComponent } from '../boolean';

export const duplicateNode = (node) => (isComponent(node) ? node.createInstance() : node.clone());
