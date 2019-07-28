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
    components: {
        AdminPostForm
    },
    methods: {
        onSubmitted(postData) {
            axios.post('https://my-nuxt-blog-f4685.firebaseio.com/posts.json', {
                ...postData,
                updatedDate: new Date()
            }).then(res => {
                this.$router.push('/admin')
            }).catch(err => {
                console.log(err)
            })
        }
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
