<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { register, type SwiperContainer } from "swiper/element";

  export let games: CollectionEntry<"games">[];

  register();

  let swiperEl: SwiperContainer;
</script>

<div class="wrap">
  <swiper-container
    bind:this={swiperEl}
    class:load={!swiperEl}
    pagination={{
      clickable: true,
      el: ".pagination",
      bulletClass: "bullet",
      bulletActiveClass: "active",
    }}
  >
    {#each games as { data: { title, platforms } }}
      <swiper-slide>
        <div class="slide-wrap">
          <article>
            <h3>{title}</h3>
            <div class="links">
              {#each platforms as { type: value }}{/each}
            </div>
          </article>
        </div>
      </swiper-slide>
    {/each}
  </swiper-container>
  <div class="pagination" />
</div>

<style>
  .pagination {
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination :global(.bullet) {
    font-size: 10px;
    height: 1em;
    width: 1em;
    margin: 0.65em;
    border: 1px solid rgb(var(--color-accent));
    cursor: pointer;
    transition-property: transform, background-color;
    transition: 0.3s ease-in-out;
  }
  .pagination :global(.bullet.active) {
    transform: rotate(45deg) scale(150%);
    background-color: rgb(var(--color-accent));
  }
</style>
