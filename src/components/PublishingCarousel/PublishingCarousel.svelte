<script lang="ts">
  import { onMount } from "svelte";
  import PublishingCards from "./PublishingCards.svelte";
  import PublishingTabs from "./PublishingTabs.svelte";
  import { getCollection } from "astro:content";
  import { publishingData } from "./store";
  import { nanoid } from "nanoid";

  onMount(async () => {
    const publishing = await getCollection("publishing");

    const orderedPublishing = [...publishing]
      .sort((a, b) => a.data.order - b.data.order)
      .map((pub) => ({ ...pub, slIdx: nanoid() }));
    publishingData.set(orderedPublishing);
  });
</script>

<div class="body">
  <PublishingTabs />
  <PublishingCards />
</div>

<style>
  .body {
    display: flex;
    gap: 60px;
    justify-content: space-between;
    min-height: 370px;
  }
</style>
