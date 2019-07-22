<template>
    <div class="header">
        <div class="item">
            <nuxt-link to="/users">Users</nuxt-link>
        </div>
        <div class="item">
            <nuxt-link to="/products">Products</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ccc;
    padding: 10px 0;
}
</style>
