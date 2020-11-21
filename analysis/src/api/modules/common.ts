/**
 * 集成Abstract
 * @date 2020-8-14
 */
import Abstract from "../abstract";
import { HouseApp, UserApp } from "../types";

class Common extends Abstract {
  /**
   * 获取房价列表
   */
  getHouseList(params: HouseApp) {
    return this.getReq({ url: "getHouseList", params });
  }
  /**
   * 获取房价列表
   */
  userLogin(params: UserApp) {
    return this.getReq({ url: "userLogin", params });
  }
  /**
   * 获取房价列表
   */
  updateHouseList(params: HouseApp) {
    return this.getReq({ url: "updateHouse", params });
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Common();
  return instance;
})();
