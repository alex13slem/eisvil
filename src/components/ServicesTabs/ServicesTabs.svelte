<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { TabGroup } from "@rgossiaux/svelte-headlessui";
  import css from "./services-tabs.module.scss";
  import List from "./List.svelte";
  import Panels from "./Panels.svelte";

  export let data: CollectionEntry<"services">[];
</script>

<TabGroup class={css.root} vertical>
  <List {data} />
  <Panels {data} />
</TabGroup>
