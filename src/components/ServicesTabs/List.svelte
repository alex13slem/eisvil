<script lang="ts">
  import { Tab, TabList } from "@rgossiaux/svelte-headlessui";
  import css from "./list.module.scss";
  import { cn } from "@/utils/helpers";
  import { services } from "../../store/services";
</script>

<TabList class={css.nav}>
  {#each services as { data: { title } }}
    <Tab
      class={({ selected }) => (selected ? cn(css.link, css.active) : css.link)}
      >{title}</Tab
    >
  {/each}
</TabList>
