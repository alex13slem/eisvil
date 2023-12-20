import axios, { AxiosError } from "axios";

export async function notifyViaTelegramBot({
  botFlaggedSpam,
  access,
  htmlMessage,
  apiToken,
  chatId,
}: {
  botFlaggedSpam: boolean | undefined;
  access: boolean;
  htmlMessage: string;
  apiToken: string;
  chatId: string;
}) {
  try {
    if (!access) {
      throw new Error("No digital data processing agreement");
    }
    if (botFlaggedSpam) {
      throw new Error("Spam detected");
    }

    const { data } = await axios.post(
      `https://api.telegram.org/bot${apiToken}/sendMessage`,
      {
        chat_id: chatId,
        text: htmlMessage,
      },
      {
        params: {
          parse_mode: "HTML",
        },
      },
    );

    return Response.json(data, {
      status: 200,
      statusText: "Message Submitted",
    });
  } catch (error: any) {
    let status: number;
    let statusText: string;
    if (error instanceof AxiosError) {
      if (error.response) {
        const { error_code, description } = error.response.data;
        statusText = `Telegram server error: ${description}`;
        status = error_code;
      } else {
        statusText = `No Telegram response received`;
        status = 500;
      }
    } else {
      statusText = `Error setting up telegram response: ${error.message}`;
      status = 400;
    }

    console.error(new Error(statusText));
    return Promise.reject({ status, statusText });
  }
}
