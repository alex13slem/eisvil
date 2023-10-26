<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { pubTabIdx } from "./PublishingTabs/store";

  export let data: CollectionEntry<"publishing">;
  export let isActive: boolean;
  export let targetIdx: number;

  const {
    data: {
      image: { src, alt },
      description,
      title,
    },
  } = data;

  function handleClick() {
    pubTabIdx.set(targetIdx);
  }
</script>

<article class:active={isActive}>
  <button on:click={handleClick}>
    <div class="image"><img {src} {alt} /></div>
    <div class="body">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </button>
</article>

<style lang="scss">
  article {
    --border-color: rgb(58, 79, 125);
    --img-size: 255px;
    overflow: hidden;
    position: relative;
    background-color: rgb(var(--color-card));

    transition: box-shadow var(--trans-default);

    &:hover {
      img {
        filter: brightness(75%);
      }
    }
    &.active {
      --img-size: 280px;

      /* box-shadow: var(--box-shadow); */
      /* box-shadow: 0 60px 20px 10px rgba(0, 0, 0, 0.171); */
      img {
        filter: brightness(100%);
      }
      button {
        &::after,
        &::before {
          opacity: 1;
        }
      }
      .body {
        border-image: linear-gradient(
            100deg,
            rgb(var(--color-card)),
            rgb(var(--color-accent), 30%)
          )
          30;
      }
    }
  }
  button {
    all: unset;
    cursor: pointer;
    text-align: center;
    border: 1px solid rgb(var(--color-card));
    &::after {
      content: "";
      opacity: 0;
      position: absolute;
      top: 13px;
      left: 13px;
      width: calc(var(--img-size) - 13px);
      height: calc(var(--img-size) - 13px);
      border: 1px solid var(--border-color);
      border-bottom: none;
      border-right: none;

      transition-property: width, height, opacity;
      transition: var(--trans-default);
    }
    &::before {
      content: "";
      opacity: 0;
      z-index: 1;
      position: absolute;
      inset: 0;
      width: 6px;
      height: 6px;
      top: 11px;
      left: 11px;
      background: rgb(var(--color-accent), 30%);

      transition: opacity var(--trans-default);
    }
  }
  .image {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: -40px;
      left: -40px;
      width: 80px;
      height: 80px;
      transform: rotate(45deg);
      border-right: 1px solid rgb(var(--color-card));
      background-color: rgb(var(--color-bg));
    }
  }
  img {
    height: var(--img-size);
    width: var(--img-size);
    object-fit: cover;
    object-position: center;
    filter: brightness(50%);

    transition-property: width, height, filter;
    transition: var(--trans-default);
  }
  .body {
    position: relative;
    padding: 1rem;

    color: rgb(var(--color-text));

    border-image: linear-gradient(
        160deg,
        rgb(var(--color-card)),
        rgb(var(--color-bg))
      )
      30;
    border-width: 4px;
    border-style: solid;
    border-top: 0;

    transition: border-image var(--trans-default);

    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 8px);
      top: 0;
      left: -4px;
      border-top: 1px solid var(--border-color);
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
