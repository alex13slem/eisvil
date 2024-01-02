<script lang="ts">
  import { publishingOptions } from "../../store/publishing";
  import { pubModalIsOpen } from "../../store/modals";
  import BtnFirm from "../BtnFirm.svelte";
  import Checkbox from "../Checkbox.svelte";
  import FormField from "../FormField.svelte";
  import FormSelect from "../FormSelect.svelte";
  import FormTextarea from "../FormTextarea.svelte";
  import { publishingFormSchema } from "../../schemas/forms";
  import { getErrors } from "../../utils/zod";
  import localforage from "localforage";
  import { pubFormSubmitted, pubTargetSlug } from "../../store/forms";
  import { toasterHub } from "../../store/toasterHub";
  import { sendForm } from "../../utils/sendForm";
  import { formatErrors } from "../../utils/helpers";

  type Fields = {
    botField: boolean;
    access: {
      secure: boolean;
      user: boolean;
    };
    name: string | null;
    email: string | null;
    linkPreview: string | null;
    linkBuild: string | null;
    info: string | null;
    selectedDir: string | null;
  };

  const formValuesInit: Fields = {
    botField: false,
    access: {
      secure: false,
      user: false,
    },
    name: null,
    email: null,
    linkPreview: null,
    linkBuild: null,
    info: null,
    selectedDir: null,
  };

  let formValues = { ...formValuesInit };
  let submitting = false;
  let sendingAttempt = false;

  $: validationResult = publishingFormSchema.safeParse(formValues);
  $: errors = getErrors(validationResult);
  $: if (!formValues.linkPreview) formValues.linkPreview = null;

  const handleSubmit = async () => {
    sendingAttempt = true;
    submitting = true;

    if (
      !validationResult.success ||
      !Object.values(formValues.access).every(Boolean)
    )
      return (submitting = false);

    const { ok, error } = await sendForm({
      url: "/api/publishing-form",
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
      await localforage.setItem("pubFormSubmitted", "true").then(() => {
        pubFormSubmitted.set(true);
        pubModalIsOpen.set(false);
      });
    }
  };

  pubTargetSlug.subscribe((slug) => {
    const pubTarget = publishingOptions.find((option) => option.slug === slug);
    formValues.selectedDir = pubTarget?.value || null;
  });
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
      placeholder="Имя"
      name="name"
      bind:value={formValues.name}
      error={sendingAttempt && errors?.name ? formatErrors(errors.name) : null}
    />
    <FormField
      placeholder="E-mail"
      name="email"
      bind:value={formValues.email}
      error={sendingAttempt && errors?.email
        ? formatErrors(errors.email)
        : null}
    />
    <FormField
      placeholder="Ссылка на трейлер или запись геймплея (не обязательно)"
      name="linkPreview"
      bind:value={formValues.linkPreview}
      error={sendingAttempt && errors?.linkPreview && formValues.linkPreview
        ? formatErrors(errors.linkPreview)
        : null}
    />
    <FormField
      placeholder="Ссылка на билд"
      name="linkBuild"
      bind:value={formValues.linkBuild}
      error={sendingAttempt && errors?.linkBuild
        ? formatErrors(errors.linkBuild)
        : null}
    />
    <FormTextarea
      placeholder="Описание игры"
      name="info"
      bind:value={formValues.info}
      error={sendingAttempt && errors?.info ? formatErrors(errors.info) : null}
    />
  </fieldset>

  <FormSelect
    options={publishingOptions}
    bind:value={formValues.selectedDir}
    placeholder="Выбрать направление"
  />

  <div class="access">
    <Checkbox
      name="access_secure"
      bind:checked={formValues.access.secure}
      invalid={sendingAttempt && !formValues.access.secure}
    />
    <span>
      Нажимая на кнопку, вы соглашаетесь с
      <a href="/">политикой конфиденциальности</a>
      и на обработку персональных данных
    </span>
  </div>

  <div class="access">
    <Checkbox
      name="access_user"
      bind:checked={formValues.access.user}
      invalid={sendingAttempt && !formValues.access.user}
    />
    <span>
      Нажимая на кнопку, вы соглашаетесь с <a href="/"
        >пользовательстким соглашением</a
      >
    </span>
  </div>

  <BtnFirm variant="contrast" disabled={submitting}>Отправить</BtnFirm>
</form>

<style lang="scss">
  form {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    all: unset;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  form :global(textarea) {
    min-height: 118px;
  }
  form :global(button) {
    align-self: flex-start;
  }

  .access {
    display: flex;
    align-items: center;
    font-size: 10px;
    gap: 10px;

    span {
      max-width: 360px;
    }

    a {
      color: rgb(var(--color-accent));
      text-decoration: underline;
    }
  }
</style>
