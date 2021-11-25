import { settings } from '../../settings';

const { frame } = settings;

export const setAutoLayoutProps = (node, props) => {
  const keys = Object.keys(frame.autolayout);

  keys.map((key) => (node[key] = props[key] || frame.autolayout[key]));

  return node;
};
