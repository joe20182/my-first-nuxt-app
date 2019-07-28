import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            SET_POSTS(state, data) {
                state.loadedPosts = data
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                // nuxtServerInit會自動被nuxt dispatch
                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         vuexContext.commit('SET_POSTS', [
                //             {
                //                 id: '1',
                //                 title: 'post page 1',
                //                 content: 'this is first post',
                //                 bgi: 'https://picsum.photos/400/300'
                //             },
                //             {
                //                 id: '2',
                //                 title: 'post page 2',
                //                 content: 'this is second post',
                //                 bgi: 'https://picsum.photos/400/300'
                //             }
                //         ])
                //         resolve()
                //     }, 1000)
                // })
                return axios.get('https://my-nuxt-blog-f4685.firebaseio.com/posts.json').then(res => {
                    const postArr = []
                    for (const key in res.data) {
                        postArr.push({...res.data[key], id: key})
                    }
                    vuexContext.commit('SET_POSTS', postArr)
                }).catch(err => {
                    context.error(err)
                })
            },
            SetPosts({commit}, data) {
                commit('SET_POSTS', data)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore
