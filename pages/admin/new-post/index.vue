<template>
    <div class="new-post-page">
        <section class="new-post-form">
            <AdminPostForm></AdminPostForm>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {
    layout: 'admin',
    components: {
        AdminPostForm
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
