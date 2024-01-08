<script lang="ts">
  export let size: "sm" | "md" = "md";
  export let variant: "default" | "dark" = "default";
  export let typing = false;
</script>

<div class="bg size-{size} v-{variant} " class:typing><slot /></div>

<style lang="scss">
  @import "../styles/mixins";
  .bg {
    @include firm-clip();
    position: absolute;
    inset: 0;

    color: rgb(var(--c-field-border));

    background-color: var(--field-color);
    transition: background-color var(--trans-default);

    &.v {
      // &-default {
      // }
      &-dark {
        border: 1px solid rgb(var(--c-field-border));
      }
    }
  }
</style>
