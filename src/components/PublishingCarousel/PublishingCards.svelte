<script lang="ts">
  import { publishingData as data } from "@/components/PublishingCarousel/store";
  import PublishingCard from "./PublishingCard.svelte";
</script>

<div class="cards">
  <div class="wrap">
    {#each $data as item, idx (item.id)}
      <PublishingCard data={item} {idx} />
    {/each}
  </div>
</div>

<style lang="scss">
  .cards {
    position: relative;
    overflow: hidden;
    margin: -30px;
    padding: 30px;

    &::after,
    &::before {
      z-index: 2;
      content: "";
      position: absolute;
      inset: 0;
      width: 30px;
      background: linear-gradient(90deg, rgb(var(--color-bg)), transparent);
    }
    &::before {
      left: auto;
      transform: rotate(180deg);
    }
  }
  .wrap {
    position: relative;
    display: flex;
    align-items: start;
    gap: 30px;

    transition: transform var(--trans-slow);
  }
</style>
