<script lang="ts">
  import { cn } from "../utils/helpers";
  export let type: "text" | "email" | "password" = "text";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class={cn("form-field", className)} class:typing={value}>
  <input
    on:input
    on:blur
    bind:value
    type="text"
    {placeholder}
    use:typeAction
    autocomplete="new-password"
    {...$$restProps}
  />
  <slot />
  <div class="bg" />
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-field {
    @include fields-bg();
  }

  input {
    position: relative;
    z-index: 1;
    width: 100%;
    padding-inline: 30px;

    line-height: 3.375rem;
    color: rgb(var(--color-text));
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      font-size: 12px;
      color: rgb(var(--color-bg));
    }
  }
</style>
