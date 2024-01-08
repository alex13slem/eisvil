<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import FormField from "./FormField.svelte";
  import FormSelect from "./FormSelect.svelte";
  import Icon from "@iconify/svelte";
  import GameCard from "./GameCard.svelte";
  import { getMapKey } from "@/utils/helpers";
  import { blur } from "svelte/transition";
  import { paginate, PaginationNav } from "svelte-paginate";
  import {
    games,
    genresOptions,
    genresMap,
    platformsOptions,
  } from "@/store/games";

  const pageSizeVariant = [16, 24, 40];
  let filteredItems = [...games];

  let searchValue = "";
  let genreValue = "";
  let platformValue = "";

  let currentPage = 1;
  let pageSize = pageSizeVariant[0];
  $: minVisibleGame = 1 + pageSize * (currentPage - 1);
  $: maxVisibleGame = pageSize + pageSize * (currentPage - 1);

  $: filteredItems = games
    // Фильтр по названию
    .filter(({ data }) =>
      data.title.toLowerCase().includes(searchValue.trim().toLowerCase()),
    )
    // Фильтр по жанру
    .filter(({ data }) => {
      const genre = getMapKey(genresMap, genreValue);
      if (!genre) return true;
      return data.genre === genre;
    })
    // Фильтр по платформам
    .filter(({ data }) => {
      if (!platformValue) return true;
      return data.platforms?.find(
        (platform) => platform.title === platformValue && platform.href,
      );
    });

  $: paginatedItems = paginate<CollectionEntry<"games">>({
    items: filteredItems,
    pageSize,
    currentPage,
  });

  $: if (currentPage !== 1 && (searchValue || genreValue || platformValue)) {
    currentPage = 1;
  }
</script>

<div class="root">
  <fieldset>
    <FormField
      placeholder="Поиск по названию"
      size="sm"
      variant="dark"
      bind:value={searchValue}
    >
      <Icon icon="bi:search" slot="left" />
    </FormField>

    <FormSelect
      size="sm"
      variant="dark"
      placeholder="Жанр"
      options={genresOptions}
      bind:value={genreValue}
    >
      <button
        class="select-icon-btn"
        slot="left"
        on:click={(e) => {
          if (!genreValue) return;
          e.stopPropagation();
          genreValue = "";
        }}
      >
        {#if genreValue}
          <Icon icon="bi:x" />
        {:else}
          <Icon icon="bi:filter-left" />
        {/if}
      </button>
    </FormSelect>

    <FormSelect
      size="sm"
      variant="dark"
      placeholder="Платформа"
      options={platformsOptions}
      bind:value={platformValue}
    >
      <button
        class="select-icon-btn"
        slot="left"
        on:click={(e) => {
          if (!platformValue) return;
          e.stopPropagation();
          platformValue = "";
        }}
      >
        {#if platformValue}
          <Icon icon="bi:x" />
        {:else}
          <Icon icon="bi:filter-left" />
        {/if}
      </button>
    </FormSelect>
  </fieldset>

  <div class="catalog">
    {#each paginatedItems as game (game.id)}
      <GameCard {game} />
    {:else}
      <div in:blur class="placeholder">
        <p>Игр нет</p>
      </div>
    {/each}
  </div>
  <div class="nav-panel">
    <PaginationNav
      totalItems={filteredItems.length}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={(e) => {
        currentPage = e.detail.page;
        window.location.hash = "";
        window.location.hash = "games-catalog";
      }}
    >
      <span slot="prev"><Icon icon="codicon:triangle-left" /></span>
      <span slot="next"><Icon icon="codicon:triangle-right" /></span>
    </PaginationNav>

    <div class="display-now">
      Показано
      {minVisibleGame}-{maxVisibleGame > filteredItems.length
        ? filteredItems.length
        : maxVisibleGame}
      из
      {filteredItems.length}
    </div>

    <div class="page-size">
      <span>Показывать по:</span>
      {#each pageSizeVariant as num}
        <span
          role="presentation"
          class="option number"
          class:active={num === pageSize}
          on:click={() => {
            if (num === pageSize) return;
            pageSize = num;
            currentPage = 1;
            window.location.hash = "";
            window.location.hash = "games-catalog";
          }}><span>{num}</span></span
        >
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  fieldset {
    all: unset;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
  }

  .catalog {
    position: relative;
    z-index: 0;
    min-height: 345px;
    padding-block: 30px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    transition: var(--trans-default);
    transition-property: height;

    .placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 4rem;
        align-items: center;
        text-transform: uppercase;
        font-weight: 900;
      }
    }
  }

  .nav-panel {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: rgb(var(--c-card));
  }

  // Элемент навигационного контейнера.
  .nav-panel :global(.pagination-nav) {
    flex: 1 0 auto;
    display: flex;
    gap: 10px;
  }

  // Все опции навигации (включая многоточие, кнопки next и prev).
  .nav-panel :global(.option) {
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: var(--trans-default);
    transition-property: background-color, border-radius;

    &:not(.active, .disabled) {
      cursor: pointer;
    }
    &:is(.ellipsis, .active) {
      cursor: default;
    }
  }

  // Опция многоточия.
  // .nav-panel :global(.option.ellipsis) {
  // }

  // Номер текущей активной страницы.
  .nav-panel :global(.option.active) {
    font-weight: 900;
    background-color: rgb(var(--c-white), 30%);
    border-radius: 5px;
    color: rgb(var(--c-card));
  }

  // Только номера страниц.
  .nav-panel :global(.option.number) {
    &:not(.active):hover {
      background-color: rgb(var(--c-white), 10%);
      border-radius: 0.5em;
    }
  }

  // Предыдущая опция.
  // .nav-panel :global(.option.prev) {
  // }

  // Следующий вариант.
  // .nav-panel :global(.option.next) {
  // }

  // Настраивает параметры prev и next, когда они отключены (когда вы находитесь на первой или последней странице).
  .nav-panel :global(.option.disabled) {
    color: rgb(var(--c-white), 30%);
    pointer-events: none;
  }

  .display-now {
    color: rgb(var(--c-white), 30%);
    font-weight: 300;
  }

  .page-size {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .select-icon-btn {
    height: 1.5em;
    width: 1.5em;

    :global(svg) {
      height: 100%;
      width: 100%;
    }
  }
</style>
