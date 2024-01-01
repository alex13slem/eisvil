<script lang="ts">
  import BtnFirm from "@/components/BtnFirm.svelte";
  import { pubModalIsOpen, servModalIsOpen } from "../store/modals";
  import { pubTargetSlug, servTargetSlug } from "../store/forms";

  export let type: "services" | "publishing" | null = null;
  export let slug: string | null = null;
  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let flexPosition: "start" | "end" | "center" | null = null;

  function handleClick() {
    if (type === "services") {
      servModalIsOpen.set(true);
      servTargetSlug.set(slug);
    }
    if (type === "publishing") {
      pubModalIsOpen.set(true);
      pubTargetSlug.set(slug);
    }
  }
</script>

<BtnFirm {variant} {flexPosition} on:click={handleClick}><slot /></BtnFirm>
