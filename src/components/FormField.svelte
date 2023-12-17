<script lang="ts">
  import { blur } from "svelte/transition";
  import BorderEdge from "./svg/BorderEdge.svelte";
  import { clickOutside } from "../utils/svelte/clickOutside";

  export let type: "text" | "email" | "password" = "text";
  export let placeholder: string | null = null;
  export let value: string | null = null;
  export let className: string = "";
  export let size: "md" | "sm" = "md";
  export let variant: "default" | "dark" = "default";
  export let error: string | null = null;
  let errorVisible = false;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
  let errorBtn: HTMLElement;
</script>

<div
  class="form-field {className} size-{size} v-{variant}"
  class:typing={!!value}
>
  <input
    on:input
    on:blur
    bind:value
    type="text"
    {placeholder}
    use:typeAction
    autocomplete="new-password"
    {...$$restProps}
  />
  {#if error && errorVisible}
    <p
      class="error-message"
      transition:blur={{ duration: 300 }}
      use:clickOutside={[errorBtn]}
      on:outclick={() => (errorVisible = false)}
    >
      {error}
    </p>
  {/if}
  <div class="bg">
    {#if error}
      <button
        class="error-btn"
        bind:this={errorBtn}
        on:click={() => {
          console.log(errorVisible);

          errorVisible = !errorVisible;
        }}
      />
    {/if}
    {#if variant === "dark"}
      <BorderEdge {size} pos={"lt"} />
      <BorderEdge {size} pos={"rb"} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../styles/mixins";

  .form-field {
    @include firm-arrows($color: var(--color-border));

    isolation: isolate;
    position: relative;
    height: 100%;

    padding-inline: 1.5em;
    display: flex;
    align-items: center;
    gap: 5px;

    color: rgb(var(--color-text));

    & > :global(svg.iconify) {
      z-index: 1;
      height: 100%;
      width: 1.25em;
      transition: color var(--trans-default);
    }

    &.v-default {
      --color-field: rgb(var(--color-white), 30%);
      --color-border: var(--color-field);
      color: rgb(var(--color-bg));

      // Hover and Focus state
      &:hover,
      &:not(.typing):has(input:focus-visible) {
        --color-field: rgb(var(--color-white), 45%);
        color: rgb(var(--color-bg));
      }

      // Typing state
      &.typing {
        --color-field: rgb(var(--color-accent), 65%);
        color: rgb(var(--color-text));
      }
    }

    &.v-dark {
      --color-field: rgb(var(--color-field_dark));
      --color-border: rgb(var(--color-field-border_dark));
      color: rgb(var(--color-field-border_dark));

      .bg {
        color: rgb(var(--color-field-border_dark));
        border: 1px solid rgb(var(--color-field-border_dark));
      }

      // Hover and Focus state
      &:hover,
      &:not(.typing):has(input:focus-visible) {
        --color-field: rgb(var(--color-white), 45%);
        color: rgb(var(--color-bg));
      }

      // Typing state
      &.typing {
        --color-field: rgb(var(--color-accent), 65%);
        color: rgb(var(--color-text));
      }
    }

    &.size-sm {
      .v-dark {
        min-width: var(--c-input-sm-width);
      }
      font-size: var(--c-input-sm-fsz);
      line-height: var(--c-input-sm-size);
    }

    &.size-md {
      .v-dark {
        min-width: var(--c-input-md-width);
      }
      font-size: var(--c-input-md-fsz);
      line-height: var(--c-input-md-size);
    }
  }

  .error {
    &-btn {
      position: absolute;
      inset: 0;
      left: auto;
      background-color: rgb(var(--color-accent));
      width: 1.25em;
      animation: pulsar-bg-c 1s ease infinite alternate;
    }
    &-message {
      z-index: 2;
      position: absolute;
      top: 0;
      right: 1.25em;
      padding-inline: 1.25em;
      background-color: rgb(var(--color-accent), 65%);
      color: rgb(var(--color-text));
    }
  }

  .bg {
    @include firm-clip();
    position: absolute;
    inset: 0;
    overflow: hidden;

    background-color: var(--color-field);
    transition: var(--trans-default);
    transition-property: color, background-color;
  }

  input {
    flex: 1 1 auto;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0;

    background-color: transparent;
    border: none;
    outline: none;
    color: currentColor;

    &::placeholder {
      color: currentColor;
      transition: color var(--trans-default);
    }
  }
</style>
