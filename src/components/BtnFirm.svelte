<script lang="ts">
  import SVGArrow from "@/components/svg/SVGArrow.svelte";
  export let variant: "firm" | "transparent" = "firm";
</script>

<button class="btn-firm v-{variant}">
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
    cursor: pointer;

    transition: transform var(--trans-default);

    @include firm-arrows;
    &:hover {
      transform: scale(101%);
    }
  }
  .v-firm span.bg {
    background: var(--gradient);
  }
  .v-transparent {
    span.bg {
      border: 1px solid #fff;
    }
    .arrow {
      border-bottom: 1px solid currentColor;
    }
  }

  .btn-firm :global(a) {
    all: unset;
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
