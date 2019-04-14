import { fetchText } from '../utils.js';

const exampleRoot = 'script/examples';


export const fetchExample = async (name) => {
  const resolveUrl = resolveCurrentDirectory(name);
  const configUrl = resolveUrl('./index.json');
  const config = JSON.parse(await fetchText(configUrl));
  return {
    ...config,
    css: config.css.map(resolveUrl),
    js: config.js.map(resolveUrl),
    pug: await fetchText(resolveUrl(config.pug))
  };
};


const resolveCurrentDirectory = (name) => (url) => url.replace(/^\.\//, `${exampleRoot}/${name}/`);
