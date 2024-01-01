import type { ServicesFormSchema } from "../../src/schemas/forms";
import { notifyViaTelegramBot } from "../../src/utils/notifyViaTelegramBot";
import { post } from "../../src/utils/serverless";

const { TG_BOT_BLOGERS_API_TOKEN, TG_BOT_BLOGERS_CHAT_ID } = process.env;

async function sendBlogerForm(data: ServicesFormSchema) {
  const { botFlaggedSpam, access, name, email, info, selectedService } = data;

  let error = false;
  let statusText;

  if (!access) {
    error = true;
    statusText =
      "There is no agreement with the privacy policy on the processing of personal data";
  }
  if (botFlaggedSpam) {
    error = true;
    statusText = "Spam detected";
  }

  if (error) {
    console.error(new Error(statusText));
    return Promise.reject({ status: 400, statusText });
  }

  const htmlMessage = /* html */ `<b>${selectedService}</b>
	
<i>имя</i>: ${name}
<i>почта</i>: <a href="mailto:${email}">${email}</a>
<i>о проекте</i>: ${info || "нет"}`;

  return await notifyViaTelegramBot({
    htmlMessage,
    apiToken: TG_BOT_BLOGERS_API_TOKEN,
    chatId: TG_BOT_BLOGERS_CHAT_ID,
  });
}

export default post(sendBlogerForm);
