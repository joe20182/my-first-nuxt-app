<template>
    <div class="new-post-page">
        <section class="new-post-form">
            <AdminPostForm @submit="onSubmitted"></AdminPostForm>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {
    layout: 'admin',
    middleware: ['checkAuth', 'auth'],
    components: {
        AdminPostForm
    },
    methods: {
        onSubmitted(postData) {
            this.$store.dispatch('AddPost', postData).then(() => {
                this.$router.push('/admin')
            }) 
        }
    },
    head: {
        title: 'NEW POST PAGE'
    }
}
</script>

<style lang="scss" scoped>
.new-post-form {
    width: 90%;
    margin: 20px auto;
}
@media (min-width: 768px) {
    .new-post-form {
        width: 500px;
    }
}
</style>
