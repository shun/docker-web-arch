import * as fs from "fs";

const packagejson = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));
const tsconfigjson = JSON.parse(fs.readFileSync(__dirname + '/../tsconfig.json', 'utf8'));

const customizejson = JSON.parse(fs.readFileSync(__dirname + '/./customize.json', 'utf8'));
const customize_packagejson = customizejson["package.json"];
const customize_tsconfigjson = customizejson["tsconfig.json"];

digging_node(packagejson, customize_packagejson);
digging_node(tsconfigjson, customize_tsconfigjson);
fs.writeFileSync(__dirname + "/../package.json", JSON.stringify(packagejson, null, '  '));
fs.writeFileSync(__dirname + "/../tsconfig.json", JSON.stringify(tsconfigjson, null, '  '));

function digging_node(target: any, config: any) {

  const keys = Object.keys(config);
  for( const key of keys) {

    if (Array.isArray(config[key])) {
      target[key] = target[key].concat(config[key]);

    } else if (is_node(config[key])) {
      if (key in target)  digging_node(target[key], config[key]);
      else                update_node(target, key, config[key]);

    } else {
      update_node(target,key, config[key]);

    }
  }
}

function update_node(node: any, key: string, value: number | string | boolean) {
  node[key] = value;
}

function is_node(node: any) {
  return typeof node === 'object' ? true : false;
}
