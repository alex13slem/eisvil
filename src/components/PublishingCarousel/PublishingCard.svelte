<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { moveLeft, moveRight, pubTabIdx } from "./store";
  import { crossfade, fade, fly, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  export let idx: number;
  export let data: CollectionEntry<"publishing">;

  $: isLeft = idx === 0;
  $: isCenter = idx === 1;
  $: isRight = idx === 2;

  const {
    data: { thumbnail, description, title },
  } = data;

  function handleClick() {
    isLeft && moveLeft();
    isRight && moveRight();
  }

  onMount(() => console.log("init"));
</script>

<!--  -->
<article class:left={isLeft} class:right={isRight} class:active={isCenter}>
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
    /* order: var(--idx); */
    --img-size: 255px;
    flex: 0 0 calc(33.3% - 20px);
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

      .image {
        &::after {
          border-color: rgb(var(--color-accent), 50%);
        }
        &::before {
          opacity: 1;
        }
        img {
          border-image: linear-gradient(
              135deg,
              rgb(var(--color-accent), 50%) calc(var(--img-size) / 4),
              transparent 50%
            )
            30;
        }
      }
    }

    &.inactive {
      pointer-events: none;
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

      // border: var(--border-card-accent);
      border: 1px solid;
      border-image: linear-gradient(
          140deg,
          rgb(var(--border-card-accent-color)) calc(var(--img-size) / 4),
          transparent 45%
        )
        30;

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
      background: rgb(var(--border-card-accent-color));

      transition: opacity var(--trans-slow);
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
    border-bottom: 2px solid rgb(var(--border-card-accent-color));

    transition: clip-path var(--trans-slow);

    &::after {
      --size: calc((var(--img-size) / 4) * 1.45);
      content: "";
      position: absolute;
      top: calc(var(--size) / 2 * -1);
      left: calc(var(--size) / 2 * -1);
      width: var(--size);
      transform: rotate(-45deg);
      aspect-ratio: 1 / 1;
      border: 1px solid rgb(var(--color-card));

      transition: border-color var(--trans-slow);
    }

    &::before {
      opacity: 0;
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgb(var(--color-accent), 50%) 0%,
        transparent 60%
      );

      transition: opacity var(--trans-slow);
    }

    img {
      height: var(--img-size);
      width: 100%;
      object-fit: cover;
      object-position: center;

      border: 1px solid;
      border-image: linear-gradient(
          135deg,
          rgb(var(--color-card)) 0%,
          rgb(var(--color-card)) 50%
        )
        30;
      border-bottom: none;

      transition-property: filter, border-image;
      transition: var(--trans-slow);
    }
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
