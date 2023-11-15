<script lang="ts">
  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let flexPosition: "start" | "end" | "center" | null = null;
</script>

<button
  class="btn-firm v-{variant} {flexPosition || ''}"
  on:click
  {...$$restProps}
>
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
    &:not(:disabled) {
      cursor: pointer;
    }

    color: rgb(var(--color-text));

    transition-property: transform, filter;
    transition: var(--trans-default);

    @include firm-arrows;

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
        @include hover-text1();
      }
    }
  }

  .v-transparent {
    span.bg {
      border: 1px solid currentColor;
    }
  }

  .v-contrast {
    span.text {
      color: rgb(var(--color-bg));
    }
    span.bg {
      background-color: currentColor;
    }
    &:not(:disabled):hover {
      color: rgb(var(--color-accent));
    }
  }

  .btn-firm :global(a) {
    color: currentColor;
  }

  .bg {
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
  }
</style>
