<script lang="ts">
  export let placeholder: string | null = null;
  export let value: string | null = null;
</script>

<div class="form-textarea">
  <textarea {...$$restProps} on:input bind:value {placeholder} />
</div>

<style lang="scss">
  textarea {
    width: 100%;
    height: 100%;
    resize: none;

    padding: 23px 30px;

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
