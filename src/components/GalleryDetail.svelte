<script lang="ts">
  import { onMount } from "svelte";
  import { register, type SwiperContainer } from "swiper/element/bundle";

  export let data: { src: string; alt: string }[];

  onMount(() => {
    register();
  });

  let swiperEl: SwiperContainer;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
  };
</script>

<div class="wrap">
  <swiper-container bind:this={swiperEl} mousewheel={{}} direction="vertical">
    {#each data as { src, alt }}
      <swiper-slide>
        <button><img {src} {alt} /></button>
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style>
  .wrap {
    flex: 1 1 auto;
    padding: 1rem;
  }

  swiper-container {
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
</style>
