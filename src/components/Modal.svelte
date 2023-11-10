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
            <Icon icon="mdi:close" color="white" width="43" />
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
    position: fixed;
    overflow-y: scroll;
    inset: 0;
    margin-top: 60px;
    min-height: calc(100vh - 60px);
    padding: 4rem 1rem;

    display: flex;
    justify-content: center;
    align-items: start;
  }
  .overlay {
    z-index: -1;
    position: fixed;
    inset: 0;
    margin-top: auto;
    height: calc(100vh - 60px);
    background: rgb(var(--color-bg), 50%);
    /* backdrop-filter: blur(10px); */
  }

  .window {
    max-width: 770px;
    width: 100%;
    background-color: rgb(var(--color-bg));
    border: var(--border);
  }
  .header {
    display: flex;
    align-items: center;
    padding: 1rem;

    border-bottom: var(--border);
    h2 {
      flex: 1 1 auto;
      margin: 0;
    }
  }
  .btn-x {
    padding: 0;
    border: 0;
    background-color: transparent;
  }
  .body {
    padding: 1rem;
  }
  .footer {
    padding: 1rem;
    border-top: var(--border);
    display: flex;
    align-items: center;
    justify-content: end;
    &:empty {
      display: none;
    }
  }
</style>
