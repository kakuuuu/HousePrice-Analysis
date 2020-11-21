/**
 * axios基础构建
 */

import instance from "./intercept";
import { AxiosRequest, CustomResponse } from "./types";
import storage from "@/utils/storage";
import { message } from "ant-design-vue";

class Abstract {
  protected baseURL: string =
    process.env.NODE_ENV == "development"
      ? "/api/api/"
      : "http://www.liaowang.xyz:3000/api";

  protected headers: object = {
    'Content-Type': "application/json;charset=UTF-8"
  };

  private apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType
  }: AxiosRequest): Promise<CustomResponse> {
    Object.assign(headers, {
      Authorization:
        storage().get("token") || storage("localstorage").get("token")
    });

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType
      })
        .then((res: any) => {
          // 200:服务端业务处理正常结束
          if (res.status === 200) {
            if (res.data.status == 0) {
              resolve({
                status: false,
                message: "success",
                desc: res.data.desc,
                data: res.data?.data,
                origin: res.data
              });
            } else {
              message.error( res.data?.desc || url + "请求失败");
              resolve({
                status: true,
                message: res.data?.desc || url + "请求失败",
                desc: res.data.desc,
                data: res.data?.data,
                origin: res.data
              });
            }
          } else {
            message.error( res.data?.desc || url + "请求失败");
            resolve({
              status: false,
              message: res.data?.desc || url + "请求失败",
              desc: res.data.desc,
              data: null
            });
          }
        })
        .catch((err: any) => {
          message.error(err?.data?.errorMessage || err?.message || url + "请求失败");
          // eslint-disable-next-line
          reject({ status: false, message, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "GET",
      url,
      data,
      params,
      responseType
    });
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "POST",
      url,
      data,
      params,
      responseType
    });
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "PUT",
      url,
      data,
      params,
      responseType
    });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "DELETE",
      url,
      data,
      params,
      responseType
    });
  }
}

export default Abstract;
