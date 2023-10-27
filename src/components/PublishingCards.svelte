<script lang="ts">
  import { pubTabIdx } from "@/components/PublishingTabs/store.ts";
  import type { CollectionEntry } from "astro:content";
  import PublishingCard from "./PublishingCard.svelte";

  export let data: CollectionEntry<"publishing">[];
  let curIdx: number;

  pubTabIdx.subscribe((idx) => {
    return (curIdx = idx);
  });
</script>

<div class="cards">
  {#each data as item, idx}
    <PublishingCard data={item} isActive={idx === curIdx} targetIdx={idx} />
  {/each}
</div>

<style lang="scss">
  .cards {
    flex: 1 1 auto;
    position: relative;
    display: flex;
    align-items: start;
    gap: 30px;

    perspective: 1300px;
  }
</style>
