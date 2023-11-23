<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { getRandom } from "../utils/helpers";
  import BtnFirm from "./BtnFirm.svelte";
  export let games: CollectionEntry<"games">[];
  const bannerGame = getRandom(games);
</script>

<div
  class="games-hero"
  style="background-image: url({bannerGame.data.hero_image});"
>
  <BtnFirm>Играть сейчас</BtnFirm>
</div>

<style>
  .games-hero {
    z-index: 0;
    height: 80vh;
    margin-top: -60px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-block: 80px;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::after {
      z-index: -1;
      position: absolute;
      content: "";
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(28, 29, 43, 0) 50%,
        rgba(28, 29, 43, 0.31) 80%,
        #1c1d2b 100%
      );
    }
  }
</style>
