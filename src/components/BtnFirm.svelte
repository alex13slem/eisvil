<script lang="ts">
  import BorderEdge from "./svg/BorderEdge.svelte";

  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let size: "md" | "sm" = "md";
  export let flexPosition: "start" | "end" | "center" | null = null;
</script>

<button
  class="btn-firm v-{variant} size-{size} {flexPosition || ''}"
  on:click
  {...$$restProps}
>
  <!-- {#if variant === "transparent"}
    <BorderEdge {size} pos={"lt"} />
    <BorderEdge {size} pos={"rb"} />
  {/if} -->
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
    margin: 1px;

    border: none;
    background: transparent;
    filter: drop-shadow(var(--box-shadow-hover));
    &:not(:disabled) {
      cursor: pointer;
    }

    color: rgb(var(--color-text));

    transition: var(--trans-default);
    &:hover {
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
  }

  .v-firm {
    &:disabled {
      filter: grayscale(100%);
    }
    .bg {
      background: var(--gradient);
    }
    &:not(:disabled):hover {
      span.text {
        @include hover-text1;
      }
    }
  }

  .v-transparent {
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

  .v-contrast {
    span.text {
      color: rgb(var(--color-bg));
    }
    span.bg {
      background-color: currentColor;
      transition: var(--trans-default);
      transition-property: color;
    }
    &:not(:disabled):hover {
      color: rgb(var(--color-accent));
    }
  }

  .btn-firm :global(a) {
    color: currentColor;
  }

  .bg {
    overflow: hidden;
    position: absolute;
    inset: 0;
    transition: background-color var(--trans-default);

    @include firm-clip;
  }

  .text {
    position: relative;

    font-size: 14px;
    font-weight: 900;
    color: currentColor;
    text-transform: uppercase;

    transition: var(--trans-default);
    transition-property: text-shadow;
  }
</style>
