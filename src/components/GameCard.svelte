<script lang="ts">
  import SVGPlaygame from "./svg/platforms/SVGYandex.svelte";
  import SVGApple from "./svg/platforms/SVGApple.svelte";
  import SVGGoogle from "./svg/platforms/SVGGoogle.svelte";
  import CardBadge from "./CardBadge.svelte";
  import BtnFirm from "./BtnFirm.svelte";
  import type { CollectionEntry } from "astro:content";
  import SvgSony from "./svg/platforms/SVGSony.svelte";
  import SvgRusstore from "./svg/platforms/SVGRusstore.svelte";
  import SvgSteam from "./svg/platforms/SVGSteam.svelte";
  import SvgYandex from "./svg/platforms/SVGYandex.svelte";
  import SvgxBox from "./svg/platforms/SVGXBox.svelte";
  import SvgHuawei from "./svg/platforms/SVGHuawei.svelte";
  import SvgVk from "./svg/platforms/SVGVk.svelte";
  import SvgNintendo from "./svg/platforms/SVGNintendo.svelte";
  import { register, type SwiperContainer } from "swiper/element";

  export let game: CollectionEntry<"games">;

  register();
  let swiperEl: SwiperContainer;

  let isEnd: boolean;
  let isBeginning: boolean;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    isEnd = swiper.isEnd;
    isBeginning = swiper.isBeginning;
  };

  const { title, genre, thumbnail, status, favorites, platforms } = game.data;
</script>

<article class="game-card" {...$$restProps}>
  {#if status}
    <CardBadge type={status} />
  {/if}

  <div class="image">
    <img src={thumbnail} alt={title} width="336" height="202" />
    <BtnFirm variant="transparent"><a href="/">ПОДРОБНЕЕ</a></BtnFirm>
  </div>
  <div class="body">
    <h3>{title}</h3>
    <p class="tags">
      <span>{genre}</span>
      {#if favorites}
        <span>{favorites}</span>
      {/if}
    </p>
    <div
      class="links"
      class:scrollable={platforms && Object.values(platforms).length > 4}
      class:isBeginning
      class:isEnd
    >
      <swiper-container
        bind:this={swiperEl}
        on:swiperprogress={onProgress}
        mousewheel
        slides-per-view="auto"
        space-between="10"
      >
        {#if platforms?.playstation}
          <swiper-slide>
            <a href={platforms.playstation} title="Sony Playstation">
              <SvgSony />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.ru_store}
          <swiper-slide>
            <a href={platforms.ru_store} title="RuStore">
              <SvgRusstore />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.steam}
          <swiper-slide>
            <a href={platforms.steam} title="Steam">
              <SvgSteam />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.yandex}
          <swiper-slide>
            <a href={platforms.yandex} title="Yandex">
              <SvgYandex />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.xbox}
          <swiper-slide>
            <a href={platforms.xbox} title="X-Box">
              <SvgxBox />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.app_gallery}
          <swiper-slide>
            <a href={platforms.app_gallery} title="App Gallery (Huawei)">
              <SvgHuawei />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.vk}
          <swiper-slide>
            <a href={platforms.vk} title="VK">
              <SvgVk />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.nintendo}
          <swiper-slide>
            <a href={platforms.nintendo} title="Nintendo">
              <SvgNintendo />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.google}
          <swiper-slide>
            <a href={platforms.google} title="Play Market">
              <SVGGoogle />
            </a>
          </swiper-slide>
        {/if}
        {#if platforms?.apple}
          <swiper-slide>
            <a href={platforms.apple} title="App Store">
              <SVGApple />
            </a>
          </swiper-slide>
        {/if}
      </swiper-container>
    </div>
  </div>
</article>

<style lang="scss">
  swiper-container {
    width: calc(30px * 5);
  }
  swiper-slide {
    width: 30px;
  }
  .game-card {
    position: relative;
    aspect-ratio: 8/7;
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--color-card));
    transition-property: transform, box-shadow, border-image;
    transition: var(--trans-default);
    /* border: var(--op-border); */
    border-image: linear-gradient(
        160deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 90%
      )
      30;
    border-width: 1px;
    border-style: solid;
  }
  .game-card:hover {
    /* --op-border: var(--border); */
    transform: scale(102%);
    box-shadow: var(--box-shadow-hover);
    border-image: linear-gradient(
        160deg,
        rgb(255, 255, 255, 30%) 0%,
        rgba(255, 255, 255, 0) 90%
      )
      30;
  }
  .game-card:hover .image img {
    filter: blur(7px);
  }
  .game-card:hover .image :global(.btn-firm) {
    opacity: 1;
  }

  .image {
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image :global(.btn-firm) {
    opacity: 0;
    transition-property: opacity;
    transition: var(--trans-default);
  }
  .image img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition-property: filter;
    transition: var(--trans-default);
  }

  .body {
    border-top: var(--border-card-accent);
    padding: 14px 10px 10px;
    display: grid;
    grid-template-areas:
      "title title"
      "tags links";
    grid-auto-rows: minmax(30px, auto);
    grid-template-columns: 1fr auto;
    transition-property: border-color;
    transition: var(--trans-default);
  }
  .body h3 {
    grid-area: title;
    font-size: 16px;
    margin-bottom: 1em;
    text-transform: uppercase;
  }

  .tags {
    margin: 0;
    grid-area: tags;
    display: flex;
    align-items: flex-end;
    gap: 0.5ch;
    font-size: 10px;
    letter-spacing: 0.15ch;
    color: rgb(var(--color-text), 30%);
    font-weight: 300;
  }
  .tags :global(span):not(:last-of-type)::after {
    content: "|";
    margin-left: 0.5ch;
  }

  .links {
    position: relative;
    grid-area: links;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    &.scrollable {
      &:hover {
        &::after,
        &::before {
          opacity: 0;
        }
      }
      &::after,
      &::before {
        content: "";
        pointer-events: none;
        z-index: 2;
        position: absolute;
        width: 20px;
        height: 100%;
        background-image: linear-gradient(
          90deg,
          rgb(var(--color-card)),
          transparent
        );
        top: 0;
        transition-duration: opacity;
        transition: var(--trans-default);
      }
      &::before {
        left: -1px;
      }
      &::after {
        right: -1px;
        transform: rotate(180deg);
      }
      &.isEnd {
        &::after {
          display: none;
        }
      }
      &.isBeginning {
        &::before {
          display: none;
        }
      }
    }
  }
  .links a {
    color: rgb(var(--color-text), 10%);
    transition: color var(--trans-default);
  }
  .links a:hover {
    color: rgb(var(--color-text), 30%);
  }
</style>
