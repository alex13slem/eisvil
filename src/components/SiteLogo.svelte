<script lang="ts">
  import SVGSiteLogo from "./svg/SVGSiteLogo.svelte";
</script>

<a href="/" class="site-logo"><SVGSiteLogo /></a>

<style>
  .site-logo {
    /* padding-inline: 1rem; */
    display: flex;
    align-items: center;
    color: rgb(var(--color-white));
    transition: filter var(--trans-default);
  }
  /* .site-logo:hover {
    filter: drop-shadow(0px 0px 0.5rem rgb(var(--color-accent)));
  } */
  .site-logo :global(.SVGSiteLogo) {
    height: 43px;
  }
</style>
