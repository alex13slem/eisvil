<script lang="ts">
  import InputBg from "./InputBg.svelte";
  import BorderEdge from "./svg/BorderEdge.svelte";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";
  export let variant: "default" | "dark" = "default";
  export let size: "md" = "md";
</script>

<div
  class="form-textarea {className} v-{variant} size-{size}"
  class:typing={!!value}
>
  <textarea on:input bind:value {placeholder} {...$$restProps} />
  <div class="bg">
    {#if variant === "dark"}
      <BorderEdge {size} pos={"lt"} />
      <BorderEdge {size} pos={"rb"} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-textarea {
    @include firm-arrows($color: var(--color-border));

    isolation: isolate;
    position: relative;
    height: 100%;

    display: flex;
    align-items: center;
    gap: 5px;

    color: rgb(var(--color-text));

    &.typing {
      textarea {
        font-size: 1rem;
      }
    }

    &.v-default {
      --color-field: rgb(var(--color-white), 30%);
      --color-border: var(--color-field);
      color: rgb(var(--color-bg));

      // Hover and Focus state
      &:hover,
      &:not(.typing):has(textarea:focus-visible) {
        --color-field: rgb(var(--color-white), 45%);
        color: rgb(var(--color-bg));
      }

      // Typing state
      &.typing {
        --color-field: rgb(var(--color-accent), 65%);
        color: rgb(var(--color-text));
      }
    }

    &.v-dark {
      --color-field: rgb(var(--color-field_dark));
      --color-border: rgb(var(--color-field-border_dark));
      color: rgb(var(--color-field-border_dark));

      .bg {
        color: rgb(var(--color-field-border_dark));
        border: 1px solid rgb(var(--color-field-border_dark));
      }

      // Hover and Focus state
      &:hover,
      &:not(.typing):has(input:focus-visible) {
        --color-field: rgb(var(--color-white), 45%);
        color: rgb(var(--color-bg));
      }

      // Typing state
      &.typing {
        --color-field: rgb(var(--color-accent), 65%);
        color: rgb(var(--color-text));
      }
    }

    &.size-sm {
      .v-dark {
        min-width: var(--c-input-sm-width);
      }
      font-size: var(--c-input-sm-fsz);
    }

    &.size-md {
      .v-dark {
        min-width: var(--c-input-md-width);
      }
      font-size: var(--c-input-md-fsz);
    }
  }

  .bg {
    @include firm-clip();
    position: absolute;
    inset: 0;
    overflow: hidden;

    color: rgb(var(--color-bg));

    background-color: var(--color-field);
    transition: var(--trans-default);
    transition-property: color background-color;
  }

  textarea {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    resize: none;

    padding: 1.5em;

    background-color: transparent;
    border: none;
    outline: none;
    color: currentColor;

    &::placeholder {
      color: currentColor;
      transition: color var(--trans-default);
    }
  }
</style>
