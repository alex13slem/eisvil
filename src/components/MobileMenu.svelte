<script>
  import { isOpen } from "@/store/site-menu";
  import SiteNav from "./SiteNav.svelte";
  import { fade } from "svelte/transition";
</script>

{#if $isOpen}
  <div class="m-menu" transition:fade>
    <SiteNav onMobMenu />
  </div>
{/if}

<style>
  .m-menu {
    position: fixed;
    overflow-y: scroll;
    margin-top: 60px;
    inset: 0;
    min-height: calc(100dvh - 60px);
    background-color: rgb(var(--color-bg), 90%);
  }
  @media (min-width: 1024.1px) {
    .m-menu {
      display: none;
    }
  }
</style>
