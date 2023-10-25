<script lang="ts">
  import SVGArrow from "./svg/SVGArrow.svelte";
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
    autocomplete="off"
    {...$$restProps}
    class={value && "typing"}
  />
  <div class="bg" />
  <span class="arrow left"><SVGArrow /></span>
  <span class="arrow right"><SVGArrow /></span>
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-field {
    position: relative;
    z-index: 0;

    @include firm-arrows(0.3);
  }

  input {
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
