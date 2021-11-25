import { uniq } from '../array';

export const getUniqParents = (nodes) => uniq(nodes.map((node) => node.parent));
