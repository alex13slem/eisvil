<script lang="ts">
  import { register, type SwiperContainer } from "swiper/element";
  import SvgHuawei from "./svg/platforms/SVGHuawei.svelte";
  import SvgNintendo from "./svg/platforms/SVGNintendo.svelte";
  import SvgRusstore from "./svg/platforms/SVGRusstore.svelte";
  import SvgSony from "./svg/platforms/SVGSony.svelte";
  import SvgSteam from "./svg/platforms/SVGSteam.svelte";
  import SvgVk from "./svg/platforms/SVGVk.svelte";
  import SvgxBox from "./svg/platforms/SVGXBox.svelte";
  import SvgYandex from "./svg/platforms/SVGYandex.svelte";
  import SvgGoogle from "./svg/platforms/SVGGoogle.svelte";
  import SvgApple from "./svg/platforms/SVGApple.svelte";
  let swiperEl: SwiperContainer;

  export let platforms: {
    title: string;
    slug: string;
    svg_href?: string;
    href: string;
  }[];
  const platformsWithLinks = platforms.filter((platform) => !!platform.href);
  export let num: number = platformsWithLinks.length;

  let isEnd: boolean = false;
  let isBeginning: boolean = false;
  let isScrollable: boolean = platformsWithLinks.length > 4;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    if (isScrollable) {
      isEnd = swiper.isEnd;
      isBeginning = swiper.isBeginning;
    }
  };
</script>

<div class="links" class:isBeginning class:isEnd class:isScrollable>
  <swiper-container
    style="--num: {num}"
    bind:this={swiperEl}
    on:swiperprogress={onProgress}
    mousewheel
    slides-per-view="auto"
    nested
  >
    {#each platformsWithLinks as { href, slug, title, svg_href }}
      <swiper-slide>
        <a {href} {title}>
          {#if slug === "playstation"}
            <SvgSony />
          {:else if slug === "ru_store"}
            <SvgRusstore />
          {:else if slug === "steam"}
            <SvgSteam />
          {:else if slug === "yandex"}
            <SvgYandex />
          {:else if slug === "xbox"}
            <SvgxBox />
          {:else if slug === "app_gallery"}
            <SvgHuawei />
          {:else if slug === "vk"}
            <SvgVk />
          {:else if slug === "nintendo"}
            <SvgNintendo />
          {:else if slug === "google"}
            <SvgGoogle />
          {:else if slug === "apple"}
            <SvgApple />
          {:else}
            <img src={svg_href} alt={title} loading="lazy" />
          {/if}
        </a>
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style style="scss">
  swiper-container {
    display: flex;
    max-width: calc(30px * var(--num) + 10px * (var(--num) - 1));
  }
  swiper-slide {
    width: 30px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .links {
    position: relative;
    grid-area: links;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .links.isScrollable {
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
  .links a {
    color: rgb(var(--color-text), 10%);
    transition: color var(--trans-default);
  }
  .links a:hover {
    color: rgb(var(--color-text), 30%);
  }
</style>
