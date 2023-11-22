<script lang="ts">
  import { pubTabIdx } from "@/store/publishing";
  import type { CollectionEntry } from "astro:content";
  import PublishingCard from "./PublishingCard.svelte";
  import { onMount } from "svelte";
  import { register, type SwiperContainer } from "swiper/element";
  import { Pagination, Mousewheel } from "swiper/modules";
  import type { SwiperOptions } from "swiper/types";
  import { fade } from "svelte/transition";

  export let data: CollectionEntry<"publishing">[];
  const lastElem = [...data].shift();
  const firstElem = [...data].pop();

  let curIdx: number;

  onMount(() => {
    register();
  });

  let swiperEl: SwiperContainer;

  // pubTabIdx.subscribe((idx) => {
  //   return (curIdx = idx);
  // });

  $: if (swiperEl) swiperEl.swiper.activeIndex = $pubTabIdx;

  onMount(() => {
    const swiperParams: SwiperOptions = {
      modules: [Mousewheel],
      slidesPerView: 1,
      spaceBetween: -10,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: -20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: -30,
        },
      },
      mousewheel: {},
      centeredSlides: true,
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();

    swiperEl.swiper.activeIndex = $pubTabIdx;
  });

  function onProgress(e: any) {
    const [swiper, progress] = e.detail;
  }
</script>

<div class="cards">
  <swiper-container bind:this={swiperEl} init="false">
    {#if swiperEl}
      {#if firstElem}
        <swiper-slide transition:fade>
          <div class="slide-wrap">
            <PublishingCard data={firstElem} targetIdx={null} />
          </div>
        </swiper-slide>
      {/if}
      {#each data as item, idx}
        <swiper-slide transition:fade>
          <div class="slide-wrap">
            <PublishingCard data={item} targetIdx={idx} />
          </div>
        </swiper-slide>
      {/each}
      {#if lastElem}
        <swiper-slide transition:fade>
          <div class="slide-wrap">
            <PublishingCard data={lastElem} targetIdx={null} />
          </div>
        </swiper-slide>
      {/if}
    {/if}
  </swiper-container>
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
