<label>
  <input type="checkbox" {...$$restProps} />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <rect
      opacity="0.5"
      x="0.5"
      y="0.5"
      width="16"
      height="15"
      rx="1.5"
      stroke="white"
    />
    <rect class="inner" x="3" y="3" width="11" height="10" fill="#EF811B" />
  </svg>
</label>

<style lang="scss">
  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
  svg {
    cursor: pointer;
  }
  .inner {
    fill: rgb(var(--color-accent), 70%);
    transition: fill var(--trans-default);
  }
  input:checked ~ * .inner {
    fill: rgb(var(--color-accent), 100%);
  }
</style>
