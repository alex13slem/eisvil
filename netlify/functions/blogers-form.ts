import type { Context } from "@netlify/functions";
import type { FormSchema } from "../../src/schemas/formSchema";
import { notifyViaTelegramBot } from "../../src/utils/notifyViaTelegramBot";

const { TG_BOT_BLOGERS_API_TOKEN, TG_BOT_BLOGERS_CHAT_ID } = process.env;

async function sendBlogerForm(data: FormSchema) {
  const { botFlaggedSpam, access, name, email, fromLink, contact, comment } =
    data;

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
    apiToken: TG_BOT_BLOGERS_API_TOKEN,
    chatId: TG_BOT_BLOGERS_CHAT_ID,
  });
}

export default async (request: Request, context: Context) => {
  try {
    if (request.method !== "POST") {
      return Response.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    const data = await request.json();

    const { error } = await sendBlogerForm(data);

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ message: "Form submitted" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed sending email" }, { status: 500 });
  }
};
