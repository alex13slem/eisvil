<script lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@rgossiaux/svelte-headlessui";
  import { fade, fly } from "svelte/transition";
  import { cn } from "../utils/helpers";

  let targetIdx: number;

  export let value: string | null = null;
  export let options: { slug: string; value: string; disabled: boolean }[];
  export let placeholder: string = "";
  export let size: "md" | "sm" = "md";
  export let variant: "default" | "dark" = "default";

  $: options.map((option, idx) => {
    if (option.value === value) targetIdx = idx + 1;
  });
</script>

<div class="wrap size-{size} v-{variant}">
  <Listbox class="box" bind:value let:open>
    <ListboxButton
      class={cn("selected-option", open && "open", value && "active")}
      style="--curr-idx: {targetIdx || 0}"
    >
      <slot name="left" />
      {#if open && !value}
        ...
      {:else}
        {value || placeholder}
      {/if}
      <span class="selected-option-bg">
        {#if variant === "dark"}
          <span class="clip-border clip-border_1" />
          <span class="clip-border clip-border_2" />
          <span class="clip-border clip-border_3" />
          <span class="clip-border clip-border_4" />
        {/if}
      </span>
      <button class="selected-option-arrow" />
    </ListboxButton>
    {#if open}
      <div transition:fade>
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
    font-size: 12px;
    display: contents;

    &.size-md {
      --clip-size: 20px;
      --firm-arrows-size: 9px;

      :global(.box) {
        min-width: 270px;
      }

      :global(.selected-option) {
        line-height: 3.375rem;
      }

      .selected-option-arrow {
        right: 9px;
        width: 28px;
        height: 14px;
      }
    }

    &.size-sm {
      --clip-size: 16px;
      --firm-arrows-size: 6px;

      :global(.box) {
        min-width: 230px;
      }

      :global(.selected-option) {
        line-height: 35px;
      }

      .selected-option-arrow {
        right: 8px;
        width: 20px;
        height: 10px;
      }
    }

    &.v-default {
      --field-color: rgb(var(--color-white), 30%);
      --arrow-color: rgb(var(--color-white), 25%);
      --firm-arrows-color: var(--field-color);

      :global(.selected-option) {
        color: rgb(var(--color-bg));

        &:hover,
        &:is(.open) {
          --field-color: rgb(var(--color-white), 45%);
          --arrow-color: rgb(var(--color-accent), 70%);
        }
        &:is(.open) {
          --arrow-color: rgb(var(--color-white));
        }
        &:is(.active) {
          --field-color: rgb(var(--color-accent), 65%);
          color: rgb(var(--color-text));
        }
      }

      :global(.options-list) {
        &::after {
          background-color: rgb(var(--color-grey));
        }
      }

      :global(.option) {
        color: rgb(var(--color-bg));

        &::before {
          background-color: rgb(var(--color-accent));
        }

        &:hover {
          color: rgb(var(--color-accent));
        }

        &:is(.active) {
          color: rgb(var(--color-white));
        }
      }
    }

    &.v-dark {
      --field-color: rgb(var(--color-card));
      --arrow-color: rgb(var(--border-card-color));
      --border-color: rgb(var(--border-card-color));
      --firm-arrows-color: var(--border-color);

      :global(.selected-option) {
        color: rgb(var(--border-card-color));
        transition: color var(--trans-default);

        &:hover,
        &:is(.open) {
          color: rgb(var(--color-bg));
          --field-color: rgb(var(--color-white), 45%);
          --arrow-color: rgb(var(--color-accent), 70%);
        }
        &:is(.open) {
          --arrow-color: rgb(var(--color-white));
        }
        &:is(.active) {
          --field-color: rgb(var(--color-accent), 65%);
          color: rgb(var(--color-text));
        }
      }

      .selected-option-bg {
        border: 1px solid var(--border-color);
        .clip-border {
          width: 1px;
          position: absolute;
          background-color: var(--border-color);

          &_1 {
            height: calc(var(--clip-size) * 1.41);
            top: -1px;
            left: calc(var(--clip-size) - 1px);
            transform-origin: top;
            transform: rotate(45deg);
          }

          &_2 {
            height: calc(var(--clip-size) / 4 * 1.41);
            right: -1px;
            bottom: calc(var(--clip-size) - 2px);
            transform: rotate(45deg);
            transform-origin: top;
          }

          &_3 {
            height: calc(var(--clip-size) * 1.5 + var(--clip-size) / 4);
            right: calc(var(--clip-size) / 4 - 1px);
            bottom: calc(var(--clip-size) - 1px);
            transform: rotate(-90deg);
            transform-origin: bottom;
          }

          &_4 {
            height: calc(var(--clip-size) * 1.41);
            bottom: -1px;
            right: calc(var(--clip-size) * 3 - 1px);
            transform-origin: bottom;
            transform: rotate(45deg);
          }
        }
      }

      :global(.options-list) {
        &::after {
          background-color: rgb(var(--color-grey));
        }
      }

      :global(.option) {
        color: rgb(var(--color-bg));

        &::before {
          background-color: rgb(var(--color-accent));
        }

        &:hover {
          color: rgb(var(--color-accent));
        }

        &:is(.active) {
          color: rgb(var(--color-white));
        }
      }
    }

    :global(.box) {
      z-index: 1;
      position: relative;
      height: 100%;
    }

    :global(.selected-option) {
      @include firm-arrows(
        $color: var(--firm-arrows-color),
        $size: var(--firm-arrows-size)
      );

      z-index: 2;
      width: 100%;
      position: relative;

      padding: 0;
      padding-inline: calc(var(--clip-size) + calc(var(--clip-size) / 2));
      &:has(svg) {
        padding-inline: var(--clip-size);
      }

      display: flex;
      gap: 5px;
      align-items: center;

      background-color: transparent;
      border: none;
      text-align: left;

      :global(svg) {
        height: 100%;
        width: calc(var(--clip-size) * 1.5);
      }

      &:is(.open) {
        &::after {
          opacity: 0;
        }
        :global(.selected-option-arrow) {
          transform: scale(-1)
            translateY(calc(var(--lh) * var(--curr-idx) * -1));
        }
      }

      &:is(.active) {
        font-weight: 600;
      }

      &:is(.open):not(.active) {
        :global(.selected-option-arrow) {
          // animation: pulsar-bg-c 0.6s ease infinite alternate;
          transform: scale(0);
          opacity: 0;
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
      width: calc(100% - var(--clip-size) / 4);
      top: calc(100% - var(--clip-size) + 3px);
      left: 0;

      padding-inline: 2rem;
      padding-top: calc(0.5rem + var(--clip-size));
      padding-bottom: 0.5rem;

      &::after {
        z-index: -1;
        position: absolute;
        inset: 0;
        content: "";
        clip-path: polygon(
          calc(100% - var(--clip-size) * 3 + var(--clip-size) / 4 + 1px)
            var(--clip-size),
          calc(100% - var(--clip-size) * 2 + var(--clip-size) / 4 + 1px) 0,
          100% 0,
          100% 100%,
          0 100%,
          0 var(--clip-size)
        );
      }
    }

    :global(.option) {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

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

        transition-property: opacity;
        transition: var(--trans-default);
      }

      &:is(.active) {
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

    background-color: var(--field-color);
    clip-path: polygon(
      var(--clip-size) 0%,
      100% 0,
      100% calc(100% - var(--clip-size) - calc(var(--clip-size) / 4)),
      calc(100% - calc(var(--clip-size) / 4)) calc(100% - var(--clip-size)),
      calc(100% - calc(var(--clip-size) * 2)) calc(100% - var(--clip-size)),
      calc(100% - calc(var(--clip-size) * 3)) 100%,
      0 100%,
      0 var(--clip-size)
    );
    transition: background-color var(--trans-default);
  }

  .selected-option-arrow {
    --lh: 36px;

    padding: 0;
    border: none;
    background-color: var(--arrow-color);

    bottom: 0;
    position: absolute;
    clip-path: polygon(100% 0, 0 0, 50% 100%);

    transition-property: border-color transform;
    transition: var(--trans-default);
  }
</style>
