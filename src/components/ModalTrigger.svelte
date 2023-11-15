<script lang="ts">
  import BtnFirm from "@/components/BtnFirm.svelte";
  import { publishingModalForm, servicesModalForm } from "../store/modals";

  export let type: "services" | "publishing" | null = null;
  export let slug: string | null = null;
  export let variant: "firm" | "transparent" | "contrast" = "firm";
  export let flexPosition: "start" | "end" | "center" | null = null;

  function handleClick() {
    if (type === "services") {
      servicesModalForm.set({
        isOpen: true,
        slug,
      });
    }
    if (type === "publishing") {
      publishingModalForm.set({
        isOpen: true,
        slug,
      });
    }
  }
</script>

<BtnFirm {variant} {flexPosition} on:click={handleClick}><slot /></BtnFirm>
