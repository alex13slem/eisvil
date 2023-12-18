import axios from "axios";

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

    await axios({
      url: `https://api.telegram.org/bot${apiToken}/sendMessage?parse_mode=HTML`,
      method: "POST",
      data: {
        chat_id: chatId,
        text: htmlMessage,
      },
    });

    return { successful: true };
  } catch (error: any) {
    let message: string;
    if (error.response) {
      message = `Telegram server responded with ${error.response.data.error_code} code: ${error.response.data.description}`;
    } else if (error.request) {
      message = `No Telegram response received: ${error.request}`;
    } else {
      message = `Error setting up telegram response: ${error.message}`;
    }
    return { successful: false, error: message };
  }
}
