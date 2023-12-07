<script lang="ts">
  import { TabGroup } from "@rgossiaux/svelte-headlessui";
  import css from "./services-tabs.module.scss";
  import List from "./List.svelte";
  import Panels from "./Panels.svelte";
</script>

<TabGroup class={css.root} vertical>
  <List />
  <Panels />
</TabGroup>
