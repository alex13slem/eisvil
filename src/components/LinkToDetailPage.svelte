<script>
  export let to;
  export let text = "Узнать больше";
</script>

<a href={to}>{text} <span></span></a>

<style lang="scss">
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    line-height: 1;
    text-transform: uppercase;

    &:hover {
      span {
        width: 30px;
      }
    }
  }

  span {
    position: relative;
    display: block;
    height: 1px;
    width: 19px;
    background-color: rgb(var(--c-accent));
    transition: var(--trans-default);
    transition-property: width;

    &::after,
    &::before {
      content: "";
      position: absolute;
    }
    &::before {
      width: 3px;
      height: 3px;
      background-color: rgb(var(--c-accent));
      left: -2px;
      top: -1px;
      transform: rotate(45deg);
    }
    &::after {
      top: -9px;
      right: -4px;
      content: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="9" height="9" viewBox="0 0 20 20"%3E%3Cg fill="%23ef811b"%3E%3Cpath d="M11.732 9.36a1 1 0 1 1 1.536 1.28l-5 6a1 1 0 1 1-1.536-1.28z"%2F%3E%3Cpath d="M6.732 4.64a1 1 0 0 1 1.536-1.28l5 6a1 1 0 1 1-1.536 1.28z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    }
  }
</style>
