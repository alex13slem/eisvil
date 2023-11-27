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
      {#if variant === "dark" && size === "sm"}
        <svg
          width="231"
          height="35"
          viewBox="0 0 231 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="border"
        >
          <path
            id="Vector"
            d="M204.037 21.694H203.825L203.678 21.8466L191.452 34.5H0.5V16.4321L16.834 0.5H230.5V18.5905L226.968 21.694H204.037Z"
            stroke="#8C8C8C"
            stroke-miterlimit="10"
          />
        </svg>
      {/if}
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
      --clip-size: 25px;
      --firm-arrows-size: 9px;

      :global(.box) {
        min-width: 270px;
      }

      :global(.selected-option) {
        line-height: 3.375rem;
      }
      :global(.options-list) {
        top: calc(100% - var(--clip-size) + 7px);
        &::after {
          clip-path: polygon(
            calc(100% - 54px) 20px,
            calc(100% - 34px) 0,
            100% 0,
            100% 100%,
            0 100%,
            0 20px
          );
        }
      }
      .selected-option-bg {
        clip-path: polygon(
          25px 0%,
          100% 0,
          100% calc(100% - 25px - 0px),
          calc(100% - 5px) calc(100% - 20px),
          calc(100% - 40px) calc(100% - 20px),
          calc(100% - 60px) 100%,
          0 100%,
          0 25px
        );
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
        width: 231px;
      }

      :global(.selected-option) {
        line-height: 35px;
      }

      :global(.options-list) {
        top: calc(100% - var(--clip-size) + 6px);
        &::after {
          clip-path: polygon(
            calc(100% - 35px) 13px,
            calc(100% - 22px) 0,
            100% 0,
            100% 100%,
            0 100%,
            0 13px
          );
        }
      }

      .selected-option-arrow {
        right: 6px;
        width: 18px;
        height: 9px;
      }

      .selected-option-bg {
        clip-path: polygon(
          16px 0%,
          100% 0,
          100% calc(100% - 16px - 0px),
          calc(100% - 4px) calc(100% - 13px),
          calc(100% - 27px) calc(100% - 13px),
          calc(100% - 40px) 100%,
          0 100%,
          0 16px
        );
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

      .border {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
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
      padding-inline: var(--clip-size);

      display: flex;
      gap: 5px;
      align-items: center;

      background-color: transparent;
      border: none;
      text-align: left;

      &:is(.open) {
        &::after {
          opacity: 0;
        }
        :global(.selected-option-arrow) {
          transform: translateY(calc(var(--lh) * var(--curr-idx)))
            rotateX(180deg);
        }
      }

      &:is(.active) {
        font-weight: 600;
      }

      &:is(.open):not(.active) {
        :global(.selected-option-arrow) {
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
      width: calc(100% - var(--clip-size) / 5);
      top: calc(100% - var(--clip-size) + 4px);
      left: 0;

      padding-inline: 2rem;
      padding-top: calc(0.5rem + var(--clip-size));
      padding-bottom: 0.5rem;

      &::after {
        z-index: -1;
        position: absolute;
        inset: 0;
        content: "";
      }
    }

    :global(.option) {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

      line-height: 3;

      transition: var(--trans-default);
      transition-property: color;

      &::before {
        position: absolute;
        content: "";
        inset: 0;
        left: -20px;
        opacity: 0;
        width: calc(100% + 2rem + 25px);

        transition: var(--trans-default);
        transition-property: opacity;
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

    transition: var(--trans-default);
    transition-property: border-color transform;
  }
</style>
