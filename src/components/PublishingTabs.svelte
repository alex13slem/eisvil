<script lang="ts">
  import { parse } from "marked";
  import { cn } from "@/utils/helpers";
  import { activeIdx, publishings } from "../store/publishing";
  import ModalTrigger from "./ModalTrigger.svelte";
  import Icon from "@iconify/svelte";

  let currIdx: number;
  activeIdx.subscribe((idx) => (currIdx = idx));
</script>

<div class="root">
  <nav class="nav">
    {#each publishings as { slug }, idx}
      <button class={cn("link", idx === currIdx && "active")}>
        {#if slug.split("/")[1] === "computer"}
          <Icon icon="bx:desktop" width="36" height="36" />
        {/if}
        {#if slug.split("/")[1] === "game-consoles"}
          <Icon icon="bx:joystick" width="36" height="36" />
        {/if}
        {#if slug.split("/")[1] === "mobile"}
          <Icon icon="bx:mobile-alt" width="36" height="36" />
        {/if}
      </button>
    {/each}
  </nav>

  {#each publishings as { body, slug }, idx}
    {#if idx === currIdx}
      <div class="preview">
        <div class="body prose">{@html parse(body)}</div>
        <ModalTrigger type="publishing" flexPosition="start" {slug}>
          Подать заявку
        </ModalTrigger>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .root {
    flex: 0 0 360px;

    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .nav {
    display: flex;
    max-width: 330px;
  }
  .link {
    flex: 1 1 auto;
    min-height: 40px;
    padding: 0;
    padding-bottom: 13px;
    cursor: default;

    display: flex;
    justify-content: center;

    font-size: 12px;
    font-weight: 700;
    color: rgb(var(--color-text), 30%);

    background-color: transparent;
    border: 0;
    border-bottom: 4px solid rgb(var(--color-text), 30%);

    transition: var(--trans-default);
    transition-property: color, font-size;
    &.active {
      font-size: 20px;
      font-weight: 600;
      color: rgb(var(--color-accent));

      border-color: rgb(var(--color-accent));
    }
  }

  .preview {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .body {
    --lines: 6;
    flex: 1 1 auto;
    height: calc(var(--lines) * 1.125em * 1.25);
    overflow: hidden;
  }
</style>
