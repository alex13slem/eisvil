<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    Transition,
  } from "@rgossiaux/svelte-headlessui";
  import BtnFirm from "./BtnFirm.svelte";
  import { blur, fade } from "svelte/transition";
  import Portal from "./Portal.svelte";
  export let btnText: string;
  export let variantBtn: "firm" | "transparent" | "contrast" = "firm";

  let isOpen = false;
</script>

<svelte:head>
  {#if isOpen}
    <!-- <style>
      html {
        overflow: hidden;
        padding-right: 20px;
      }
    </style> -->
  {/if}
</svelte:head>

<BtnFirm variant={variantBtn} on:click={() => (isOpen = true)}
  >{btnText}</BtnFirm
>

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
        <slot />

        <button on:click={() => (isOpen = false)}>Deactivate</button>
        <button on:click={() => (isOpen = false)}>Cancel</button>
      </div>
    </div>
  </Portal>
{/if}

<style>
  .modal {
    position: fixed;
    overflow-y: auto;
    inset: 0;
    margin-top: 60px;
    min-height: calc(100vh - 60px);

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay {
    z-index: -1;
    position: absolute;
    inset: 0;
    background: rgb(var(--color-bg), 50%);
    /* backdrop-filter: blur(10px); */
  }
</style>
