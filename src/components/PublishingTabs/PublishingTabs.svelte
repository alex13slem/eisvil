<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { parse } from "marked";
  import { cn } from "@/utils/helpers";
  import css from "./style.module.scss";
  import { pubTabIdx } from "./store";
  import ModalTrigger from "../ModalTrigger.svelte";
  import { onMount } from "svelte";
  import { publishingModalForm } from "../../store/modals";

  export let data: CollectionEntry<"publishing">[];

  function handleClick(idx: number) {
    pubTabIdx.set(idx);
    setTargetPublishing(data[idx].data.title);
  }
  let currIdx: number;
  pubTabIdx.subscribe((idx) => (currIdx = idx));

  function setTargetPublishing(value: string) {
    publishingModalForm.set({ ...$publishingModalForm, target: value });
  }

  onMount(() => {
    setTargetPublishing(data[1].data.title);
  });
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
    {#each data as { body, slug }, idx}
      <div class={cn(css.preview, idx === currIdx && css.active)}>
        <div class={css.body}>{@html parse(body)}</div>
        <ModalTrigger type="publishing" {slug}>Подать заявку</ModalTrigger>
      </div>
    {/each}
  </div>
</div>
