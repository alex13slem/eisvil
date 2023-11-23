<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import FormField from "./FormField.svelte";
  import FormSelect from "./FormSelect.svelte";
  import Icon from "@iconify/svelte";

  export let games: CollectionEntry<"games">[];

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
</script>

<div class="root">
  <fieldset>
    <FormField placeholder="Поиск по названию" size="sm" variant="dark">
      <Icon icon="bi:search" slot="left" />
    </FormField>

    <FormSelect size="sm" variant="dark" placeholder="Жанр" options={genres}>
      <Icon icon="bi:filter-left" slot="left" />
    </FormSelect>

    <FormSelect
      size="sm"
      variant="dark"
      placeholder="Платформа"
      options={platforms}
    >
      <Icon icon="bi:filter-left" slot="left" />
    </FormSelect>
  </fieldset>
</div>

<style lang="scss">
  .root {
    height: 800px;
  }
  fieldset {
    all: unset;
    box-sizing: border-box;
    display: flex;
    gap: 10px;
  }
</style>
