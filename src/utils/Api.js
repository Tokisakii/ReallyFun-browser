import Config from "./Config";

function Api(path) {
  return Config.API_PREFIX + path;
}

export default Api;
