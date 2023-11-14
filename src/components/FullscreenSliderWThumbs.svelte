<script lang="ts">
  import { register, type SwiperContainer } from "swiper/element/bundle";

  export let data: { src: string; alt: string }[];

  register();

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

<div class="wrap">
  <swiper-container
    class="detail-slider"
    bind:this={swiperDetail}
    mousewheel
    thumbs-swiper=".preview-slider"
  >
    {#each data as { src, alt }}
      <swiper-slide class="detail-slide" style="background-image: url({src});">
        <img {src} {alt} />
      </swiper-slide>
    {/each}
  </swiper-container>
  <swiper-container
    class="preview-slider"
    class:isEnd
    class:isBeginning
    mousewheel
    bind:this={swiperPreview}
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
  .wrap {
    padding: 2rem;
    padding-right: 0;
  }

  .detail-slider {
    margin-bottom: 2rem;
    background-color: rgb(var(--color-white), 10%);
    box-shadow: var(--box-shadow);
  }

  .detail-slide {
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    img {
      object-fit: contain;
      object-position: center;
      height: 100%;
      width: 100%;
      backdrop-filter: blur(16px);
    }
  }

  .preview-slider {
    margin: -16px;
    position: relative;
    &::after,
    &::before {
      pointer-events: none;
      content: "";
      position: absolute;
      z-index: 2;
      inset: -1px;
      width: 15%;
      background: linear-gradient(90deg, transparent, rgb(var(--color-bg)));

      transition: opacity var(--trans-default);
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
      box-shadow: var(--box-shadow);
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

      border: 1px solid transparent;

      border-image: linear-gradient(
          160deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 90%
        )
        30;
      border-width: 1px;
      border-style: solid;

      filter: brightness(0.5);

      transition-property: box-shadow, border-image, filter;
      transition: var(--trans-default);

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
