<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import { formSchema } from "../schemas/formSchema";
  import type { ZodFormattedError } from "astro/zod";
  import FormFieldError from "./FormFieldError.svelte";

  type ServerState = { ok: boolean; msg: string };
  type FormValues = {
    botField: boolean;
    name: string;
    email: string;
    fromLink: string;
    contact: string;
    comment: string;
    access: boolean;
  };

  const formValuesInit: FormValues = {
    access: false,
    botField: false,
    comment: "",
    contact: "",
    email: "",
    fromLink: "",
    name: "",
  };

  let formValues = { ...formValuesInit };

  let errors: ZodFormattedError<
    {
      botField?: boolean | undefined;
      contact?: string | undefined;
      comment?: string | undefined;
      name: string;
      email: string;
      fromLink: string;
      access: boolean;
    },
    string
  >;

  let serverState: ServerState = { ok: false, msg: "" };
  let submitting = false;
  let sendingAttempt = false;

  $: validationResult = formSchema.safeParse(formValues);
  $: if (validationResult && !serverState.ok) {
    checkValidate();
  }

  function handleServerResponse(ok: boolean, msg: string) {
    serverState = { ok, msg };
  }

  function checkValidate() {
    if (!validationResult.success) {
      errors = validationResult.error.format();
      return false;
    } else {
      errors = { _errors: [] };
      return true;
    }
  }

  const handleSubmit = async () => {
    sendingAttempt = true;

    if (!checkValidate() || !formValues.access) return;

    const { botField, name, email, fromLink, contact, comment, access } =
      formValues;

    try {
      submitting = true;

      await fetch("/api/contact-form-message", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botField,
          email,
          name,
          fromLink,
          contact,
          comment,
          access,
        }),
      });

      submitting = false;
      handleServerResponse(true, "");
    } catch (error) {
      console.error(`Eror: ${error}`);
      submitting = false;
      handleServerResponse(
        false,
        "Не удалось отправить сообщение. Попробуйте позже."
      );
    } finally {
      formValues = { ...formValuesInit };
      console.log(formValues);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    name="bot-field"
    aria-hidden="true"
    type="hidden"
    bind:value={formValues.botField}
  />
  <fieldset>
    <FormField name="name" placeholder="Ваше имя" bind:value={formValues.name}>
      {#if errors?.name && sendingAttempt}
        <FormFieldError errors={errors.name} />
      {/if}
    </FormField>

    <FormField
      name="from_link"
      placeholder="Из какого вы издания или блога? Пожалуйста, укажите ссылку"
      bind:value={formValues.fromLink}
    >
      {#if errors?.fromLink && sendingAttempt}
        <FormFieldError errors={errors.fromLink} />
      {/if}
    </FormField>

    <FormField type="email" placeholder="E-mail" bind:value={formValues.email}>
      {#if errors?.email && sendingAttempt}
        <FormFieldError errors={errors.email} />
      {/if}
    </FormField>

    <FormField
      name="contact"
      placeholder="Другой удобный способ связи с Вами"
      bind:value={formValues.contact}
    >
      {#if errors?.contact && sendingAttempt}
        <FormFieldError errors={errors.contact} />
      {/if}
    </FormField>

    <FormTextarea
      name="comment"
      placeholder="Оставьте комментарий или просто напишите нам :)"
      bind:value={formValues.comment}
    />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="access">
      <Checkbox
        name="access"
        invalid={sendingAttempt && !formValues.access && !serverState.ok}
        bind:checked={formValues.access}
      />
      <p>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a><br /> и на обработку персональных
        данных
      </p>
    </label>
  </fieldset>
  <BtnFirm
    type="submit"
    disabled={((!validationResult.success || !formValues.access) &&
      sendingAttempt) ||
      submitting ||
      serverState.ok}
  >
    {serverState.ok ? "Благодарим!" : "Отправить"}
  </BtnFirm>
</form>

<style lang="scss">
  form {
    padding: 30px;
    padding-top: 0;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    all: unset;
    display: grid;

    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "name contact"
      "from_link comment"
      "email comment"
      ". access";
    gap: 10px 30px;
  }
  fieldset :global(.form-field:has(input[name="name"])) {
    grid-area: name;
  }
  fieldset :global(.form-field:has(input[name="from_link"])) {
    grid-area: from_link;
  }
  fieldset :global(.form-field:has(input[name="email"])) {
    grid-area: email;
  }
  fieldset :global(.form-field:has(input[name="contact"])) {
    grid-area: contact;
  }
  fieldset :global(.form-textarea) {
    grid-area: comment;
  }
  .access {
    grid-area: access;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    a {
      color: rgb(var(--color-accent));
    }
    p {
      margin: 0;
    }
  }
  form :global(.btn-firm) {
    align-self: center;
  }
</style>
