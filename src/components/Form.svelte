<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";

  type ServerState = { ok: boolean; msg: string };

  let botField: string;

  let name: string;
  let email: string;
  let fromLink: string;
  let contact: string;
  let comment: string;

  let access: boolean;

  let serverState: ServerState;
  $: submitting = false;

  function handleServerResponse(ok: boolean, msg: string) {
    serverState = { ok, msg };
  }

  const handleSubmit = async () => {
    console.log({ email, name, fromLink, contact, comment, access });
    try {
      submitting = true;
      await fetch("/api/functions/contact-form-message", {
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
        "Unable to send your message at the moment.  Please try again later."
      );
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="form">
  <input
    aria-hidden="true"
    type="hidden"
    name="bot-field"
    bind:value={botField}
  />
  <fieldset>
    <FormField placeholder="Ваше имя" bind:value={name} name="name" required />
    <FormField
      placeholder="Из какого вы издания или блога? Пожалуйста, укажите ссылку"
      bind:value={fromLink}
      name="from_link"
      required
    />
    <FormField placeholder="E-mail" bind:value={email} type="email" required />
    <FormField
      placeholder="Другой удобный способ связи с Вами"
      bind:value={contact}
      name="contact"
    />
    <FormTextarea
      placeholder="Оставьте комментарий или просто напишите нам :)"
      bind:value={comment}
      name="comment"
    />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="access">
      <Checkbox name="access" bind:checked={access} required />
      <p>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a><br /> и на обработку персональных
        данных
      </p>
    </label>
  </fieldset>
  <BtnFirm type="submit" disabled={submitting}>Отправить</BtnFirm>
  {#if serverState}<p class={!serverState.ok ? "errorMsg" : ""}>
      {serverState.msg}
    </p>{/if}
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
