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
    components: {
        AdminPostForm
    },
    asyncData(context) {
        // console.log(context)
        return axios.get(`https://my-nuxt-blog-f4685.firebaseio.com/posts/${context.params.postId}.json`).then(res => {
            return {
                postDetail: res.data
            }
        }).catch()
    },
    methods: {
        onSubmitted(editedData) {
            axios.put(`https://my-nuxt-blog-f4685.firebaseio.com/posts/${this.$route.params.postId}.json`, editedData).then(res => {
                this.$router.push('/admin')
            }).catch(err => {
                console.log(err)
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
