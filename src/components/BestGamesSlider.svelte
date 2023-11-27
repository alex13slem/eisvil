<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { register, type SwiperContainer } from "swiper/element";
  import GameCardPlatformsSlider from "./GameCardPlatformsSlider.svelte";
  import { parse } from "marked";
  import BtnFirm from "./BtnFirm.svelte";
  import { onMount } from "svelte";
  import {
    EffectCube,
    EffectFade,
    Mousewheel,
    Pagination,
  } from "swiper/modules";
  import type { SwiperOptions } from "swiper/types";

  export let games: CollectionEntry<"games">[];

  onMount(() => {
    const swiperThumbParams: SwiperOptions = {
      modules: [Pagination, Mousewheel, EffectFade],
      effect: "fade",
      mousewheel: true,
      autoplay: { delay: 10000 },
      speed: 700,
      pagination: {
        clickable: true,
        el: ".pagination",
        bulletClass: "bullet",
        bulletActiveClass: "active",
      },
    };
    Object.assign(swiperThumb, swiperThumbParams);

    swiperThumb.initialize();

    const swiperContentParams: SwiperOptions = {
      modules: [EffectCube],
      effect: "creative",
      creativeEffect: {
        prev: {
          opacity: 0,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      speed: 700,
      enabled: false,
    };
    Object.assign(swiperContent, swiperContentParams);

    swiperContent.initialize();

    Object.assign(swiperThumb, {
      controller: { control: swiperContent.swiper },
    });
    // Object.assign(swiperContent, {
    //   controller: { control: swiperThumb.swiper },
    // });
  });

  let swiperThumb: SwiperContainer;
  let swiperContent: SwiperContainer;
</script>

<div class="root">
  <div class="bg" />
  <div class="left">
    <swiper-container bind:this={swiperThumb} init={false} class="swiper-thumb">
      {#each games as { data: { thumbnail, title } }}
        <swiper-slide>
          <img src={thumbnail} alt={title} loading="lazy" height="333" />
        </swiper-slide>
      {/each}
    </swiper-container>
    <div class="pagination" />
  </div>
  <div class="right">
    <swiper-container
      bind:this={swiperContent}
      init={false}
      class:load={!swiperContent}
      class="swiper-content"
    >
      {#if swiperContent}
        {#each games as { data: { title, platforms, description } }}
          <swiper-slide>
            <article>
              <h3>{title}</h3>
              {#if platforms?.length}
                <GameCardPlatformsSlider {platforms} />
              {/if}
              <div class="prose">
                {@html parse(description)}
              </div>
              <div class="btns">
                <BtnFirm>Играть сейчас</BtnFirm>
                <BtnFirm variant="transparent">Подробнее</BtnFirm>
              </div>
            </article>
          </swiper-slide>
        {/each}
      {/if}
    </swiper-container>
  </div>
</div>

<style lang="scss">
  @import "../styles/mixins";
  @include pagination;

  swiper-container {
    transition: var(--load-fade);
    transition-property: opacity;
  }
  swiper-container.load {
    opacity: 0;
  }

  .root {
    --clip-radius: 44px;
    position: relative;
    min-height: 505px;
    padding-block: 60px;
    display: flex;
    gap: 30px;
    filter: drop-shadow(var(--box-shadow-hover));
    & > * {
      flex: 1 1 100%;
    }
  }

  .bg {
    z-index: -1;
    position: absolute;
    inset: 0;
    left: 90px;
    background-color: rgb(var(--color-card));
    border: var(--border-card);
    clip-path: polygon(
      100% 0,
      100% calc(100% - var(--clip-radius)),
      calc(100% - var(--clip-radius)) 100%,
      0 100%,
      0 0
    );

    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      top: -10px;
      right: -10px;
      transform: rotate(45deg);
      background-color: rgb(var(--border-card-color));
    }
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: calc(var(--clip-radius) * 1.4);
      bottom: -1px;
      right: calc(var(--clip-radius) - 1px);
      transform-origin: bottom;
      transform: rotate(45deg);
      background-color: rgb(var(--border-card-color));
    }
  }

  article {
    padding: 2px;
    background-color: rgb(var(--color-card));
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 34px;

    h3 {
      font-size: 40px;
      text-transform: uppercase;
    }
  }

  .prose {
    height: 160px;
    overflow-y: auto;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 30px;

    swiper-container {
      filter: drop-shadow(var(--box-shadow-hover));

      --clip-d-size: calc(var(--clip-radius) * 1.41);

      position: relative;
      border: 2px solid;

      border-image: linear-gradient(
          155deg,
          rgb(var(--color-accent), 50%) 25%,
          transparent 45%
        )
        30;
      border-bottom: none;
      border-right: none;

      clip-path: polygon(
        var(--clip-radius) 0,
        100% 0,
        100% 100%,
        0 100%,
        0 var(--clip-radius)
      );
      &::before {
        z-index: 2;
        content: "";
        position: absolute;
        width: 2px;
        height: var(--clip-d-size);
        top: -2px;
        left: calc(var(--clip-radius) - 2px);
        transform-origin: top;
        transform: rotate(45deg);
        background-color: rgb(var(--color-accent), 50%);
      }
    }

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .right {
    position: relative;
    padding-inline: 30px var(--clip-radius);
    // padding-inline: 30px 110px;

    swiper-slide {
      padding-right: calc(110px - var(--clip-radius));
    }
    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      inset: 0;
      left: auto;
      right: calc(var(--clip-radius) - 2px);
      width: calc(110px - var(--clip-radius));
      background-image: linear-gradient(
        90deg,
        transparent,
        rgb(var(--color-card))
      );
    }
  }

  .btns {
    display: flex;
    gap: 20px;
  }
</style>
