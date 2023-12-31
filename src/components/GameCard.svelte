<script lang="ts">
  import CardBadge from "./CardBadge.svelte";
  import BtnFirm from "./BtnFirm.svelte";
  import type { CollectionEntry } from "astro:content";
  import GameCardPlatformsSlider from "./GameCardPlatformsSlider.svelte";

  export let game: CollectionEntry<"games">;

  const { id, collection } = game;
  const { title, genre, thumbnail, status, favorites, platforms } = game.data;
</script>

<article class="game-card" {...$$restProps}>
  {#if status}
    <CardBadge type={status} />
  {/if}

  <div class="image">
    <img src={thumbnail} alt={title} width="336" height="163" />
    <a href="/{collection}/{id.split('/')[1]}">
      <BtnFirm variant="transparent" size="sm">ПОДРОБНЕЕ</BtnFirm>
    </a>
  </div>

  <div class="body">
    <h3>{title}</h3>

    <p class="tags">
      <span>{genre}</span>
      {#if favorites}
        <span>{favorites}</span>
      {/if}
    </p>

    {#if platforms?.length}
      <GameCardPlatformsSlider {platforms} num={4} />
    {/if}
  </div>
</article>

<style lang="scss">
  .game-card {
    height: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--c-card));
    transition: var(--trans-default);
    transition-property: transform, box-shadow, border-image;
    /* border: var(--op-border); */
    border-image: linear-gradient(
        160deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 90%
      )
      30;
    border-width: 1px;
    border-style: solid;
  }
  .game-card:hover {
    /* --op-border: var(--border); */
    transform: scale(102%);
    box-shadow: var(--box-shadow-hover);
    border-image: linear-gradient(
        160deg,
        rgb(255, 255, 255, 30%) 0%,
        rgba(255, 255, 255, 0) 90%
      )
      30;

    .image img {
      filter: blur(7px);
    }
    .image :global(.btn-firm) {
      opacity: 1;
    }
  }

  .image :global(.btn-firm) {
    opacity: 0;
  }

  .image {
    height: 146px;
    flex: 0 1 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition: var(--trans-default);
    transition-property: filter;
  }

  .body {
    border-top: var(--border-card-accent);
    padding: 14px 10px 10px;
    display: grid;
    grid-template-areas:
      "title title"
      "tags links";
    grid-template-columns: 1fr auto;
    row-gap: 16px;
    transition: var(--trans-default);
    transition-property: border-color;
  }
  .body h3 {
    overflow: hidden;
    grid-area: title;
    font-size: 16px;
    line-height: 1;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .tags {
    margin: 0;
    grid-area: tags;
    display: flex;
    align-items: flex-end;
    gap: 0.5ch;
    font-size: 10px;
    letter-spacing: 0.15ch;
    color: rgb(var(--c-text), 30%);
    font-weight: 300;
  }
  .tags :global(span):not(:last-of-type)::after {
    content: "|";
    margin-left: 0.5ch;
  }
</style>
