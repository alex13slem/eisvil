<script lang="ts">
  export let checked: boolean | null = null;
</script>

<label class="checkbox">
  <input type="checkbox" on:input bind:checked {...$$restProps} />
  <span />
</label>

<style lang="scss">
  .checkbox {
    width: 17px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: 1px solid rgb(var(--color-white), 50%);
    cursor: pointer;
  }

  span {
    width: 11px;
    height: 10px;
    transition: background-color var(--trans-default);
  }

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
  input:hover ~ span {
    background-color: rgb(var(--color-white), 30%);
  }
  input:checked ~ span {
    background-color: rgb(var(--color-accent));
  }
</style>
