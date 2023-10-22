<script lang="ts">
  export let type: "text" | "email" | "password" = "text";
  export let placeholder: string | null = null;
  export let value: string | null = null;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class="form-field">
  <input
    on:input
    bind:value
    type="text"
    {placeholder}
    use:typeAction
    {...$$restProps}
  />
</div>

<style lang="scss">
  input {
    width: 100%;
    padding-inline: 30px;

    line-height: 3.375rem;
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-white), 30%);
    border: none;

    transition: background var(--trans-default);

    &::placeholder {
      font-size: 12px;
      color: rgb(var(--color-bg));
    }
    &:focus-visible {
      outline: none;
      background-color: rgb(var(--color-white), 50%);
    }
  }
</style>
