<script lang="ts">
  import {
    pubTabIdx,
    offsetIdx,
    type SlideData,
    slidingProcess,
    initLeft,
  } from "@/store/publishing";
  import type { CollectionEntry } from "astro:content";
  import PublishingCard from "./PublishingCard.svelte";

  export let data: CollectionEntry<"publishing">[];

  let slides = data.map<SlideData>((el) => ({
    ...el,
    infIdx: el.data.order,
  }));

  function moveLeft() {
    if ($slidingProcess === true) return;
    $slidingProcess = true;
    $initLeft = true;
    $offsetIdx -= 1;
    if ($pubTabIdx - 1 < 0) $pubTabIdx = slides.length - 1;
    else $pubTabIdx -= 1;

    const firstElemIdx = slides[0].infIdx;
    const removedSlide = {
      ...[...slides].pop(),
      infIdx: firstElemIdx - 1,
    } as SlideData;

    slides.unshift(removedSlide);

    setTimeout(() => {
      slides.pop();
      $slidingProcess = false;
    }, 700);
  }

  function moveRight() {
    if ($slidingProcess === true) return;
    $slidingProcess = true;
    $initLeft = false;
    $offsetIdx += 1;
    if ($pubTabIdx + 1 > slides.length - 1) $pubTabIdx = 0;
    else $pubTabIdx += 1;

    const lastElem = [...slides].pop() as SlideData;
    const lastElemIdx = lastElem.infIdx;
    const removedSlide = {
      ...slides[0],
      infIdx: lastElemIdx + 1,
    } as SlideData;

    slides.push(removedSlide);

    setTimeout(() => {
      slides.shift();
      slides = slides;
      $slidingProcess = false;
    }, 700);
  }

  function handleWheel(e: WheelEvent) {
    if (e.deltaY < 0) {
      moveLeft();
    }
    if (e.deltaY > 0) {
      moveRight();
    }
  }

  pubTabIdx.subscribe(())
</script>

<div
  class="cards"
  style="--offset-idx: {$offsetIdx};"
  on:wheel|preventDefault={handleWheel}
>
  <button
    class="left"
    on:click={() => {
      !$slidingProcess && moveLeft();
    }}
  />
  {#each slides as item (item.infIdx)}
    <PublishingCard data={item} isActive={item.data.order === $pubTabIdx + 1} />
  {/each}
  <button
    class="right"
    on:click={() => {
      !$slidingProcess && moveRight();
    }}
  />
</div>

<style lang="scss">
  .cards {
    position: relative;
    overflow: hidden;
    min-height: 485px;
    width: 100%;
  }

  button {
    background-color: transparent;
    padding: 0;
    border: none;

    z-index: 3;
    position: absolute;
    inset: 0;
    width: calc(33.3% - 20px);
    background: linear-gradient(90deg, rgb(var(--color-bg)), transparent);
    &.right {
      left: auto;
      transform: rotate(180deg);
    }
  }
</style>
