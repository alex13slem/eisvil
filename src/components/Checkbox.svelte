<script lang="ts">
  import { cn } from "../utils/helpers";

  export let checked: boolean | null = null;
  export let className: string = "";
</script>

<label class={cn("checkbox", className)}>
  <input type="checkbox" on:input on:blur bind:checked {...$$restProps} />
  <span />
</label>

<style lang="scss">
  .checkbox {
    flex: 0 0 auto;
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
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 1px;
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
  input[invalid="true"] ~ span {
    animation: pulsar-bg-c 0.6s ease infinite alternate;
  }
</style>
