<script lang="ts">
  export let type: "text" | "email" | "password" = "text";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";
  export let size: "md" | "sm" = "md";
  export let variant: "default" | "dark" = "default";

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div
  class="form-field {className} size-{size} v-{variant}"
  class:typing={value}
>
  <slot name="left" />
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
  <div class="bg" />
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-field {
    @include fields-bg;
    @include firm-arrows(
      $color: var(--firm-arrows-color),
      $size: var(--firm-arrow-size)
    );
    height: 100%;
    padding-inline: calc(var(--clip-size) * 1.5);
    &:has(svg) {
      padding-inline: var(--clip-size);
    }
    color: rgb(var(--color-text));

    display: flex;
    align-items: center;
    gap: 5px;

    & > :global(svg) {
      z-index: 1;
      height: 100%;
      width: calc(var(--clip-size));
    }

    &.v-default {
      --firm-arrows-color: var(--field-color);
      input {
        &::placeholder {
          color: rgb(var(--color-bg));
        }
      }
    }

    &.v-dark {
      --firm-arrows-color: rgb(var(--border-card-color));
      input {
        &::placeholder {
          color: rgb(var(--border-card-color));
          transition: color var(--trans-default);
        }
      }
      &:hover {
        input {
          &::placeholder {
            color: rgb(var(--color-bg));
          }
        }
        :global(svg) {
          color: rgb(var(--color-bg));
        }
      }
      &.typing {
        :global(svg) {
          color: rgb(var(--color-text));
          transition: none;
        }
      }
      :global(svg) {
        color: rgb(var(--border-card-color));
        transition: color var(--trans-default);
      }
    }

    &.size-sm {
      --clip-size: 16px;
      --firm-arrow-size: 6px;

      font-size: 14px;
      line-height: 35px;
    }

    &.size-md {
      --clip-size: 20px;
      --firm-arrow-size: 9px;
      line-height: 3.375rem;
    }
  }

  input {
    flex: 1 1 auto;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0;

    background-color: transparent;
    border: none;
    outline: none;
    color: currentColor;

    &::placeholder {
      font-size: 12px;
    }
  }
</style>
