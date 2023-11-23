<script lang="ts">
  import { cn } from "../utils/helpers";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";
</script>

<div class={cn("form-textarea", className)} class:typing={value}>
  <textarea on:input bind:value {placeholder} {...$$restProps} />
  <div class="bg" />
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-textarea {
    @include fields-bg;
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
