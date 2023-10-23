<script lang="ts">
</script>

<div class="swiper swiper_main" {...$$restProps}>
  <div class="swiper-wrapper">
    <div class="swiper-slide" />
  </div>
  <div class="swiper-pagination">
    <span><slot name="pg-item" /></span>
  </div>
  <div class="swiper-button-prev">
    <slot name="btn-item" />
  </div>
  <div class="swiper-button-next">
    <slot name="btn-item" />
  </div>
</div>

<style></style>
