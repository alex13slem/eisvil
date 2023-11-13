<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormSelect from "./FormSelect.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import Modal from "./Modal.svelte";

  import type { CollectionEntry } from "astro:content";

  export let services: CollectionEntry<"services">[];

  const servicesOptions = services.map(({ slug, data: { title: value } }) => ({
    slug,
    value,
    disabled: false,
  }));

  let isOpen = true;

  const formValuesInit = {
    access: false,
    botField: false,
    name: "",
    email: "",
    info: "",
  };

  let formValues = { ...formValuesInit };
</script>

<BtnFirm on:click={() => (isOpen = true)}>Создать новый мир</BtnFirm>

<Modal
  bind:isOpen
  title="СВЯЗЬ С НАМИ"
  links={{
    contacts: [{ href: "mailto:mail@to.aw", text: "mail@to.aw" }],
    other: [
      { href: "asd.as", text: "Ссылка" },
      { href: "asd.as", text: "Ссылка" },
    ],
  }}
>
  <form>
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
      <FormTextarea
        placeholder="Ссылка на документацию проекта или иные данные ..."
        name="info"
        bind:value={formValues.info}
      />
    </fieldset>

    <FormSelect options={servicesOptions} />

    <div class="access">
      <Checkbox name="access" bind:value={formValues.access} />
      <span>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a>
        и на
        <a href="/">обработку персональных данных</a>
      </span>
    </div>

    <BtnFirm variant="contrast">Отправить</BtnFirm>
  </form>
</Modal>

<style lang="scss">
  form {
    flex: 1 1 auto;
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
    align-self: start;
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
