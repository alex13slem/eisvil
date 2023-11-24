<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import FormField from "./FormField.svelte";
  import FormSelect from "./FormSelect.svelte";
  import Icon from "@iconify/svelte";
  import GameCard from "./GameCard.svelte";
  import { getMapKey } from "../utils/helpers";
  import { blur } from "svelte/transition";

  export let games: CollectionEntry<"games">[];

  let visibleGames = [...games];
  let searchValue = "";
  let genreValue = "";
  let platformValue = "";

  const genresRus = {
    arcade: "Аркада",
    action: "Экшен",
    shooter: "Шутер",
  };
  const genresMap = new Map(Object.entries(genresRus));
  const genres = games
    .filter(
      ({ data: { genre } }, idx, self) =>
        idx === self.findIndex(({ data }) => data.genre === genre),
    )
    .map(({ data }) => ({
      slug: data.genre,
      value: genresMap.get(data.genre) || "Добавь перевод",
      disabled: false,
    }));

  const platforms = games
    .flatMap(({ data }) => data.platforms)
    .filter(
      (platform, idx, self) =>
        idx ===
        self.findIndex(
          (_platform) => platform?.slug === _platform?.slug && _platform?.href,
        ),
    )
    .map((platform) => ({
      slug: platform?.slug || "",
      value: platform?.title || "",
      disabled: false,
    }));

  $: visibleGames = games
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
      options={genres}
      bind:value={genreValue}
    >
      <Icon icon="bi:filter-left" slot="left" />
    </FormSelect>

    <FormSelect
      size="sm"
      variant="dark"
      placeholder="Платформа"
      options={platforms}
      bind:value={platformValue}
    >
      <Icon icon="bi:filter-left" slot="left" />
    </FormSelect>
  </fieldset>

  <div class="catalog">
    {#each visibleGames as game (game.id)}
      <GameCard {game} />
    {:else}
      <div in:blur class="placeholder">
        <p>Игр нет</p>
      </div>
    {/each}
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
</style>
