<template>
    <div class="posts-page">
        <PostList :posts="postList"></PostList>
    </div>
</template>

<script>
import PostList from '@/components/posts/PostList.vue'

export default {
    components: {
        PostList
    },
    fetch(context) {
        // 用promise的話asyncData就不要接收callback參數了，因為若接了nuxt會等待我們呼叫callback
        // 另外asyncData跟fetch的差別是asyncData會把資料merge進data，而fetch不會，而是存在store裡
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve({
        //             postList: [
        //                 {
        //                     id: '1',
        //                     title: 'post page 1',
        //                     content: 'this is first post',
        //                     bgi: 'https://picsum.photos/400/300'
        //                 },
        //                 {
        //                     id: '2',
        //                     title: 'post page 2',
        //                     content: 'this is second post',
        //                     bgi: 'https://picsum.photos/400/300'
        //                 }
        //             ]
        //         })
        //     }, 1000)
        //     // reject(new Error())
        // }).then(data => {
        //     context.store.commit('SET_POSTS', data.postList)
        // }).catch(err => {
        //     context.error(err)
            
        // })
    },
    computed: {
        postList() {
            return this.$store.getters.loadedPosts
        }
    }
}
</script>

<style lang="scss" scoped>
.posts-page {
    text-align: center;
}
</style>
