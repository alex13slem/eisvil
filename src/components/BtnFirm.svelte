<script lang="ts">
  import SVGArrow from "@/components/svg/SVGArrow.svelte";
  export let variant: "firm" | "transparent" | "contrast" = "firm";
</script>

<button class="btn-firm v-{variant}" {...$$restProps}>
  <span class="bg" />
  <span class="text"><slot /></span>
  <span class="arrow left"><SVGArrow /></span>
  <span class="arrow right"><SVGArrow /></span>
</button>

<style lang="scss">
  @import "../styles/mixins";

  .btn-firm {
    position: relative;
    padding: 0 4ch;
    line-height: 3;

    border: none;
    background: transparent;
    &:not(:disabled) {
      cursor: pointer;
    }

    transition-property: transform, filter;
    transition: var(--trans-default);

    @include firm-arrows;
    &:not(:disabled):hover {
      transform: scale(101%);
    }
  }
  .v-firm {
    &:disabled {
      filter: grayscale(100%);
    }
    span.bg {
      background: var(--gradient);
    }
  }

  .v-transparent {
    span.bg {
      border: 1px solid #fff;
    }
    .arrow {
      border-bottom: 1px solid currentColor;
    }
  }
  .v-contrast {
    span.text {
      color: rgb(var(--color-bg));
    }
    span.bg {
      background-color: rgb(var(--color-white));
    }
  }

  .btn-firm :global(a) {
    color: currentColor;
  }

  span.bg {
    position: absolute;
    inset: 0;

    @include firm-clip;
  }

  span.text {
    position: relative;

    font-size: 14px;
    font-weight: 900;
    color: rgb(var(--color-text));
    text-transform: uppercase;
  }
</style>
