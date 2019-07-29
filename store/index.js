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
            },
            ADD_POST(state, post) {
                state.loadedPosts.push(post)
            },
            EDIT_POST(state, editedPost) {
                let postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
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
                return axios.get(`${process.env.baseUrl}/posts.json`).then(res => {
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
            },
            AddPost({commit}, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                }
                return axios.post(`${process.env.baseUrl}/posts.json`, createdPost).then(res => {
                    commit('ADD_POST', {...createdPost, id: res.data.name})
                }).catch(err => {
                    console.log(err)
                })
            },
            EditPost({commit}, editedPost) {
                return axios.put(`${process.env.baseUrl}/posts/${editedPost.id}.json`, editedPost).then(res => {
                    commit('EDIT_POST', editedPost)
                }).catch(err => {
                    console.log(err)
                })
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
