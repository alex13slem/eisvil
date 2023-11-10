<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import { TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
  import css from "./panels.module.scss";
  import BtnFirm from "../BtnFirm.svelte";
  import { register, type SwiperContainer } from "swiper/element/bundle";

  export let data: CollectionEntry<"services">[];

  register();

  let swiperEl: SwiperContainer;

  let isEnd: boolean;
  let isBeginning: boolean;

  const onProgress = (e: any) => {
    const [swiper, progress] = e.detail;
    isEnd = swiper.isEnd;
    isBeginning = swiper.isBeginning;
  };
</script>

<TabPanels>
  {#each data as { data: { images, link, order }, body, collection, slug }}
    <TabPanel>
      <div class={css.slider}>
        <swiper-container
          class={css["slider-wrap"]}
          class:isEnd
          class:isBeginning
          mousewheel={{}}
          bind:this={swiperEl}
          slidesPerView="3.5"
          spaceBetween="-10"
          cssMode
          on:swiperprogress={onProgress}
        >
          {#each images as { src, alt }}
            <swiper-slide lazy="true">
              <div class={css["slide-wrap"]}>
                <a
                  href="gallery/{collection}/{slug}/#{order}"
                  class={css.image}
                >
                  <img {src} {alt} loading="lazy" />
                </a>
              </div>
            </swiper-slide>
          {/each}
          <swiper-slide>
            <div class={css["slide-wrap"]}>
              <BtnFirm variant="transparent"
                ><a href="gallery/{collection}/{slug}">В раздел</a></BtnFirm
              >
            </div>
          </swiper-slide>
        </swiper-container>
      </div>

      {@html parse(body)}

      <BtnFirm variant="contrast">
        <a href={link}>Расчитать</a>
      </BtnFirm>
    </TabPanel>
  {/each}
</TabPanels>
