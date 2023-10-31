<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from "@rgossiaux/svelte-headlessui";
  import { formatErrors } from "../utils/helpers";

  export let errors: {
    _errors: string[];
  };
</script>

<div class="error-wrapper">
  <Popover class="inner">
    <PopoverButton class="error-btn">!</PopoverButton>
    <PopoverPanel class="error-message">
      {formatErrors(errors)}
    </PopoverPanel>
  </Popover>
</div>

<style lang="scss">
  .error-wrapper {
    z-index: 2;
    position: absolute;
    inset: 0;
    left: auto;
    display: flex;
    justify-content: end;
    align-items: start;
    padding-top: 1rem;
    padding-inline: 1rem;

    :global(.error-btn) {
      width: 1.5rem;
      aspect-ratio: 1 / 1;
      padding: 0;

      color: rgb(var(--color-bg));

      border-radius: 50%;
      border: 1px solid rgb(var(--color-bg));
      background-color: rgb(var(--color-accent));
      cursor: pointer;
    }

    :global(.error-message) {
      position: absolute;
      width: 200px;
      bottom: calc(100% - 30px);
      right: 100%;
      padding: 1em;
      background-color: rgb(var(--color-accent));
      border: 1px solid rgb(var(--color-bg));
    }
  }
</style>
