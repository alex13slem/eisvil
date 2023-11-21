<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { register, type SwiperContainer } from "swiper/element";
  import GameCardPlatformsSlider from "./GameCardPlatformsSlider.svelte";
  import { parse } from "marked";
  import BtnFirm from "./BtnFirm.svelte";

  export let games: CollectionEntry<"games">[];

  register();

  let swiperThumb: SwiperContainer;
  let swiperContent: SwiperContainer;
</script>

<div class="root">
  <div class="bg" />
  <div class="left">
    <swiper-container
      bind:this={swiperThumb}
      class:load={!swiperThumb}
      pagination={{
        clickable: true,
        el: ".pagination",
        bulletClass: "bullet",
        bulletActiveClass: "active",
      }}
    >
      {#each games as { data: { thumbnail, title } }}
        <swiper-slide>
          <img src={thumbnail} alt={title} />
        </swiper-slide>
      {/each}
    </swiper-container>
    <div class="pagination" />
  </div>
  <div class="right">
    <swiper-container
      bind:this={swiperContent}
      class:load={!swiperContent}
      pagination={{
        clickable: true,
        el: ".pagination",
        bulletClass: "bullet",
        bulletActiveClass: "active",
      }}
    >
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
    </swiper-container>
  </div>
</div>

<style lang="scss">
  swiper-container {
    transition-property: height;
    transition: var(--load-fade);
  }
  swiper-container.load {
    height: 30px;
    swiper-slide {
      opacity: 0;
    }
  }
  swiper-slide {
    transition-property: opacity;
    transition: var(--load-fade);
  }
  .root {
    /* overflow: hidden; */
    position: relative;
    min-height: 470px;
    padding-block: 60px;
    display: flex;
    /* align-items: start; */
    gap: 30px;
    filter: drop-shadow(var(--box-shadow-hover));
    & > * {
      flex: 1 1 100%;
    }
  }
  .bg {
    --clip-radius: 44px;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* PAGINATION */
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
