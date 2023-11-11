<script lang="ts">
  import { blur } from "svelte/transition";
  import Portal from "./Portal.svelte";
  import Icon from "@iconify/svelte";

  export let title: string = "";
  export let isOpen = false;
</script>

{#if isOpen}
  <Portal>
    <div class="modal" transition:blur>
      <div
        class="overlay"
        role="button"
        on:keydown={() => (isOpen = false)}
        on:click={() => (isOpen = false)}
        tabindex="0"
      />

      <div class="window">
        <div class="header">
          <h2>{title}</h2>
          <button
            class="btn-x"
            on:click={() => {
              isOpen = false;
            }}
          >
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>

        <div class="body">
          <slot />
        </div>

        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Portal>
{/if}

<style lang="scss">
  .modal {
    --padding: 2rem;

    position: fixed;
    overflow-y: scroll;
    inset: 0;
    margin-top: 60px;
    min-height: calc(100vh - 60px);
    padding: 4rem 1rem;

    display: flex;
    justify-content: center;
    align-items: start;
    background: rgb(var(--color-bg), 50%);
    backdrop-filter: blur(13px);
  }
  .overlay {
    z-index: -1;
    position: fixed;
    inset: 0;
    margin-top: auto;
    height: calc(100vh - 60px);
  }

  .window {
    overflow: hidden;
    max-width: 960px;
    width: 100%;
    background-color: rgb(var(--color-bg));
    border: var(--border-card);
  }
  .header {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--padding);
    padding-top: 3rem;

    border-bottom: var(--border-card);
    h2 {
      flex: 1 1 auto;
      margin: 0;
    }
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      top: -10px;
      right: -10px;
      transform: rotate(45deg);
      background-color: rgb(var(--color-white), 30%);
    }
  }
  .btn-x {
    padding: 0;
    border: 0;
    background-color: transparent;

    position: absolute;
    right: 1rem;
    top: 1rem;
    transform: rotate(45deg);
    color: white;

    transition-property: transform, color;
    transition: var(--trans-default);

    &:hover {
      transform: rotate(0);
      color: rgb(var(--color-accent));
    }
  }
  .body {
    padding: var(--padding);
  }
  .footer {
    padding: var(--padding);
    border-top: var(--border-card);
    display: flex;
    align-items: center;
    justify-content: end;
    &:empty {
      display: none;
    }
  }
</style>
