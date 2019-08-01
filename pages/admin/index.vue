<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
            <AppButton @click="logout">Logout</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Existing Posts</h1>
            <PostList :isAdmin="true" :posts="postList"></PostList>
        </section>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['checkAuth', 'auth'],
    computed: {
        postList() {
            return this.$store.getters.loadedPosts
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('Logout')
            this.$router.push('/admin/auth')
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-page {
    padding: 20px;
    .new-post {
        text-align: center;
        border-bottom: 2px solid #ccc;
        padding-bottom: 10px;
    }
    .existing-posts h1 {
        text-align: center;
    }
}
</style>
