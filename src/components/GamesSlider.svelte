<script lang="ts">
  import GameCard from "./GameCard.svelte";
  import { type CollectionEntry } from "astro:content";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { register, type SwiperContainer } from "swiper/element/bundle";
  import { Mousewheel, Pagination } from "swiper/modules";
  import type { SwiperOptions } from "swiper/types";
  export let games: CollectionEntry<"games">[];

  register();

  let swiperEl: SwiperContainer;

  onMount(() => {
    const swiperParams: SwiperOptions = {
      modules: [Pagination, Mousewheel],
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
          slidesPerView: 3,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: -30,
        },
      },
      loop: true,
      mousewheel: {},

      pagination: {
        clickable: true,
        el: ".pagination",
        bulletClass: "bullet",
        bulletActiveClass: "active",
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
  });

  function onProgress(e: any) {
    const [swiper, progress] = e.detail;
  }
</script>

<div class="wrap">
  <swiper-container bind:this={swiperEl} init="false">
    {#if swiperEl}
      {#each games as game}
        <swiper-slide transition:fade>
          <div class="slide-wrap">
            <GameCard {game} />
          </div>
        </swiper-slide>
      {/each}
    {/if}
  </swiper-container>
  <div class="pagination" />
</div>

<style>
  .wrap {
    position: relative;
    z-index: 0;
    margin: -30px;
    min-height: 378px;
  }
  .wrap::after,
  .wrap::before {
    z-index: 2;
    content: "";
    position: absolute;
    height: 100%;
    width: 30px;
    top: 0;
    background: linear-gradient(90deg, rgb(var(--color-bg)), transparent);
  }
  .wrap::after {
    right: 0;
    transform: rotate(180deg);
  }
  .wrap::before {
    left: 0;
  }

  .slide-wrap {
    padding: 30px;
    min-width: 270px;
  }
  swiper-container {
    display: flex;
  }

  .pagination {
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination :global(.bullet) {
    font-size: 10px;
    height: 1em;
    width: 1em;
    margin: 0.65em;
    border: 1px solid rgb(var(--color-accent));
    cursor: pointer;
    transition-property: transform, background-color;
    transition: 0.3s ease-in-out;
  }
  .pagination :global(.bullet.active) {
    transform: rotate(45deg) scale(150%);
    background-color: rgb(var(--color-accent));
  }
</style>
