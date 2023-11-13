<script lang="ts">
  import BtnFirm from "@/components/BtnFirm.svelte";
  import { publishingModalForm, servicesModalForm } from "../store/modals";

  export let type: "services" | "publishing" | null = null;
  export let variant: "firm" | "transparent" | "contrast" = "firm";

  function handleClick() {
    if (type === "services") {
      servicesModalForm.set({ isOpen: true });
    }
    if (type === "publishing") {
      publishingModalForm.set({ isOpen: true });
    }
  }
</script>

<BtnFirm {variant} on:click={handleClick}><slot /></BtnFirm>
