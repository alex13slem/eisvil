<script lang="ts">
  import { type SwiperContainer } from "swiper/element/bundle";
  import { formatStrToId } from "../utils/helpers";

  export let data: { src: string; alt: string }[];

  // onMount(() => {
  //   register();
  // });

  let swiperDetail: SwiperContainer;
  let swiperPreview: SwiperContainer;

  let isEnd: boolean;
  let isBeginning: boolean;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    isEnd = swiper.isEnd;
    isBeginning = swiper.isBeginning;
  };
</script>

<div class="root">
  <swiper-container
    class="detail-slider"
    class:load={!swiperDetail}
    bind:this={swiperDetail}
    mousewheel
    thumbs-swiper=".preview-slider"
    hash-navigation-watch-state
    effect="fade"
  >
    {#each data as { src, alt }}
      <swiper-slide class="detail-slide" data-hash={formatStrToId(alt)}>
        <div class="detail-slide-wrap" style="background-image: url({src});">
          <img {src} {alt} height="600" />
        </div>
      </swiper-slide>
    {/each}
  </swiper-container>

  <swiper-container
    class="preview-slider"
    class:isEnd
    class:isBeginning
    class:load={!swiperPreview}
    bind:this={swiperPreview}
    mousewheel
    slides-per-view="3.33"
    watch-slides-progress
    on:swiperprogress={onProgress}
  >
    {#each data as { src, alt }}
      <swiper-slide class="preview-slide">
        <div class="preview-slide-wrap">
          <button><img {src} {alt} /></button>
        </div>
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style lang="scss">
  .detail-slider.load,
  .preview-slider.load {
    opacity: 0;
  }

  .detail-slider {
    margin: -30px;
    margin-bottom: 0;
    background-color: rgb(var(--color-white), 10%);
    // box-shadow: var(--box-shadow-active);

    transition: var(--load-fade);
    transition-property: opacity;
  }

  .detail-slide-wrap {
    width: 100%;
    height: 100%;
    box-shadow: var(--box-shadow-active);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .detail-slide {
    height: 600px;
    width: 100%;
    padding: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(var(--color-bg));

    // transition: var(--trans-default);
    // transition-property: background-size;
    // overflow: hidden;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--color-bg), 0.85);

      // backdrop-filter: blur(6px);
      // transition: var(--trans-slow);
      // transition-property: box-shadow;
      backdrop-filter: blur(16px);
    }
  }

  .preview-slider {
    position: relative;
    margin: -15px;
    transition: var(--load-fade);
    transition-property: opacity;
    &::after,
    &::before {
      pointer-events: none;
      content: "";
      position: absolute;
      z-index: 2;
      inset: -1px;
      width: 15%;
      background: linear-gradient(90deg, transparent, rgb(var(--color-bg)));
    }
    &::after {
      left: auto;
    }
    &::before {
      right: auto;
      transform: rotate(180deg);
    }
    &:global(.isEnd) {
      &::after {
        opacity: 0;
      }
    }
    &:global(.isBeginning) {
      &::before {
        opacity: 0;
      }
    }
  }

  .preview-slide-wrap {
    position: relative;

    padding: 16px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-slide {
    &:hover button,
    &:global(.swiper-slide-thumb-active button) {
      filter: brightness(1);
      border-image: linear-gradient(
          160deg,
          rgba(255, 255, 255, 60%) 0%,
          rgba(255, 255, 255, 0) 60%
        )
        30;
      // box-shadow: var(--box-shadow-active);
      &::after {
        opacity: 1;
      }
    }

    button {
      padding: 0;
      border: none;
      background: transparent;

      height: 170px;
      width: 100%;

      border-image: linear-gradient(
          160deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 90%
        )
        30;
      border-width: 1px;
      border-style: solid;

      filter: brightness(0.5);

      transition: var(--trans-default);
      transition-property: box-shadow, border-image, filter;

      &::after {
        pointer-events: none;
        position: absolute;
        content: "";
        inset: 0px;
        opacity: 0;

        background: linear-gradient(
          149deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 36.93%
        );
        transition: opacity var(--trans-default);
      }
    }

    img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
    }

    &:global(.swiper-slide-thumb-active button) {
      // border: 3px solid white;
    }
  }
</style>
