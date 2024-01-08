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
  export let idx: number;
  export let clientHeight: number;

  const {
    data: { thumbnail, description, title, order },
    infIdx,
    collection,
    slug,
  } = data;

  let load = false;
  onMount(() => (load = true));

  function handleClick() {
    if ($slidingProcess) return;

    if (idx === 0) moveRight();

    if (idx === 1) {
      window.location.href = `${collection}/${slug.split("/")[1]}`;
    }

    if (idx === 2) moveLeft();
  }
</script>

{#if load}
  <button
    transition:fly={{
      duration: 700,
      x: $initLeft ? "-100%" : "100%",
      easing: sineInOut,
    }}
    class:active={order === $activeIdx + 1}
    style="--idx: {infIdx}; "
    on:click={handleClick}
    bind:clientHeight
  >
    <div class="image"><img src={thumbnail} alt={title} /></div>
    <div class="body">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="260"
      viewBox="0 0 280 280"
      fill="none"
      class="border"
    >
      <path
        d="M0.5 67.2071L67.2071 0.5H279.5V279.5H0.5V67.2071Z"
        stroke="url(#paint0_linear_1600_783)"
        stroke-opacity="0.45"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1600_783"
          x1="0"
          y1="0"
          x2="183"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFBE82" />
          <stop offset="0.494454" stop-color="#FFBE82" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </button>
{/if}

<style lang="scss">
  button {
    --width: calc(33.3% - 30px);
    aspect-ratio: 4/5;
    position: absolute;
    width: var(--width);
    left: calc(calc(var(--width) + 45px) * calc(var(--idx) + var(--shift-idx)));

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
      transform: scale(108%);

      filter: drop-shadow(var(--box-shadow-active)) brightness(100%);

      &::after,
      &::before {
        opacity: 1;
      }

      .border {
        opacity: 1;
      }
      .image {
        filter: brightness(100%);

        &::before {
          opacity: 1;
        }
      }
    }
  }

  .border {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    transition: opacity var(--trans-slow);
  }

  .image {
    --clip: 62px;
    flex: 1 1 auto;
    position: relative;
    z-index: 1;
    clip-path: polygon(var(--clip) 0, 100% 0, 100% 100%, 0 100%, 0 var(--clip));
    border-bottom: 2px solid rgb(var(--border-card-accent-color));
    filter: brightness(50%);

    transition: var(--trans-slow);
    transition-property: clip-path, filter;

    &::before {
      opacity: 0;
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgb(var(--c-accent), 50%) 0%,
        transparent 60%
      );

      transition: opacity var(--trans-slow);
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;

      transition: var(--trans-slow);
      transition-property: filter;
    }
  }

  .body {
    position: relative;
    padding: 1rem;

    color: rgb(var(--c-text));

    background-color: rgb(var(--c-card));
    border-image: linear-gradient(160deg, rgb(var(--c-card)), rgb(var(--c-bg)))
      30;
    border-width: 4px;
    border-style: solid;
    border-top: none;

    transition: border-image var(--trans-slow);
  }

  h3 {
    margin-bottom: 9px;
    font-size: 16px;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 11px;
  }
</style>
