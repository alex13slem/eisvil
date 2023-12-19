import type { FormSchema } from "../../src/schemas/formSchema";
import { notifyViaTelegramBot } from "../../src/utils/notifyViaTelegramBot";

const { TELEGRAM_BOT_API_TOKEN, TELEGRAM_BOT_CHAT_ID } = process.env;

async function sendBlogerForm(fields: FormSchema) {
  const { botFlaggedSpam, access, name, email, fromLink, contact, comment } =
    fields;

  const htmlMessage = /* html */ `<b>Новая заявка</b>
<i>имя</i>: ${name}
<i>почта</i>: <a href="mailto:${email}">${email}</a>
<i>откуда</i>: <a href="${fromLink}">${fromLink}</a>
<i>способ связи</i>: ${contact || "нет"}
<i>комментарий</i>: ${comment || "нет"}`;

  return await notifyViaTelegramBot({
    botFlaggedSpam,
    access,
    htmlMessage,
    apiToken: TELEGRAM_BOT_API_TOKEN,
    chatId: TELEGRAM_BOT_CHAT_ID,
  });
}

const handler = async ({
  body,
  httpMethod,
}: {
  body: string;
  httpMethod: string;
}) => {
  try {
    if (httpMethod.toLowerCase() !== "post") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }
    if (!body) {
      return {
        statusCode: 400,
        body: "Body not correct",
      };
    }
    const data = JSON.parse(body);

    const { error } = await sendBlogerForm(data);

    if (error) {
      return {
        statusCode: 400,
        body: error,
      };
    }

    return { statusCode: 200, body: "successful" };
  } catch (error: unknown) {
    return { statusCode: 400, body: error };
  }
};

export { handler };
