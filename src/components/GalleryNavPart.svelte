<script lang="ts">
  import { getCollection, type CollectionKey } from "astro:content";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let collection: CollectionKey;
  export let title: string;

  let active = false;
  let collectionData;
  onMount(async () => {
    collectionData = await getCollection(collection);
  });
</script>

<button class:active on:click={() => (active = !active)}>{title}</button>
{#if active}
  <ul transition:fly>
    {#if collectionData?.length}
      {#each collectionData as { collection, slug, id, data } (slug || id)}
        <li>
          <a href="./{collection}/{slug || id}">{data.title}</a>
        </li>
      {/each}
    {/if}
  </ul>
{/if}

<style lang="scss">
  @import "../styles/mixins";
  button {
    padding: 0 1rem;
    border: none;
    background-color: rgb(var(--color-bg));

    position: relative;

    line-height: 3;
    color: rgb(var(--color-white));
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    text-align: left;

    border-bottom: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgb(var(--color-white), 0) -1rem,
        rgb(var(--color-white), 0.1) 100%
      )
      1;

    transition-property: text-shadow;
    transition: var(--trans-default);

    &::after {
      position: absolute;
      content: "";
      inset: 0;
      right: auto;
      width: 1.5rem;
      background: linear-gradient(
        90deg,
        rgb(var(--color-accent), 25%),
        transparent
      );

      transition-property: width;
      transition: var(--trans-default);
    }

    &:hover {
      @include hover-text1();
      &::after {
        width: 25%;
      }
    }
    &.active {
      &::after {
        width: 100%;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    // overflow: hidden;
    // height: var(--height);

    transition-property: max-height;
    transition: var(--trans-slow);
    // button.active + & {
    //   max-height: 0;
    // }
  }

  li {
    padding: 0 1rem;
    line-height: 3;
    transition-property: text-shadow;
    transition: var(--trans-default);
    &:hover {
      @include hover-text1();
    }
  }

  a {
    color: rgb(var(--color-white));
  }
</style>
