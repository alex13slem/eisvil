<script lang="ts">
  import { servModalIsOpen } from "../store/modals";
  import { servicesOptions } from "../store/services";
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import FormSelect from "./FormSelect.svelte";
  import { servicesFormSchema } from "../schemas/forms";
  import { getErrors } from "../utils/zod";
  import { sendForm } from "../utils/sendForm";
  import { toasterHub } from "../store/toasterHub";
  import localforage from "localforage";
  import { servFormSubmitted, servTargetSlug } from "../store/forms";
  import { formatErrors } from "../utils/helpers";

  type Fields = {
    botField: boolean;
    access: boolean;
    name: string | null;
    email: string | null;
    info: string | null;
    selectedService: string | null;
  };

  const formValuesInit: Fields = {
    botField: false,
    access: false,
    name: null,
    email: null,
    info: null,
    selectedService: null,
  };

  let formValues = { ...formValuesInit };
  let submitting = false;
  let sendingAttempt = false;
  let selectIsOpen: boolean;

  $: validationResult = servicesFormSchema.safeParse(formValues);
  $: errors = getErrors(validationResult);

  const handleSubmit = async () => {
    sendingAttempt = true;

    if (!formValues.info) formValues.info = null;
    if (errors?.selectedService) selectIsOpen = true;
    if (!validationResult.success || !formValues.access) return;

    submitting = true;

    const { ok, error } = await sendForm({
      url: "/api/services-form",
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
      await localforage.setItem("servFormSubmitted", "true").then(() => {
        servFormSubmitted.set(true);
        servModalIsOpen.set(false);
      });
    }
  };

  servTargetSlug.subscribe((slug) => {
    formValues.selectedService =
      servicesOptions.find((option) => option.slug === slug)?.value || null;
  });
</script>

<form data-astro-reload on:submit|preventDefault={handleSubmit}>
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
    <FormTextarea
      placeholder="Ссылка на документацию проекта или иные данные ..."
      name="info"
      bind:value={formValues.info}
      error={sendingAttempt && errors?.info && formValues.info
        ? formatErrors(errors.info)
        : null}
    />
  </fieldset>

  <FormSelect
    options={servicesOptions}
    bind:value={formValues.selectedService}
    placeholder="Выбрать направление"
    bind:open={selectIsOpen}
  />

  <div class="access">
    <Checkbox
      name="access"
      bind:checked={formValues.access}
      invalid={sendingAttempt && !formValues.access}
    />
    <span>
      Нажимая на кнопку, вы соглашаетесь с
      <a href="/">политикой конфиденциальности</a>
      и на обработку персональных данных
    </span>
  </div>

  <BtnFirm variant="contrast">Отправить</BtnFirm>
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
