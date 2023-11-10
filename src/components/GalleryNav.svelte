<script lang="ts">
  import { onMount } from "svelte";
  import GalleryNavPart from "./GalleryNavPart.svelte";
  export let className: string = "";

  let wrap: HTMLDivElement;
  let wrapHeight: number;
  onMount(() => (wrapHeight = wrap.clientHeight));
</script>

<div class="wrap" bind:this={wrap} style="--height: {wrapHeight}px">
  <nav class:className>
    <GalleryNavPart collection="services" title="Услуги" />
  </nav>
</div>

<style>
  .wrap {
    overflow-y: scroll;
    height: var(--height);
  }

  nav {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    border-right: var(--border);
  }
</style>
