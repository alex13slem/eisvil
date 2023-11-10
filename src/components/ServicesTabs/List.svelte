<script lang="ts">
  import { Tab, TabList } from "@rgossiaux/svelte-headlessui";
  import css from "./list.module.scss";
  import { cn } from "@/utils/helpers";
  import type { CollectionEntry } from "astro:content";

  export let data: CollectionEntry<"services">[];
</script>

<TabList class={css.nav}>
  {#each data as { data: { title } }}
    <Tab
      class={({ selected }) => (selected ? cn(css.link, css.active) : css.link)}
      >{title}</Tab
    >
  {/each}
</TabList>
