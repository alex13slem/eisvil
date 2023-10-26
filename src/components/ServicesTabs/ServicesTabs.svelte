<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";

  import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";

  import css from "./style.module.scss";
  import { cn } from "@/utils/helpers";
  import BtnFirm from "../BtnFirm.svelte";
  import { fade } from "svelte/transition";

  export let data: CollectionEntry<"services">[];
</script>

<TabGroup class={css.root} vertical>
  <TabList class={css.nav}>
    {#each data as { data: { title } }}
      <Tab
        class={({ selected }) =>
          selected ? cn(css.link, css.active) : css.link}>{title}</Tab
      >
    {/each}
  </TabList>
  <TabPanels>
    {#each data as { data: { images, link }, body }}
      <TabPanel class={css.preview}>
        <div class={css.images}>
          {#each images as { src, alt }}
            <Popover class={css.image} let:open>
              <PopoverButton>
                <img {src} {alt} />
              </PopoverButton>

              {#if open}
                <div
                  class={css["image-zoom"]}
                  transition:fade={{ duration: 300 }}
                >
                  <PopoverPanel static>
                    <img {src} {alt} />
                  </PopoverPanel>
                </div>
              {/if}
            </Popover>
          {/each}
        </div>

        {@html parse(body)}

        <BtnFirm variant="contrast">
          <a href={link}>Расчитать</a>
        </BtnFirm>
      </TabPanel>
    {/each}
  </TabPanels>
</TabGroup>
