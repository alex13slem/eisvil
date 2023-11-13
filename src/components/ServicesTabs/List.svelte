<script lang="ts">
  import { Tab, TabList } from "@rgossiaux/svelte-headlessui";
  import css from "./list.module.scss";
  import { cn } from "@/utils/helpers";
  import type { CollectionEntry } from "astro:content";
  import { servicesModalForm } from "../../store/modals";
  import { onMount } from "svelte";

  export let data: CollectionEntry<"services">[];

  function setTargetService(value: string) {
    servicesModalForm.set({ ...$servicesModalForm, target: value });
  }

  onMount(() => {
    setTargetService(data[0].data.title);
  });
</script>

<TabList class={css.nav}>
  {#each data as { data: { title } }}
    <Tab
      on:click={() => setTargetService(title)}
      class={({ selected }) => (selected ? cn(css.link, css.active) : css.link)}
      >{title}</Tab
    >
  {/each}
</TabList>
