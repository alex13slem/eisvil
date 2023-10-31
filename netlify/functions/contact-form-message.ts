import axios from "axios";

const { TELEGRAM_BOT_API_TOKEN, TELEGRAM_BOT_CHAT_ID } = process.env;

async function notifyViaTelegramBot({
  botFlaggedSpam,
  name,
  email,
  fromLink,
  contact,
  comment,
  access,
}: {
  botFlaggedSpam: boolean;
  name: string;
  email: string;
  fromLink: string;
  contact: string | undefined;
  comment: string | undefined;
  access: boolean;
}) {
  try {
    if (!access) {
      throw new Error("Нет соглашения с обработкой персональных данных");
    }
    if (botFlaggedSpam) {
      throw new Error("Обнаружен спам");
    }

    const text = /* html */ `<b>Новая заявка</b>
<i>имя</i>: ${name}
<i>почта</i>: <a href="mailto:${email}">${email}</a>
<i>откуда</i>: <a href="${fromLink}">${fromLink}</a>
<i>способ связи</i>: ${contact || "нет"}
<i>комментарий</i>: ${comment || "нет"}`;

    await axios({
      url: `https://api.telegram.org/bot${TELEGRAM_BOT_API_TOKEN}/sendMessage?parse_mode=HTML`,
      method: "POST",
      data: {
        chat_id: TELEGRAM_BOT_CHAT_ID,
        text,
      },
    });
    return { successful: true };
  } catch (error: any) {
    let message: string;
    if (error.response) {
      message = `Telegram server responded with non 2xx code: ${error.response.data}`;
    } else if (error.request) {
      message = `No Telegram response received: ${error.request}`;
    } else {
      message = `Error setting up telegram response: ${error.message}`;
    }
    return { successful: false, error: message };
  }
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
    const { botField, email, name, fromLink, contact, comment, access } = data;

    const { error: telegramError } = await notifyViaTelegramBot({
      botFlaggedSpam: !!botField,
      email,
      name,
      fromLink,
      contact,
      comment,
      access,
    });

    if (telegramError) {
      return {
        statusCode: 400,
        body: telegramError,
      };
    }

    return { statusCode: 200, body: "successful" };
  } catch (error: unknown) {
    return { statusCode: 400 };
  }
};

export { handler };
