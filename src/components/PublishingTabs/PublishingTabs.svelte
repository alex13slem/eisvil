<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import BtnFirm from "../BtnFirm.svelte";
  import { cn } from "../../utils/helpers";
  import css from "./style.module.scss";
  import { pubTabIdx } from "./store";

  export let data: CollectionEntry<"publishing">[];

  function handleClick(idx: number) {
    pubTabIdx.set(idx);
  }
  let currIdx: number;
  pubTabIdx.subscribe((idx) => (currIdx = idx));
</script>

<div class={css.root}>
  <nav class={css.nav}>
    {#each data as { data: { title } }, idx}
      <button
        class={cn(css.link, idx === currIdx && css.active)}
        on:click={() => handleClick(idx)}
      >
        {title}
      </button>
    {/each}
  </nav>

  <div class={css["preview-wrap"]}>
    {#each data as { body, data: { link } }, idx}
      <div class={cn(css.preview, idx === currIdx && css.active)}>
        <div class={css.body}>{@html parse(body)}</div>
        <BtnFirm><a href={link}>Подать заявку</a></BtnFirm>
      </div>
    {/each}
  </div>
</div>
