
<button class="btn-firm">
  <span class="bg"></span>
  <span class="text"><slot /></span>
</button>

<style>
  .btn-firm {
    position: relative;
    padding: 0 4ch;
    line-height: 3;

    border: none;
    background: transparent;
    cursor: pointer;

    transition: transform var(--trans-default);
  }

  .btn-firm::before,
  .btn-firm::after {
    position: absolute;
    content: "";
    width: 0.5em;
    aspect-ratio: 1/1;
    background: url("../img/btn-arrow.svg") no-repeat;
  }
  .btn-firm::after {
    bottom: 0;
    right: 0;
    transform: rotate(180deg);
  }
  .btn-firm::before {
    top: 0;
    left: 0;
  }

  span.bg {
    position: absolute;
    inset: 0;

    background: var(--gradient);
    clip-path: polygon(
      1.7em 0%,
      100% 0,
      100% 50%,
      calc(100% - 1.7em) 100%,
      0% 100%,
      0 50%
    );
  }

  .btn-firm:hover {
    transform: scale(101%);
  }
  span.text {
    position: relative;

    font-size: 14px;
    font-weight: 900;
    color: rgb(var(--color-text));
    text-transform: uppercase;
  }
</style>
