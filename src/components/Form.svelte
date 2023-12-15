<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import { formSchema } from "../schemas/formSchema";
  import type { SafeParseReturnType } from "astro/zod";
  import FormFieldError from "./FormFieldError.svelte";

  const formValuesInit = {
    botField: false,
    access: false,
    comment: "",
    contact: "",
    email: "",
    fromLink: "",
    name: "",
  };

  type ServerState = { ok: boolean; msg: string };

  let formValues = { ...formValuesInit };
  $: validationResult = formSchema.safeParse(formValues);
  $: errors = getErrors(validationResult);

  let serverState: ServerState = { ok: false, msg: "" };
  let submitting = false;
  let sendingAttempt = false;

  function handleServerResponse(ok: boolean, msg: string) {
    serverState = { ok, msg };
  }

  function getErrors<Input, Output>(
    validationResult: SafeParseReturnType<Input, Output>,
  ) {
    if (!validationResult.success) return validationResult.error.format();
    return null;
  }

  const handleSubmit = async () => {
    sendingAttempt = true;

    if (!validationResult.success || !formValues.access) return;

    try {
      submitting = true;

      await fetch("/api/contact-form-message", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      submitting = false;
      handleServerResponse(true, "");
    } catch (error) {
      console.error(`Eror: ${error}`);
      submitting = false;
      handleServerResponse(
        false,
        "Не удалось отправить сообщение. Попробуйте позже.",
      );
    } finally {
      formValues = { ...formValuesInit };
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} data-astro-reload>
  <input
    name="bot-field"
    aria-hidden="true"
    type="hidden"
    bind:value={formValues.botField}
  />
  <fieldset>
    <FormField
      className="name"
      name="name"
      placeholder="Ваше имя"
      bind:value={formValues.name}
    >
      {#if errors?.name && sendingAttempt}
        <FormFieldError errors={errors.name} />
      {/if}
    </FormField>

    <FormField
      name="from_link"
      className="from-link"
      placeholder="Из какого вы издания или блога? Пожалуйста, укажите ссылку"
      bind:value={formValues.fromLink}
    >
      {#if errors?.fromLink && sendingAttempt}
        <FormFieldError errors={errors.fromLink} />
      {/if}
    </FormField>

    <FormField
      type="email"
      className="email"
      placeholder="E-mail"
      bind:value={formValues.email}
    >
      {#if errors?.email && sendingAttempt}
        <FormFieldError errors={errors.email} />
      {/if}
    </FormField>

    <FormField
      name="contact"
      className="contact"
      placeholder="Другой удобный способ связи с Вами"
      bind:value={formValues.contact}
    >
      {#if errors?.contact && sendingAttempt}
        <FormFieldError errors={errors.contact} />
      {/if}
    </FormField>

    <FormTextarea
      name="comment"
      className="comment"
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
  <BtnFirm type="submit">
    <!-- disabled={((!validationResult.success || !formValues.access) &&
      sendingAttempt) ||
      submitting ||
      serverState.ok} -->
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
    box-sizing: border-box;
    display: grid;

    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "name contact"
      "from-link comment"
      "email comment"
      ". access";
    gap: 10px 30px;
  }
  fieldset :global(.name) {
    grid-area: name;
  }
  fieldset :global(.from-link) {
    grid-area: from-link;
  }
  fieldset :global(.email) {
    grid-area: email;
  }
  fieldset :global(.contact) {
    grid-area: contact;
  }
  fieldset :global(.comment) {
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
