<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { pubTabIdx } from "./PublishingTabs/store";

  export let data: CollectionEntry<"publishing">;
  export let isActive: boolean;
  export let targetIdx: number;

  const {
    data: { thumbnail, description, title },
  } = data;

  let currentIdx: number;
  $: targetIdx;

  function handleClick() {
    pubTabIdx.set(targetIdx);
  }
  function setCurrIxd(idx: number) {
    currentIdx = idx;
  }

  pubTabIdx.subscribe(setCurrIxd);
</script>

<article class:active={isActive}>
  <button on:click={handleClick}>
    <div class="image"><img src={thumbnail} alt={title} /></div>
    <div class="body">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </button>
</article>

<style lang="scss">
  /* 
  style="--idx: {targetIdx === currentIdx
    ? targetIdx - 1
    : currentIdx - targetIdx}"
  */
  article {
    --border-color: rgb(58, 79, 125);
    --img-size: 255px;
    flex: 1 1 auto;
    /* order: var(--idx); */
    /* overflow: hidden; */
    position: relative;

    filter: brightness(50%);

    transform-origin: top;
    transition-property: transform, filter, left;
    transition: var(--trans-slow);

    &:hover {
      filter: brightness(75%);
    }
    &.active {
      // --img-size: 280px;
      transform: scale(107%);

      filter: drop-shadow(var(--box-shadow)) brightness(100%);
      // filter: drop-shadow(0 0 70px rgb(var(--color-bg)));

      button {
        &::after,
        &::before {
          opacity: 1;
        }
      }
    }
  }
  button {
    all: unset;
    cursor: pointer;
    text-align: center;
    &::after {
      content: "";
      opacity: 0;
      z-index: 2;
      position: absolute;
      top: 13px;
      left: 13px;
      width: calc(100% - 13px);
      height: calc(var(--img-size) - 13px);
      border: 1px solid var(--border-color);
      border-bottom: none;
      border-right: none;

      transition-property: width, height, opacity;
      transition: var(--trans-slow);
    }
    &::before {
      content: "";
      opacity: 0;
      z-index: 2;
      position: absolute;
      inset: 0;
      width: 6px;
      height: 6px;
      top: 11px;
      left: 11px;
      background: var(--border-color);

      transition: opacity var(--trans-default);
    }
  }
  .image {
    overflow: hidden;
    position: relative;
    z-index: 1;
    clip-path: polygon(
      calc(var(--img-size) / 4) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 calc(var(--img-size) / 4)
    );

    transition: clip-path var(--trans-slow);
  }
  img {
    height: var(--img-size);
    width: 100%;
    object-fit: cover;
    object-position: center;

    border: 1px solid rgb(var(--color-card));
    border-bottom: none;

    transition-property: width, height, filter;
    transition: var(--trans-slow);
  }
  .body {
    position: relative;
    padding: 1rem;

    color: rgb(var(--color-text));

    background-color: rgb(var(--color-card));
    border-image: linear-gradient(
        160deg,
        rgb(var(--color-card)),
        rgb(var(--color-bg))
      )
      30;
    border-width: 4px;
    border-style: solid;
    border-top: 0;

    transition: border-image var(--trans-slow);

    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 8px);
      top: 0;
      left: -4px;
      border: 1px solid rgb(var(--color-card));
      border-top-color: var(--border-color);
    }
  }

  h3 {
    margin-bottom: 9px;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 11px;
  }
</style>
