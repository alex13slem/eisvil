<script lang="ts">
  import { publishingModalForm } from "../store/modals";
  import {
    type PublishingFormValues,
    publishingOptions,
  } from "../store/publishing";
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormSelect from "./FormSelect.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import Modal from "./Modal.svelte";

  const formValuesInit: PublishingFormValues = {
    accessSecure: false,
    accessUser: false,
    botField: false,
    name: "",
    email: "",
    linkPreview: "",
    linkBuild: "",
    info: "",
    selectedDir: null,
  };

  let formValues = { ...formValuesInit };

  publishingModalForm.subscribe(({ slug }) => {
    formValues.selectedDir =
      publishingOptions.find((option) => option.slug === slug)?.value || null;
  });
</script>

<Modal
  bind:isOpen={$publishingModalForm.isOpen}
  title="ПОДАТЬ ЗАЯВКУ НА ИЗДАТЕЛЬСТВО"
  links={{
    contacts: [{ href: "mailto:mail@to.aw", text: "mail@to.aw" }],
    other: [
      { href: "asd.as", text: "Ссылка" },
      { href: "asd.as", text: "Ссылка" },
    ],
  }}
>
  <form data-astro-reload>
    <input
      name="bot-field"
      aria-hidden="true"
      type="hidden"
      bind:value={formValues.botField}
    />
    <fieldset>
      <FormField placeholder="Имя" name="name" bind:value={formValues.name} />
      <FormField
        placeholder="E-mail"
        name="email"
        bind:value={formValues.email}
      />
      <FormField
        placeholder="Ссылка на трейлер или запись геймплея (не обязательно)"
        name="linkPreview"
        bind:value={formValues.linkPreview}
      />
      <FormField
        placeholder="Ссылка на билд"
        name="linkBuild"
        bind:value={formValues.linkBuild}
      />
      <FormTextarea
        placeholder="Описание игры"
        name="info"
        bind:value={formValues.info}
      />
    </fieldset>

    <FormSelect
      options={publishingOptions}
      bind:value={formValues.selectedDir}
      placeholder="Выбрать направление"
    />

    <div class="access">
      <Checkbox name="access" bind:checked={formValues.accessSecure} />
      <span>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a>
        и на обработку персональных данных
      </span>
    </div>

    <div class="access">
      <Checkbox name="access" bind:checked={formValues.accessUser} />
      <span>
        Нажимая на кнопку, вы соглашаетесь с <a href="/"
          >пользовательстким соглашением</a
        >
      </span>
    </div>

    <BtnFirm variant="contrast">Отправить</BtnFirm>
  </form>
</Modal>

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
