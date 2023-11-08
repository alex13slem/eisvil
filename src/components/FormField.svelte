<script lang="ts">
  import { cn } from "../utils/helpers";
  import SVGArrow from "./svg/SVGArrow.svelte";
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
  <span class="arrow left"><SVGArrow /></span>
  <span class="arrow right"><SVGArrow /></span>
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-field {
    position: relative;

    @include firm-arrows(0.3);
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

  .bg {
    @include fields-bg;
  }
</style>
