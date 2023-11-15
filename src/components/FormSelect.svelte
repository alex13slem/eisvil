<script lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@rgossiaux/svelte-headlessui";
  import { fly } from "svelte/transition";
  import { cn } from "../utils/helpers";

  let targetIdx: number;

  export let value: string | null = null;
  export let options: { slug: string; value: string; disabled: boolean }[];
  export let placeholder: string = "";

  $: options.map((option, idx) => {
    if (option.value === value) targetIdx = idx + 1;
  });
</script>

<div class="wrap">
  <Listbox class="box" bind:value let:open>
    <ListboxButton
      class={cn("selected-option", open && "open", value && "active")}
      style="--curr-idx: {targetIdx || 0}"
    >
      {#if open && !value}
        ...
      {:else}
        {value || placeholder}
      {/if}
      <span class="selected-option-bg" />
      <button class="selected-option-arrow" />
    </ListboxButton>
    {#if open}
      <div transition:fly>
        <ListboxOptions class="options-list" static>
          {#each options as { slug: selfSlug, value: selfValue, disabled }, idx (selfSlug)}
            <ListboxOption
              class={cn("option", selfValue === value && "active")}
              value={selfValue}
              {disabled}
              on:click={() => {
                targetIdx = idx + 1;
              }}
            >
              <span>{selfValue}</span>
            </ListboxOption>
          {/each}
        </ListboxOptions>
      </div>
    {/if}
  </Listbox>
</div>

<style lang="scss">
  @import "../styles/mixins";
  .wrap {
    --field-color: rgb(var(--color-white), 30%);
    --arrow-color: rgb(var(--color-white), 25%);
    display: contents;

    :global(.box) {
      z-index: 1;
      position: relative;
    }
    :global(.selected-option) {
      padding: 0;
      background-color: transparent;
      border: none;
      text-align: left;

      z-index: 2;
      width: 100%;
      position: relative;
      padding-inline: 30px;
      line-height: 3.375rem;
      font-size: 12px;
      color: rgb(var(--color-bg));

      @include firm-arrows($color: var(--field-color));

      &:hover,
      &:is(.open) {
        --field-color: rgb(var(--color-white), 45%);
        --arrow-color: rgb(var(--color-accent), 70%);
      }

      &:is(.open) {
        --arrow-color: rgb(var(--color-white));
        &::after {
          opacity: 0;
        }
        :global(.selected-option-arrow) {
          transform: scale(-1)
            translateY(calc(var(--offset) - var(--lh) * var(--curr-idx)));
        }
      }

      &:is(.active) {
        --field-color: rgb(var(--color-accent), 65%);
        font-weight: 600;
        color: rgb(var(--color-text));
      }

      &:is(.open):not(.active) {
        :global(.selected-option-arrow) {
          animation: pulsar-bt-c 0.6s ease infinite alternate;
          transform: scale(-1) translate(7px, 10px);
        }
      }
    }

    :global(.options-list) {
      all: unset;
      box-sizing: border-box;
      z-index: 1;
      display: flex;
      flex-direction: column;

      position: absolute;
      width: calc(100% - 5px);
      top: calc(100% - 17px);
      left: 0;

      padding-inline: 2rem;
      padding-top: calc(0.5rem + 23px);
      padding-bottom: 0.5rem;

      &::after {
        z-index: -1;
        position: absolute;
        inset: 0;
        content: "";
        clip-path: polygon(
          calc(100% - 54px) 20px,
          calc(100% - 34px) 0,
          100% 0,
          100% 100%,
          0 100%,
          0 20px
        );
        background-color: rgb(var(--color-grey));
      }
    }

    :global(.option) {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

      font-size: 12px;
      color: rgb(var(--color-bg));
      line-height: 3;

      transition-property: color;
      transition: var(--trans-default);

      &::before {
        position: absolute;
        content: "";
        inset: 0;
        left: -20px;
        opacity: 0;
        width: calc(100% + 2rem + 25px);

        background-color: rgb(var(--color-accent));
        transition-property: opacity;
        transition: var(--trans-default);
      }

      &:hover {
        color: rgb(var(--color-accent));
      }

      &:is(.active) {
        color: rgb(var(--color-white));
        &::before {
          opacity: 1;
        }
      }
    }

    :global(.option span) {
      position: relative;
    }
  }

  .selected-option-bg {
    position: absolute;
    z-index: -1;
    inset: 0;
    clip-path: polygon(
      20px 0%,
      100% 0,
      100% calc(100% - 25px),
      calc(100% - 5px) calc(100% - 20px),
      calc(100% - 40px) calc(100% - 20px),
      calc(100% - 60px) 100%,
      0 100%,
      0 20px
    );
    background-color: var(--field-color);
    transition: background-color var(--trans-default);
  }

  .selected-option-arrow {
    padding: 0;
    border: none;
    background-color: transparent;

    position: absolute;
    --lh: 36px;
    --offset: 10px;
    right: 9px;
    bottom: -13px;
    border: 14px solid transparent;
    border-top-color: var(--arrow-color);
    transition-property: border-color transform;
    transition: var(--trans-default);
  }
</style>
