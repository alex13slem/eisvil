<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import { blogersFormSchema } from "../schemas/forms";
  import { sendForm } from "../utils/sendForm";
  import { getErrors } from "../utils/zod";
  import { formatErrors } from "../utils/helpers";
  import localforage from "localforage";
  import { blogerFormSubmitted } from "../store/forms";
  import { toasterHub } from "../store/toasterHub";
  import { pubModalIsOpen } from "../store/modals";

  const formValuesInit = {
    email: "",
    name: "",
    fromLink: "",
    access: false,
    botFlaggedSpam: false,
    contact: "",
    comment: "",
  };

  let formValues = { ...formValuesInit };
  let submitting = false;
  let sendingAttempt = false;

  $: validationResult = blogersFormSchema.safeParse(formValues);
  $: errors = getErrors(validationResult);

  const handleSubmit = async () => {
    sendingAttempt = true;

    if (!validationResult.success || !formValues.access) return;

    submitting = true;

    const { ok, error } = await sendForm({
      url: "/api/blogers-form",
      values: formValues,
    }).finally(() => {
      submitting = false;
    });

    if (!ok) {
      toasterHub.set([error, ...$toasterHub]);
    } else {
      toasterHub.set(["Ваша заявка отправлена!", ...$toasterHub]);
      sendingAttempt = false;
      formValues = { ...formValuesInit };
      await localforage.setItem("blogerFormSubmitted", "true").then(() => {
        blogerFormSubmitted.set(true);
      });
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} data-astro-reload>
  <input
    name="bot-field"
    aria-hidden="true"
    type="hidden"
    bind:value={formValues.botFlaggedSpam}
  />
  <fieldset>
    <FormField
      className="name"
      name="name"
      placeholder="Ваше имя"
      bind:value={formValues.name}
      error={errors?.name && sendingAttempt ? formatErrors(errors.name) : null}
    />

    <FormField
      type="url"
      name="from_link"
      className="from-link"
      placeholder="Из какого вы издания или блога? Пожалуйста, укажите ссылку"
      bind:value={formValues.fromLink}
      error={errors?.fromLink && sendingAttempt
        ? formatErrors(errors.fromLink)
        : null}
    />

    <FormField
      type="email"
      className="email"
      placeholder="E-mail"
      bind:value={formValues.email}
      error={errors?.email && sendingAttempt
        ? formatErrors(errors.email)
        : null}
    />

    <FormField
      name="contact"
      className="contact"
      placeholder="Другой удобный способ связи с Вами"
      bind:value={formValues.contact}
      error={errors?.contact && sendingAttempt
        ? formatErrors(errors.contact)
        : null}
    />

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
        invalid={sendingAttempt && !formValues.access}
        bind:checked={formValues.access}
      />
      <p>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a><br /> и на обработку персональных
        данных
      </p>
    </label>
  </fieldset>
  <BtnFirm type="submit">Отправить</BtnFirm>
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
