<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
  import Modal from "./Modal.svelte";
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@rgossiaux/svelte-headlessui";
  import type { CollectionEntry } from "astro:content";

  export let services: CollectionEntry<"services">[];

  let isOpen = false;

  const formValuesInit = {
    access: false,
    botField: false,
    name: "",
    email: "",
    info: "",
  };

  let formValues = { ...formValuesInit };

  console.log(services);
  let selectedService: string;
</script>

<BtnFirm on:click={() => (isOpen = true)}>Создать новый мир</BtnFirm>

<Modal title="СВЯЗЬ С НАМИ" bind:isOpen>
  <form>
    <input
      name="bot-field"
      aria-hidden="true"
      type="hidden"
      bind:value={formValues.botField}
    />
    <fieldset>
      <div class="fields">
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
      </div>

      <Listbox bind:value={selectedService}>
        <ListboxButton>{selectedService || "Выбрать направление"}</ListboxButton
        >
        <ListboxOptions>
          {#each services as { data: { title }, slug } (slug)}
            <ListboxOption value={title}>
              {title}
            </ListboxOption>
          {/each}
        </ListboxOptions>
      </Listbox>

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
    </fieldset>
    <aside>
      <h3>Можете написать нам сами:</h3>
      <a href="mailto:info@eisvil.com">Info@eisvil.com</a>
      <h3>Как мы работаем | полезное:</h3>
      <a href="/">Ссылка на сюда</a>
      <a href="/">Ссылка на сюда</a>
      <a href="/">Ссылка на сюда</a>
    </aside>
  </form>
</Modal>

<style lang="scss">
  form {
    display: flex;
    gap: 50px;
  }
  fieldset {
    all: unset;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    :global(button) {
      align-self: start;
    }
  }
  .fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  :global(textarea) {
    min-height: 118px;
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
  aside {
    flex: 0 0 250px;
    display: flex;
    flex-direction: column;

    a {
      margin-top: 20px;
      color: rgb(var(--color-text));
      font-size: 12px;
      font-weight: 600;
    }
  }
  h3 {
    margin: 0;
    color: rgb(var(--color-label));
    font-size: 10px;

    &:not(:first-child) {
      margin-top: 50px;
    }
  }
</style>
