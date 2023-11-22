<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { getRandom } from "../utils/helpers";
  export let games: CollectionEntry<"games">[];
  const bannerGame = getRandom(games);
</script>

<div
  class="games-hero"
  style="background-image: url({bannerGame.data.hero_image});"
></div>

<style>
  .games-hero {
    height: 80vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin-top: -60px;
    position: relative;

    &::after {
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
