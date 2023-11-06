<script lang="ts">
  import { parse } from "marked";
  import BtnFirm from "../BtnFirm.svelte";
  import { cn } from "@/utils/helpers";
  import css from "./style.module.scss";
  import { pubTabIdx as currIdx, publishingData } from "./store";
</script>

<div class={css.root}>
  <nav class={css.nav}>
    {#each $publishingData as { data: { title } }, idx}
      <button class={cn(css.link, idx === $currIdx && css.active)}>
        {title}
      </button>
    {:else}
      <h1>oops</h1>
    {/each}
  </nav>

  <div class={css["preview-wrap"]}>
    {#each $publishingData as { body, data: { link } }, idx}
      <div class={cn(css.preview, idx === $currIdx && css.active)}>
        <div class={css.body}>{@html parse(body)}</div>
        <BtnFirm><a href={link}>Подать заявку</a></BtnFirm>
      </div>
    {/each}
  </div>
</div>
