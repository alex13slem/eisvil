<script lang="ts">
  export let onHeader = false;
  export let onMobMenu = false;
  export let url: URL;
  import NavLink from "./NavLink.svelte";
</script>

<nav class="site-nav" class:onHeader class:onMobMenu {...$$restProps}>
  <NavLink
    {onHeader}
    {onMobMenu}
    active={url.pathname.includes("/games")}
    href="/games">Наши игры</NavLink
  >
  <NavLink
    {onHeader}
    {onMobMenu}
    active={url.pathname.includes("/services")}
    href="/services/2d-graphics">Услуги</NavLink
  >
  <NavLink active={url.pathname.includes("asd")} {onHeader} {onMobMenu}
    >Издательство</NavLink
  >
  <NavLink active={url.pathname.includes("asd")} {onHeader} {onMobMenu}
    >Карьера</NavLink
  >
  <NavLink active={url.pathname.includes("asd")} {onHeader} {onMobMenu}
    >Контакты</NavLink
  >
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
    align-items: flex-end;
  }

  @media (orientation: portrait), (max-width: 1024px) {
    .site-nav.onHeader {
      display: none;
    }
  }
</style>
