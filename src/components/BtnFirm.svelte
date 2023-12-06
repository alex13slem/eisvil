<script lang="ts">
  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let size: "md" | "sm" = "md";
  export let flexPosition: "start" | "end" | "center" | null = null;
</script>

<button
  class="btn-firm variant-{variant} size-{size} {flexPosition || ''}"
  on:click
  {...$$restProps}
>
  <span class="bg" />
  <span class="text"><slot /></span>
</button>

<style lang="scss">
  @import "../styles/mixins";

  .btn-firm {
    @include firm-arrows;

    position: relative;

    padding: 0 4ch;

    line-height: 3em;
    color: rgb(var(--color-text));

    border: none;
    background: transparent;

    cursor: pointer;
    &:disabled {
      cursor: default;
    }

    filter: drop-shadow(var(--box-shadow-hover));

    transition: var(--trans-default);
    transition-property: filter, opacity, text-shadow;
    &:not(:disabled):hover {
      filter: drop-shadow(var(--box-shadow-active));
    }

    &.start {
      align-self: flex-start;
    }
    &.end {
      align-self: flex-end;
    }
    &.center {
      align-self: center;
    }

    :global(a) {
      color: currentColor;
    }

    .bg {
      @include firm-clip;

      overflow: hidden;
      position: absolute;
      inset: 0;

      transition: var(--trans-default);
      transition-property: background-color;
    }

    .text {
      position: relative;

      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
    }
  }

  .variant {
    &-firm {
      .bg {
        background: var(--gradient);
      }

      &:disabled {
        filter: grayscale(100%);
      }
      &:not(:disabled):hover {
        .text {
          @include hover-text1;
        }
      }
    }

    &-transparent {
      overflow: hidden;

      .bg {
        border: 1px solid currentColor;
        &::after,
        &::before {
          content: "";
          position: absolute;
          height: 2em;
          width: 1px;
          background-color: currentColor;
          transform: rotate(45deg);
        }
        &::before {
          transform-origin: top;
        }
        &::after {
          transform-origin: bottom;
        }
      }

      &.size-md {
        .bg {
          &::before {
            top: -1px;
            left: calc(1em + 3px);
          }
          &::after {
            bottom: -1px;
            right: calc(1em + 3px);
          }
        }
      }
    }

    &-contrast {
      color: rgb(var(--color-white));
      .text {
        color: rgb(var(--color-bg));
      }
      .bg {
        background-color: rgb(var(--color-white));
      }
      &:not(:disabled):hover {
        color: rgb(var(--color-accent));
        .bg {
          background-color: rgb(var(--color-accent));
        }
      }
    }
  }
</style>
