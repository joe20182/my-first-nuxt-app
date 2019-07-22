<template>
    <div>
        <h1>products page</h1>
        <button @click="toPid(1)">to pid 1</button>
        <button @click="toPid(2)">to pid 2</button>
        <nuxt-child></nuxt-child>
    </div>
</template>

<script>
export default {
    layout: 'products',
    methods: {
        toPid(pid) {
            this.$router.push(`/products/${pid}`)
        }
    }
}
</script>
