<script lang="ts">
  import { pubTabIdx } from "@/components/PublishingTabs/store.ts";
  import type { CollectionEntry } from "astro:content";
  import PublishingCard from "./PublishingCard.svelte";

  export let data: CollectionEntry<"publishing">[];
  let curIdx: number;

  pubTabIdx.subscribe((idx) => {
    return (curIdx = idx);
  });
  const lastElem = [...data].shift();
  const firstElem = [...data].pop();

  function handleWheel(e: WheelEvent) {
    if (curIdx >= 1 && e.deltaY < 0) {
      $pubTabIdx -= 1;
    }
    if (curIdx <= 1 && e.deltaY > 0) {
      $pubTabIdx += 1;
    }
  }
</script>

<div class="cards">
  <div
    class="wrap"
    class:center={curIdx === 1}
    class:left={curIdx === 0}
    class:right={curIdx === 2}
    on:wheel|preventDefault={handleWheel}
  >
    {#if firstElem}
      <PublishingCard data={firstElem} targetIdx={null} />
    {/if}
    {#each data as item, idx}
      <PublishingCard data={item} isActive={idx === curIdx} targetIdx={idx} />
    {/each}
    {#if lastElem}
      <PublishingCard data={lastElem} targetIdx={null} />
    {/if}
  </div>
</div>

<style lang="scss">
  .cards {
    position: relative;
    overflow: hidden;
    margin: -30px;
    padding: 30px;
    min-height: 485px;

    &::after,
    &::before {
      z-index: 2;
      content: "";
      position: absolute;
      inset: 0;
      width: 30px;
      background: linear-gradient(90deg, rgb(var(--color-bg)), transparent);
    }
    &::before {
      left: auto;
      transform: rotate(180deg);
    }
  }
  .wrap {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 30px;

    transition: transform var(--trans-slow);

    &.center {
      transform: translateX(calc((33.3% + 10px) * -1));
    }
    // &.left {
    // }
    &.right {
      transform: translateX(calc((33.3% + 10px) * -2));
    }
  }
</style>
