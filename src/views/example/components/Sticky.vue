<template>
    <div class="sticky">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.sticky {
    position: sticky;
    top: 0;
    left: 0;
    background: #d0d0d0;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    align-items: center;
    z-index: 999;
}
</style>
