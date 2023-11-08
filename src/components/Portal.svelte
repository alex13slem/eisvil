<script>
  let ref;
  $: ref && document.body.appendChild(ref);
</script>

<svelte:head>
  {#if ref}
    <style>
      :root {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<div class="portal" bind:this={ref}>
  <slot />
</div>
