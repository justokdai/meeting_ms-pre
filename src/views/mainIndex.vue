<template>
    <div class="wrap">
        <iframe ref="iframe" :src="htmlSrc" width="100%" height="100%" frameborder="0">
        </iframe>
    </div>
</template>

<script setup lang="ts">
// 指定要加载的 HTML 文件路径（相对于 public 目录）
const htmlSrc = 'static/index/test.html'
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 2200px;
}
</style>