<script lang="ts">
  export let href: string;
  export let isActive: boolean = false;
</script>

<a {href} class:active={isActive}><slot /></a>

<style lang="scss">
  @import "../styles/mixins";

  a {
    padding: 0 1rem;
    line-height: 3;
    color: rgb(var(--color-white));
    transition: var(--trans-default);
    transition-property: text-shadow;

    position: relative;

    border-bottom: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgb(var(--color-white), 0) -1rem,
        rgb(var(--color-white), 0.1) 100%
      )
      1;

    transition: var(--trans-default);
    transition-property: text-shadow, font-size;

    &::after {
      position: absolute;
      content: "";
      inset: 0;
      right: auto;
      width: 0;
      background: linear-gradient(
        90deg,
        rgb(var(--color-accent), 25%),
        transparent
      );

      transition: var(--trans-slow);
      transition-property: width;
    }

    &:hover,
    &.active {
      @include hover-text1;
    }

    // &.active {
    //   font-size: 20px;
    // }

    // &:hover::after {
    //   width: 75%;
    // }
    &.active::after {
      animation: load var(--trans-default) 1 forwards;
    }
    @keyframes load {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
  }
</style>
