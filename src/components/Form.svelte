<script lang="ts">
  import BtnFirm from "./BtnFirm.svelte";
  import Checkbox from "./Checkbox.svelte";
  import FormField from "./FormField.svelte";
  import FormTextarea from "./FormTextarea.svelte";
</script>

<form class="form">
  <fieldset>
    <FormField placeholder="Ваше имя" name="name" required />
    <FormField
      placeholder="Из какого вы издания или блога? Пожалуйста, укажите ссылку"
      name="from_link"
      required
    />
    <FormField placeholder="E-mail" type="email" name="email" required />
    <FormField
      placeholder="Другой удобный способ связи с Вами"
      name="contact"
    />
    <FormTextarea
      placeholder="Оставьте комментарий или просто напишите нам :)"
      name="comment"
    />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="access">
      <Checkbox name="access" required />
      <p>
        Нажимая на кнопку, вы соглашаетесь с
        <a href="/">политикой конфиденциальности</a><br /> и на обработку персональных
        данных
      </p>
    </label>
  </fieldset>
  <BtnFirm>Отправить</BtnFirm>
</form>

<style lang="scss">
  form {
    padding: 1rem;
    padding-top: 0;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    all: unset;
    display: grid;

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
