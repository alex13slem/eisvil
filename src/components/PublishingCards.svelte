<script lang="ts">
  import {
    activeIdx,
    offsetIdx,
    type SlideData,
    moveLeft,
    moveRight,
  } from "@/store/publishing";
  import type { CollectionEntry } from "astro:content";
  import PublishingCard from "./PublishingCard.svelte";

  export let data: CollectionEntry<"publishing">[];

  let slides = data.map<SlideData>((el) => ({
    ...el,
    infIdx: el.data.order,
  }));

  function handleWheel(e: WheelEvent) {
    if (e.deltaY < 0) {
      moveLeft(slides);
    }
    if (e.deltaY > 0) {
      moveRight(slides);
    }
  }
</script>

<div
  class="cards"
  style="--offset-idx: {$offsetIdx};"
  on:wheel|preventDefault={handleWheel}
>
  <!-- <button
    class="left"
    on:click={() => {
      !$slidingProcess && moveLeft();
    }}
  /> -->
  {#each slides as item (item.infIdx)}
    <PublishingCard data={item} />
  {/each}
  <!-- <button
    class="right"
    on:click={() => {
      !$slidingProcess && moveRight();
    }}
  /> -->
</div>

<style lang="scss">
  .cards {
    position: relative;
    overflow: hidden;
    min-height: 485px;
    width: 100%;

    &::after,
    &::before {
      content: "";
      pointer-events: none;

      background-color: transparent;
      padding: 0;
      border: none;

      z-index: 3;
      position: absolute;
      inset: 0;
      width: calc(33.3% - 20px);
      background: linear-gradient(90deg, rgb(var(--color-bg)), transparent);
    }
    &::after {
      left: auto;
      transform: rotate(180deg);
    }
  }
</style>
