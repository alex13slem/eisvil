<script lang="ts">
  import BtnFirm from "@/components/BtnFirm.svelte";
  import { publishingModalForm, servicesModalForm } from "../store/modals";

  export let type: "services" | "publishing" | null = null;
  export let defaultValue: "store" | null = null;
  export let variant: "firm" | "transparent" | "contrast" = "firm";

  function handleClick() {
    if (type === "services") {
      servicesModalForm.set({
        isOpen: true,
        target: defaultValue && $servicesModalForm.target,
      });
    }
    if (type === "publishing") {
      publishingModalForm.set({
        isOpen: true,
        target: defaultValue && $publishingModalForm.target,
      });
    }
  }
</script>

<BtnFirm {variant} on:click={handleClick}><slot /></BtnFirm>
