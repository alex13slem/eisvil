<button class="btn-firm">
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
    cursor: pointer;

    transition: transform var(--trans-default);

    @include firm-arrows;

    &:hover {
      transform: scale(101%);
    }
  }

  span.bg {
    position: absolute;
    inset: 0;

    background: var(--gradient);
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
