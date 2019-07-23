<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="postDetail"></AdminPostForm>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {
    layout: 'admin',
    components: {
        AdminPostForm
    },
    data() {
        return {
            postDetail: {
                author: '123',
                title: 'qwe',
                thumbnailLink: 'ddd',
                content: 'd123d'
            }
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
