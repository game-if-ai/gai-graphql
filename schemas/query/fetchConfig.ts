import Config, { ConfigModel, ConfigType } from "../Models/Config";

export const fetchConfig = {
  type: ConfigType,

  async resolve(parent: any, args: any) {
    try {
      const config = await Config.findOne({});
      return config;
    } catch (e) {
      console.log(e);
      throw new Error(String(e));
    }
  },
};
export default fetchConfig;
