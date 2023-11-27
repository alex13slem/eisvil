<script lang="ts">
  import BorderEdge from "./svg/BorderEdge.svelte";

  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let flexPosition: "start" | "end" | "center" | null = null;
</script>

<button
  class="btn-firm v-{variant} {flexPosition || ''}"
  on:click
  {...$$restProps}
>
  {#if variant === "transparent"}
    <BorderEdge class="border-edge left" />
    <BorderEdge class="border-edge right" />
  {/if}
  <span class="bg" />
  <span class="text"><slot /></span>
</button>

<style lang="scss">
  @import "../styles/mixins";

  .btn-firm {
    position: relative;
    padding: 0 4ch;
    line-height: 3;

    border: none;
    background: transparent;
    filter: drop-shadow(var(--box-shadow-hover));
    &:not(:disabled) {
      cursor: pointer;
    }

    color: rgb(var(--color-text));

    transition: var(--trans-default);
    transition-property: filter;

    @include firm-arrows;

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
      // border-image: linear-gradient(
      //     135deg,
      //     transparent 25px,
      //     currentColor,
      //     transparent calc(100% - 25px)
      //   )
      //   30;
    }
    :global(.border-edge) {
      position: absolute;
      height: 49px;
      width: 49px;
    }
    :global(.border-edge.left) {
      top: 0px;
      left: 0px;
    }
    :global(.border-edge.right) {
      bottom: 0px;
      right: 0px;
      transform: rotate(180deg);
    }
    // .border {
    //   position: absolute;
    //   inset: 0;
    //   z-index: 1;
    // }
    // span.bg {
    //   border: 2px solid currentColor;

    //   &::after,
    //   &::before {
    //     content: "";
    //     position: absolute;
    //     height: calc(var(--firm-clip-size) * 1.41 + 4px);
    //     width: 2px;
    //     background-color: rgb(var(--color-white));
    //     transform: rotate(45deg);
    //   }
    //   &::before {
    //     top: -2px;
    //     left: calc(var(--firm-clip-size) - 2px);
    //     transform-origin: top;
    //   }
    //   &::after {
    //     bottom: -2px;
    //     right: calc(var(--firm-clip-size) - 2px);
    //     transform-origin: bottom;
    //   }
    // }
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
