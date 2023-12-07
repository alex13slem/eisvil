import { getCollection } from "astro:content";
import { genresRus } from "../lang";

export const games = await getCollection("games");

export const topGames = games.filter(({ data }) => data.favorites === "top");
export const bestGames = games.filter(({ data }) => data.favorites === "best");

export const genresMap = new Map(Object.entries(genresRus));
export const genresOptions = games
  .filter(
    ({ data: { genre } }, idx, self) =>
      idx === self.findIndex(({ data }) => data.genre === genre),
  )
  .map(({ data }) => ({
    slug: data.genre,
    value: genresMap.get(data.genre) || "Добавь перевод",
    disabled: false,
  }));

export const platformsOptions = games
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
