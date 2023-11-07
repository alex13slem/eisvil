<script>
  export let onHeader = false;
  export let onMobMenu = false;
  import NavLink from "./NavLink.svelte";
</script>

<nav class="site-nav" class:onHeader class:onMobMenu {...$$restProps}>
  <NavLink>Наши игры</NavLink>
  <NavLink>Услуги</NavLink>
  <NavLink>Издательство</NavLink>
  <NavLink>Карьера</NavLink>
  <NavLink>Контакты</NavLink>
</nav>

<style>
  .site-nav {
    position: relative;
    display: flex;
  }
  .site-nav.onHeader {
    gap: 5px;
  }
  .site-nav.onMobMenu {
    flex-direction: column;
    align-items: end;
  }

  @media (orientation: portrait), (max-width: 1024px) {
    .site-nav.onHeader {
      display: none;
    }
  }
</style>
