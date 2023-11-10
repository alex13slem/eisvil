<script lang="ts">
  import { register, type SwiperContainer } from "swiper/element/bundle";

  export let data: { src: string; alt: string }[];

  register();

  let swiperEl: SwiperContainer;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
  };
</script>

<div class="wrap">
  <swiper-container
    bind:this={swiperEl}
    direction="vertical"
    slides-per-view="auto"
    spaceBetween="16"
  >
    {#each data as { src, alt }}
      <swiper-slide>
        <button><img {src} {alt} /></button>
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style>
  .wrap {
    direction: rtl;
    width: 370px;
    padding: 1rem;
    overflow-y: auto;
    border-left: var(--border);
  }
  swiper-container {
    height: fit-content;
  }
  swiper-slide {
    height: fit-content;
  }
  button {
    width: 100%;
    height: 220px;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
