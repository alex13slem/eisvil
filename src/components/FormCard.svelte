<script>
  import BtnFirm from "./BtnFirm.svelte";
  import Form from "./Form.svelte";
  import bgPreview from "@/img/hero.jpg";
  import { blogerFormSubmitted } from "../store/forms";

  let active = false;
  let submitted = false;

  blogerFormSubmitted.subscribe((val) => (submitted = val));
</script>

<div
  class="form-card"
  class:active
  class:submitted
  on:blur|capture={() => (active = false)}
  on:focus|capture={() => (active = true)}
  style="background-image: url({bgPreview.src});"
>
  <p class="description">
    <slot name="description" />
  </p>
  <div class="body">
    <div class="preview">
      <BtnFirm on:click={() => blogerFormSubmitted.set(false)}>
        {#if !submitted}
          Заполнить форму
        {:else}
          Отправить ещё раз
        {/if}
      </BtnFirm>
    </div>
    <Form />
  </div>
</div>

<style lang="scss">
  .form-card {
    overflow: hidden;
    position: relative;
    border: var(--border-card);
    background-position: center;
    background-size: cover;

    // Углы start
    --clip-lb: 120px;
    --clip-rt: 30px;
    clip-path: polygon(
      0 0,
      calc(100% - var(--clip-rt)) 0,
      100% var(--clip-rt),
      100% 100%,
      var(--clip-lb) 100%,
      0 calc(100% - var(--clip-lb))
    );

    &::after,
    &::before,
    .body::after {
      --size: calc(var(--clip-size) * 1.41);
      z-index: 1;
      content: "";
      position: absolute;
      inset: calc(var(--size) * -0.5);
      width: var(--size);
      aspect-ratio: 1 / 1;
      border-bottom: var(--border-card);
    }
    &::after,
    .body::after {
      --clip-size: var(--clip-rt);
      transform: rotate(45deg);
      bottom: auto;
      left: auto;
    }
    &::before {
      --clip-size: var(--clip-lb);
      transform: rotate(-135deg);
      top: auto;
      right: auto;
    }
    .body::after {
      background-color: rgb(var(--color-card));
      transition: border-color var(--trans-slow);
    }
    // Углы end

    // Фокус start
    &:not(.submitted):hover,
    &:not(.submitted).active {
      .body {
        background-color: rgb(var(--color-card), 90%);
        &::after {
          border-color: transparent;
        }
      }

      .preview {
        border-color: transparent;
        :global(.btn-firm) {
          opacity: 0;
        }
      }

      :global(form) {
        opacity: 1;
      }
    }
    // Фокус end

    &.submitted {
      :global(form) {
        pointer-events: none;
      }
    }
  }

  .description {
    background-color: rgb(var(--color-card), 90%);
    padding: 2rem;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  .description :global(span) {
    color: rgb(var(--color-accent));
  }

  .body {
    position: relative;
    background-color: rgb(var(--color-card), 50%);

    transition: background-color var(--trans-slow);
  }

  .preview {
    opacity: 1;
    position: absolute;
    inset: 0;
    border-top: var(--border-card);

    display: flex;
    justify-content: center;
    align-items: center;

    transition: border-color var(--trans-slow);

    // :not(.submitted) & {
    //   pointer-events: none;
    // }
    // :global(.btn-firm) {
    //   transition: opacity var(--trans-slow);
    // }
    /* display: none; */
  }

  .form-card :global(form) {
    position: relative;
    opacity: 0;

    transition: opacity var(--trans-slow);
  }
</style>
