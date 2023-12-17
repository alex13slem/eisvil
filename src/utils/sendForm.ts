export type ServerState = { ok: boolean; msg: string };

type SendFormOptions<Values> = {
  url: string;
  values: Values;
};

/**
 * @param {Object} options
 * @param {String} options.url URL для отправки формы
 * @param {FormValues} options.values поля формы
 * @return {ServerState} { ok: boolean; msg: string } - Состояние отправки
 */
export const sendForm = async <FormValues>({
  url,
  values,
}: SendFormOptions<FormValues>): Promise<ServerState> => {
  const { ok } = await fetch(url, {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!ok) return { ok, msg: "Ошибка отправки. Смотри в консоль." };
  return { ok, msg: "" };
};
