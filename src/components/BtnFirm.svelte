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

    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
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
      &:hover {
        color: rgb(var(--color-accent));
        .bg {
          background-color: rgb(var(--color-white), 30%);
        }
      }

      .text {
        color: rgb(var(--color-white));
      }

      .bg {
        // border: 1px solid rgb(var(--color-white));
        box-shadow: inset 0px 0px 2px 1px rgb(var(--color-white));

        transition: var(--trans-default);
        transition-property: background-color;
        &::after,
        &::before {
          content: "";
          position: absolute;
          height: 2em;
          width: 1px;
          filter: blur(1px);
          background-color: rgb(var(--color-white));
          transform: rotate(45deg);
        }
        &::before {
          transform-origin: top;
        }
        &::after {
          transform-origin: bottom;
        }
      }

      &.size-sm {
        .bg {
          &::before {
            top: 1px;
            left: calc(1em + 1px);
          }
          &::after {
            bottom: 1px;
            right: calc(1em + 1px);
          }
        }
      }
      &.size-md {
        .bg {
          &::before {
            top: 1px;
            left: calc(1em + 2px);
          }
          &::after {
            bottom: 1px;
            right: calc(1em + 2px);
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

  .size {
    &-sm {
      padding: 8px 2ch;
      font-size: 10px;
    }
    &-md {
      padding: 18px 4ch;

      font-size: 14px;
    }
  }
</style>
