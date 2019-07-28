<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
                <div class="post-detail">Written by {{ loadedPost.author }}</div>
            </div>
            <p class="post-content">{{ loadedPost.info }}</p>
        </section>
        <section class="post-feedback">
            <p>let me know e123 rf23r23 34r</p>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    asyncData(context) {
        return axios.get(`https://my-nuxt-blog-f4685.firebaseio.com/posts/${context.params.id}.json`).then(res => {
            return {
                loadedPost: res.data
            }
        }).catch()
    },
    // asyncData(context, callback) {
    //     setTimeout(() => {
    //         callback(null, {
    //             loadedPost: {
    //                 id: '1',
    //                 title: `Title 1 (ID: ${context.route.params.id})`,
    //                 content: 'Content 1 test test...',
    //                 author: 'Joe',
    //                 updatedDate: new Date(),
    //                 info: 'lorem ipsum... hahaha... ewqeqwe',
    //                 bgi: 'https://picsum.photos/400/300'
    //             }
    //         })
    //     }, 1000)
    // }
}
</script>


<style lang="scss" scoped>
.single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
}
.post {
    width: 100%;
}
@media (min-width: 768px) {
    .post {
        width: 600px;
        margin: auto;
    }
}
.post-title {
    margin: 0;
}
.post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
@media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
}
.post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
}
.post-feedback a {
    color: red;
    text-decoration: none;
}
.post-feedback a:hover,
.post-feedback a:active {
    color: salmon;
}
</style>
