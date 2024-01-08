<script lang="ts">
  import {
    shiftIdx,
    moveLeft,
    moveRight,
    slides,
    slidingProcess,
  } from "@/store/publishing";
  import PublishingCard from "./PublishingCard.svelte";

  function handleWheel(e: WheelEvent) {
    if ($slidingProcess) return;

    if (e.deltaY < 0) {
      moveRight();
    }
    if (e.deltaY > 0) {
      moveLeft();
    }
  }
  let clientHeight: number;
</script>

<div
  class="cards"
  style="--shift-idx: {$shiftIdx}; height: {clientHeight +
    (clientHeight / 100) * 7}px"
  on:wheel|preventDefault={handleWheel}
>
  {#each $slides as data, idx (data.infIdx)}
    <PublishingCard {data} {idx} bind:clientHeight />
  {/each}
</div>

<style lang="scss">
  .cards {
    position: relative;
    overflow-x: clip;

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
      background: linear-gradient(90deg, rgb(var(--c-bg)), transparent);
    }
    &::after {
      left: auto;
      transform: rotate(180deg);
    }
  }
</style>
