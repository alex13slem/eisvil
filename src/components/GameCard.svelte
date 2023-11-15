<script lang="ts">
  import SVGPlaygame from "./svg/platforms/SVGPlaygame.svelte";
  import SVGApple from "./svg/platforms/SVGApple.svelte";
  import SVGGoogle from "./svg/platforms/SVGGoogle.svelte";
  import CardBadge from "./CardBadge.svelte";
  import BtnFirm from "./BtnFirm.svelte";
  import type { CollectionEntry } from "astro:content";

  export let game: CollectionEntry<"games">;

  const { title, thumbnail, tags, links, link, category } = game.data;
</script>

<article class="game-card" {...$$restProps}>
  {#if category}
    <CardBadge type={category} />
  {/if}

  <div class="image">
    <img src={thumbnail} alt={title} width="336" height="202" />
    <BtnFirm variant="transparent"><a href={link}>ПОДРОБНЕЕ</a></BtnFirm>
  </div>
  <div class="body">
    <h3>{title}</h3>
    <p class="genre">
      {#each tags as tag}
        <span>{tag}</span>
      {/each}
    </p>
    <div class="links">
      {#if links?.playgame}
        <a href={links.playgame}>
          <SVGPlaygame />
        </a>
      {/if}
      {#if links?.apple}
        <a href={links.apple}>
          <SVGApple />
        </a>
      {/if}
      {#if links?.google}
        <a href={links.google}>
          <SVGGoogle />
        </a>
      {/if}
    </div>
  </div>
</article>

<style>
  .game-card {
    position: relative;
    aspect-ratio: 8/7;
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--color-card));
    transition-property: transform, box-shadow, border-image;
    transition: var(--trans-default);
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
    box-shadow: var(--box-shadow);
    border-image: linear-gradient(
        160deg,
        rgb(255, 255, 255, 30%) 0%,
        rgba(255, 255, 255, 0) 90%
      )
      30;
  }
  .game-card:hover .image img {
    filter: blur(7px);
  }
  .game-card:hover .image :global(.btn-firm) {
    opacity: 1;
  }

  .image {
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image :global(.btn-firm) {
    opacity: 0;
    transition-property: opacity;
    transition: var(--trans-default);
  }
  .image img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition-property: filter;
    transition: var(--trans-default);
  }

  .body {
    border-top: var(--border-card-accent);
    padding: 14px 10px 10px;
    display: grid;
    grid-template-areas:
      "title title"
      "genre links";
    transition-property: border-color;
    transition: var(--trans-default);
  }
  .body h3 {
    grid-area: title;
    font-size: 16px;
    margin-bottom: 1em;
    text-transform: uppercase;
  }

  .genre {
    margin: 0;
    grid-area: genre;
    display: flex;
    align-items: flex-end;
    gap: 0.5ch;
    font-size: 10px;
    letter-spacing: 0.15ch;
    color: rgb(var(--color-text), 30%);
    font-weight: 300;
  }
  .genre :global(span) {
  }
  .genre :global(span):not(:last-of-type)::after {
    content: "|";
    margin-left: 0.5ch;
  }

  .links {
    grid-area: links;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .links a {
    color: rgb(var(--color-text), 10%);
    transition: color var(--trans-default);
  }
  .links a:hover {
    color: rgb(var(--color-text), 30%);
  }
</style>
