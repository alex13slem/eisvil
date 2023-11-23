<script lang="ts">
  import { cn } from "../utils/helpers";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";
  export let variant: "default" | "dark" = "default";
  export let size: "md" = "md";
</script>

<div
  class="form-textarea {className} v-{variant} size-{size}"
  class:typing={value}
>
  <textarea on:input bind:value {placeholder} {...$$restProps} />
  <div class="bg" />
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-textarea {
    @include fields-bg;
    @include firm-arrows(
      $color: var(--firm-arrows-color),
      $size: var(--firm-arrow-size)
    );

    &.v-default {
      --firm-arrows-color: var(--field-color);
    }

    &.v-dark {
      --firm-arrows-color: rgb(var(--border-card-color));
    }

    &.size-sm {
      --clip-size: 16px;
      --firm-arrow-size: 6px;

      font-size: 14px;
    }

    &.size-md {
      --clip-size: 20px;
      --firm-arrow-size: 9px;
    }
  }

  textarea {
    position: relative;
    z-index: 1;
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
</style>
