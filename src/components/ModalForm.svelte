<script>
  import BtnFirm from "./BtnFirm.svelte";
  import Modal from "./Modal.svelte";

  let isOpen = false;
</script>

<BtnFirm on:click={() => (isOpen = true)}>Создать новый мир</BtnFirm>

<Modal title="Модальное окно" bind:isOpen>
  asd
  <svelte:fragment slot="footer">
    <BtnFirm variant="contrast">Отправить</BtnFirm>
  </svelte:fragment>
</Modal>
