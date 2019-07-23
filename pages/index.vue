<template>
    <div class="home-page">
        <section class="intro">
            <h1>Get the latest tech news!</h1>
        </section>
        <PostList :posts="postList"></PostList>
    </div>
</template>

<script>
import PostList from '~/components/posts/PostList.vue'

export default {
    components: {
        PostList
    },
    asyncData(context, callback) {
        // 生命週期比component創建還早，拿不到this，用asyncData讓資料SSR
        setTimeout(() => {
            // 可以用callback或promise
            callback(null, {
                postList: [
                    {
                        id: '1',
                        title: 'Title 1',
                        content: 'Content 1 test test...',
                        bgi: 'https://picsum.photos/400/300'
                    },
                    {
                        id: '2',
                        title: 'Title 2',
                        content: 'Content 2 test test...',
                        bgi: 'https://picsum.photos/400/300'
                    }
                ]
            })
        }, 1500)
    },
    // data() {
    //     return {
    //         postList: [
    //             {
    //                 id: '1',
    //                 title: 'Title 1',
    //                 content: 'Content 1 test test...',
    //                 bgi: 'https://picsum.photos/400/300'
    //             },
    //             {
    //                 id: '2',
    //                 title: 'Title 2',
    //                 content: 'Content 2 test test...',
    //                 bgi: 'https://picsum.photos/400/300'
    //             }
    //         ]
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.home-page {
    .intro {
        height: 300px;
        position: relative;
        padding: 30px;
        box-sizing: border-box;
        background-position: center;
        background-size: cover;
        background-image: url('~assets/images/main-page-background.jpg');
        h1 {
            position: absolute;
            top: 10%;
            left: 5%;
            width: 90%;
            font-size: 1.5rem;
            color: black;
            background-color: rgb(211, 211, 211);
            padding: 10px;
            border-radius: 10px;
            box-shadow: 3px 3px 3px black;
            box-sizing: border-box;
            border: 1px solid black;
        }
    }
}
@media (min-width: 768px) {
  .intro {
        h1 {
            font-size: 2rem;
        }
    }
}
</style>
