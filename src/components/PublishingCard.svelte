<script lang="ts">
  import { fly } from "svelte/transition";
  import {
    type SlideData,
    initLeft,
    activeIdx,
    slidingProcess,
    moveLeft,
    moveRight,
  } from "../store/publishing";
  import { onMount } from "svelte";
  import { sineInOut } from "svelte/easing";

  export let data: SlideData;

  const {
    data: { thumbnail, description, title, order },
    infIdx,
  } = data;

  let load = false;
  onMount(() => (load = true));

  const leftIdx = $activeIdx;
  const centerIdx = $activeIdx + 1;
  const rightIdx = $activeIdx + 2;

  function handleClick() {
    if (leftIdx === order) {
      console.log("left");
    }
    if (centerIdx === order) {
      console.log("center");
    }
    if (rightIdx === order) {
      // !$slidingProcess && moveRight();
    }
  }
</script>

{#if load}
  <button
    transition:fly={{
      duration: 700,
      x: $initLeft ? "-100%" : "100%",
      easing: sineInOut,
    }}
    class:active={order === centerIdx}
    style="--idx: {infIdx}; "
    on:click={handleClick}
  >
    <div class="image"><img src={thumbnail} alt={title} /></div>
    <div class="body">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </button>
{/if}

<style lang="scss">
  button {
    --width: calc(33.3% - 10px);
    aspect-ratio: 4/5;
    position: absolute;
    width: var(--width);
    left: calc(
      calc(var(--width) + 30px) * calc(var(--idx) + var(--offset-idx) * -1)
    );

    transform-origin: top;
    transition: var(--trans-slow);
    transition-property: transform, filter, left, opacity;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    &::after {
      content: "";
      opacity: 0;
      z-index: 2;
      position: absolute;
      top: 13px;
      left: 13px;
      width: calc(100% - 13px);
      aspect-ratio: 1;
      border: 1px solid;
      border-image: linear-gradient(
          135deg,
          rgb(var(--border-card-accent-color)),
          transparent 50%
        )
        30;

      border-bottom: none;
      border-right: none;

      transition: var(--trans-slow);
      transition-property: width, height, opacity;
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

    &:hover {
      .image {
        filter: brightness(75%);
      }
    }
    &.active {
      z-index: 2;
      transform: scale(107%);

      filter: drop-shadow(var(--box-shadow-active)) brightness(100%);

      &::after,
      &::before {
        opacity: 1;
      }

      .image {
        filter: brightness(100%);
        &::after {
          border-color: rgb(var(--color-accent), 50%);
        }
        &::before {
          opacity: 1;
        }
        img {
          border-image: linear-gradient(
              135deg,
              rgb(var(--color-accent), 50%) 25%,
              transparent 50%
            )
            30;
        }
      }
    }
  }

  .image {
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
    clip-path: polygon(4rem 0, 100% 0, 100% 100%, 0 100%, 0 4rem);
    border-bottom: 2px solid rgb(var(--border-card-accent-color));
    filter: brightness(50%);

    transition: var(--trans-slow);
    transition-property: clip-path, filter;

    &::after {
      --size: calc(4rem * 1.45);
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
      height: 100%;
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

      transition: var(--trans-slow);
      transition-property: filter, border-image;
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
