<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import { TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
  import css from "./panels.module.scss";
  import BtnFirm from "../BtnFirm.svelte";
  import { register, type SwiperContainer } from "swiper/element/bundle";
  import ModalTrigger from "../ModalTrigger.svelte";
  import { blur, fade, fly } from "svelte/transition";

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

<div class={css.wrap}>
  <TabPanels let:selectedIndex>
    {#each data as { data: { images, order }, body, collection, slug }, idx (slug)}
      {#if selectedIndex === idx}
        <div class={css.panel} transition:fly>
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
                      href="{collection}/{slug.split('/')[1]}/#{alt}"
                      class={css.image}
                      data-astro-reload
                    >
                      <img
                        {src}
                        {alt}
                        width="268"
                        height="193"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </swiper-slide>
              {/each}
              <swiper-slide>
                <div class={css["slide-wrap"]}>
                  <a href="{collection}/{slug.split('/')[1]}"
                    ><BtnFirm variant="transparent">В раздел</BtnFirm></a
                  >
                </div>
              </swiper-slide>
            </swiper-container>
          </div>

          {@html parse(body)}

          <ModalTrigger variant="contrast" type="services" defaultValue="store"
            >Расчитать</ModalTrigger
          >
        </div>
      {/if}
    {/each}
  </TabPanels>
</div>
