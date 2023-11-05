<a href="/" class="nav-link"><span /><slot /></a>

<style lang="scss">
  @import "../styles/mixins";
  .nav-link {
    position: relative;
    padding-inline: 2.5ch;
    display: inline-flex;

    font-size: 14px;
    line-height: 3.5em;
    font-weight: 700;
    color: rgb(var(--color-text));

    text-transform: uppercase;

    transition: background-color var(--trans-default),
      color var(--trans-default), text-shadow var(--trans-steps);
  }

  .nav-link::after {
    opacity: 0;
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(
      180deg,
      rgba(239, 129, 27, 0) 47%,
      rgba(239, 129, 27, 0.25) 100%
    );
    transition: opacity var(--trans-default);
  }
  .nav-link:hover::after {
    opacity: 1;
  }

  .nav-link:hover {
    @include hover-text1(
      $t-color: rgb(var(--color-accent)),
      $sh-lt-color: rgb(var(--color-accent), 20%),
      $sh-rb-color: rgb(var(--color-white), 20%)
    );
  }

  .nav-link::before,
  .nav-link:first-of-type span {
    bottom: -2px;
    content: "";
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(69, 72, 87, 0) 17.61%,
      #575969 100%
    );
    width: 1px;
    height: 100%;
  }
  .nav-link::before {
    right: -3px;
  }
  .nav-link:first-of-type span {
    left: -3px;
  }
</style>
