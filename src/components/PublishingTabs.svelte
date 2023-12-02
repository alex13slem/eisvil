<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import { cn } from "@/utils/helpers";
  import { pubTabIdx } from "../store/publishing";
  import ModalTrigger from "./ModalTrigger.svelte";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  export let data: CollectionEntry<"publishing">[];

  let currIdx: number;
  pubTabIdx.subscribe((idx) => (currIdx = idx));
</script>

<div class="root">
  <nav class="nav">
    {#each data as { slug }, idx}
      <button
        class={cn("link", idx === currIdx && "active")}
        on:click={() => {}}
      >
        {#if slug.split("/")[1] === "computer"}
          <Icon icon="bx:desktop" width="36" height="36" />
        {/if}
        {#if slug.split("/")[1] === "game-consoles"}
          <Icon icon="bx:joystick" width="36" height="36" />
        {/if}
        {#if slug.split("/")[1] === "mobile"}
          <Icon icon="bx:mobile-alt" width="36" height="36" />
        {/if}
      </button>
    {/each}
  </nav>

  <div class="preview-wrap">
    {#each data as { body, slug }, idx}
      <div class={cn("preview", idx === currIdx && "active")}>
        <div class="body prose">{@html parse(body)}</div>
        <ModalTrigger type="publishing" flexPosition="start" {slug}
          >Подать заявку</ModalTrigger
        >
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .root {
    flex: 0 0 var(--left-panel-w);

    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .nav {
    display: flex;
  }
  .link {
    flex: 1 1 auto;
    min-height: 40px;
    padding: 0;
    padding-bottom: 13px;
    cursor: default;

    display: flex;
    justify-content: center;

    font-size: 12px;
    font-weight: 700;
    color: rgb(var(--color-text), 30%);

    background-color: transparent;
    border: 0;
    border-bottom: 4px solid rgb(var(--color-text), 30%);

    transition: var(--trans-default);
    transition-property: color, font-size;
    &.active {
      font-size: 20px;
      font-weight: 600;
      color: rgb(var(--color-accent));
      // background: linear-gradient(180deg, #e32521 0%, #ef811b 40%);
      // background-clip: text;
      // -webkit-background-clip: text;
      // color: transparent;
      border-color: rgb(var(--color-accent));
    }
  }

  .preview-wrap {
    position: relative;
  }

  .preview {
    position: absolute;
    inset: 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    min-height: 235px;
    pointer-events: none;

    &.active {
      pointer-events: all;
      opacity: 1;
    }
  }

  .body {
    flex: 1 1 auto;
  }
</style>
