import { fetchText } from '../utils.js';

const exampleRoot = 'script/example';


export const fetchExample = async (name) => {
  const resolveUrl = resolveCurrentDirectory(name);
  const configUrl = resolveUrl('./index.json');
  const config = JSON.parse(await fetchText(configUrl));
  return {
    css: config.css.map(resolveUrl),
    js: config.js.map(resolveUrl),
    pug: await fetchText(resolveUrl(config.pug))
  };
};


const resolveCurrentDirectory = (name) => (url) => url.replace(/^\.\//, `${exampleRoot}/${name}/`);
