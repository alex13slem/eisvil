<script lang="ts">
  export let placeholder: string | null = null;
  export let value: string | null = null;
</script>

<div class="form-textarea">
  <textarea {...$$restProps} on:input bind:value {placeholder} />
  <div class="bg" />
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

    transition: background var(--trans-default);
    &::placeholder {
      font-size: 12px;
      color: rgb(var(--color-bg));
    }
    &:focus-visible {
      outline: none;
      & ~ .bg {
        background-color: rgb(var(--color-white), 50%);
      }
    }
  }

  .bg {
    @include fields-bg;
  }
</style>
