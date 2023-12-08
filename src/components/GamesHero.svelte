<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { getRandom } from "../utils/helpers";
  import BtnFirm from "./BtnFirm.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { topGames } from "../store/games";
  let bannerGame: CollectionEntry<"games">;
  onMount(() => {
    bannerGame = getRandom(topGames);
  });
</script>

<div class="games-hero">
  {#if bannerGame?.data.hero_image}
    <img
      transition:fade={{ duration: 300 }}
      src={bannerGame.data.hero_image}
      alt="banner"
    />
  {/if}
  <BtnFirm>Играть сейчас</BtnFirm>
</div>

<style lang="scss">
  .games-hero {
    z-index: 0;
    height: 100svh;
    margin-top: -60px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-block: 80px;

    &::after {
      z-index: -1;
      position: absolute;
      content: "";
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(28, 29, 43, 0) 50%,
        rgba(28, 29, 43, 0.31) 80%,
        #1c1d2b calc(100% - 20px),
        #1c1d2b 100%
      );
    }

    img {
      z-index: -1;
      position: absolute;
      inset: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
      object-position: center;
    }
  }
</style>
