import axios, { AxiosError } from "axios";

export type SubmittingStatus = {
  ok: boolean;
  error: string;
};

type SendFormOptions<Values> = {
  url: string;
  values: Values;
};

/**
 * @param {Object} options
 * @param {String} options.url URL для отправки формы
 * @param {FormValues} options.values поля формы
 * @return {SubmittingStatus} { ok, error } - Состояние отправки
 */
export const sendForm = async <FormValues>({
  url,
  values,
}: SendFormOptions<FormValues>): Promise<SubmittingStatus> => {
  try {
    await axios.post(url, values);
    return { ok: true, error: "" };
  } catch (error: any) {
    let message;
    if (error instanceof AxiosError) {
      if (error.response) {
        message = `[API Error]: ${error.message}`;
      } else {
        message = `[Network Error]: No Response Received At ${url}`;
      }
    } else {
      message = "[Non-HTTP Error]:" + (error.message || error);
    }

    console.error(message);
    return { ok: false, error: message };
  }
};
