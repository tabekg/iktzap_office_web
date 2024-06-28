import axios from "axios";
import { API_URL } from "./config";

interface TResponse<T> {
  payload: T;
  status: string;
  result: number;
}

async function request<T>(
  url: string,
  method: string,
  params: any,
  payload: IRequesterPayload,
  extra: any = {}
): Promise<TResponse<T>> {
  const token = localStorage.getItem("token");

  return new Promise<TResponse<T>>((resolve, reject) => {
    const headers: { [key: string]: string } = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const data = ["get"].includes(method) ? { params } : { data: params };

    axios({
      baseURL: `${API_URL}${payload.no_api ? "" : "/v1"}`,
      url,
      method,
      headers: headers,
      ...data,
      ...extra,
    })
      .then((res) => {
        if (res.data.status === "success") {
          resolve(res.data as TResponse<T>);
        } else {
          reject(res.data);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

interface IRequesterPayload {
  no_api?: boolean;
  language?: string;
}

function get<T>(
  url: string,
  params: { [key: string]: string | number | null | undefined } = {},
  payload: IRequesterPayload = {},
  extra: any = {}
) {
  return request<T>(url, "get", params, payload, extra);
}

function storage(url: string) {
  return request(
    "/storage" + url,
    "get",
    {},
    {
      no_api: true,
    }
  );
}

function post<T>(url: string, data: any = {}, payload: IRequesterPayload = {}) {
  return request<T>(url, "post", data, payload);
}

function _delete(url: string, data: any = {}, payload: IRequesterPayload = {}) {
  return request(url, "delete", data, payload);
}

export default {
  get,
  post,
  delete: _delete,
  storage,
};
