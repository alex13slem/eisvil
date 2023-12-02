<script lang="ts">
  export let langs: {
    lang: string;
    text: boolean;
    slug: string;
    voice: boolean;
  }[];
</script>

<div class="root">{langs.map((lang) => lang.lang)}</div>

<style lang="scss"></style>
