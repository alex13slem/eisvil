<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import { TabPanels } from "@rgossiaux/svelte-headlessui";
  import css from "./panels.module.scss";
  import BtnFirm from "../BtnFirm.svelte";
  import { type SwiperContainer } from "swiper/element/bundle";
  import ModalTrigger from "../ModalTrigger.svelte";
  import { fade } from "svelte/transition";
  import { formatStrToId } from "../../utils/helpers";

  export let data: CollectionEntry<"services">[];

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
    {#each data as { data: { images, description }, collection, slug }, idx (slug)}
      {#if selectedIndex === idx}
        <div class={css.panel} transition:fade>
          <div class={css.slider}>
            <swiper-container
              class={css["slider-wrap"]}
              class:isEnd
              class:isBeginning
              bind:this={swiperEl}
              mousewheel={true}
              slides-per-view="3.5"
              space-between="-10"
              on:swiperprogress={onProgress}
            >
              {#each images as { src, alt }}
                <swiper-slide lazy="true">
                  <div class={css["slide-wrap"]}>
                    <a
                      href="{collection}/{slug.split('/')[1]}/#{formatStrToId(
                        alt,
                      )}"
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

          <div class="prose">
            {@html parse(description)}
          </div>

          <ModalTrigger
            variant="contrast"
            type="services"
            flexPosition="start"
            {slug}>Расчитать</ModalTrigger
          >
        </div>
      {/if}
    {/each}
  </TabPanels>
</div>
