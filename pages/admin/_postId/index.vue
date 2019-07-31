<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="postDetail" @submit="onSubmitted"></AdminPostForm>
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
    asyncData(context) {
        // console.log(context)
        return axios.get(`${process.env.baseUrl}/posts/${context.params.postId}.json`).then(res => {
            return {
                postDetail: {...res.data, id: context.params.postId}
            }
        }).catch()
    },
    methods: {
        onSubmitted(editedData) {
            this.$store.dispatch('EditPost', editedData).then(() => {
                this.$router.push('/admin')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.update-form {
    width: 90%;
    margin: 20px auto;
}
@media (min-width: 768px) {
    .update-form {
        width: 500px;
    }
}
</style>
