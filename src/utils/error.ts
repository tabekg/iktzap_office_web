import { toast } from "react-toastify";

export const handleError = (e: Error, dict: { [key: string]: string }) => {
  dict = {
    network: "Ошибка соединения с сервером!",
    unknown: "Неизвестная ошибка!",
    ...dict,
  };
  let name = "unknown";
  if (e) {
    if ("response" in e) {
      // @ts-ignore
      name = e?.response?.data?.status || "network";
    }
  }
  toast.error(dict[name] ?? "Неизвестная ошибка: " + name, {
    position: "bottom-center",
  });
};

export const handleErrorFunc = (
  e: Error,
  dict: { [key: string]: () => void }
) => {
  dict = {
    network: () => null,
    unknown: () => null,
    ...dict,
  };
  let name = "unknown";
  if (e) {
    if ("response" in e) {
      // @ts-ignore
      name = e?.response?.data?.status || "network";
    }
  }
  dict[name]();
};
