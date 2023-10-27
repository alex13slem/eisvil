<script lang="ts">
  import SVGArrow from "./svg/SVGArrow.svelte";
  export let placeholder: string | null = null;
  export let value: string | null = null;
</script>

<div class="form-textarea">
  <textarea
    on:input
    bind:value
    {placeholder}
    class={value && "typing"}
    {...$$restProps}
  />
  <div class="bg" />
  <span class="arrow left"><SVGArrow /></span>
  <span class="arrow right"><SVGArrow /></span>
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-textarea {
    position: relative;
    z-index: 0;

    @include firm-arrows(0.3);
  }

  textarea {
    width: 100%;
    height: 100%;
    resize: none;

    padding: 23px 30px;

    color: rgb(var(--color-text));
    background-color: transparent;
    border: none;
    outline: none;

    transition: background-color var(--trans-default);
    &::placeholder {
      font-size: 12px;
      color: rgb(var(--color-bg));
    }
  }

  .bg {
    @include fields-bg;
  }
</style>
