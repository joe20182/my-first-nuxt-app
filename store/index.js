import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            SET_TOKEN(state, token) {
                state.token = token
            },
            CLEAR_TOKEN(state) {
                state.token = null
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
                return context.app.$axios.$get('/posts.json').then(data => {
                    // 如果全部改成用$axios的話就可以不用另外import axios了
                    const postArr = []
                    for (const key in data) {
                        postArr.push({...data[key], id: key})
                    }
                    vuexContext.commit('SET_POSTS', postArr)
                }).catch(err => {
                    context.error(err)
                })
                // return axios.get(`${process.env.baseUrl}/posts.json`).then(res => {
                //     const postArr = []
                //     for (const key in res.data) {
                //         postArr.push({...res.data[key], id: key})
                //     }
                //     vuexContext.commit('SET_POSTS', postArr)
                // }).catch(err => {
                //     context.error(err)
                // })
            },
            SetPosts({commit}, data) {
                commit('SET_POSTS', data)
            },
            AddPost({commit, state}, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                }
                return this.$axios.$post(`/posts.json?auth=${state.token}`, createdPost).then(data => {
                    commit('ADD_POST', {...createdPost, id: data.name})
                }).catch(err => {
                    console.log(err)
                })
            },
            EditPost({commit, state}, editedPost) {
                return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${state.token}`, editedPost).then(data => {
                    commit('EDIT_POST', editedPost)
                }).catch(err => {
                    console.log(err)
                })
            },
            AuthUser({commit, dispatch}, data) {
                let apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`
                if (!data.isLogin) {
                    apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`
                }
                return this.$axios.$post(apiUrl, {
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }).then(res => {
                    console.log(res)
                    commit('SET_TOKEN', res.idToken)
                    localStorage.setItem('token', res.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + parseInt(res.expiresIn) * 1000)
                    Cookie.set('jwt', res.idToken)
                    Cookie.set('jwtExp', new Date().getTime() + parseInt(res.expiresIn) * 1000)
                    return this.$axios.$post('http://localhost:3000/api/track-data', {
                        data: 'haha'
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            InitAuth({commit, dispatch}, req) {
                let token, tokenExpiration;
                if (req) {
                    if (!req.headers.cookie) {
                        return false
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
                    const jwtExpCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwtExp='))
                    if (!jwtCookie) {
                        return false
                    }
                    token = jwtCookie.split('=')[1]
                    tokenExpiration = jwtExpCookie.split('=')[1]
                } else if (process.client) {
                    token = localStorage.getItem('token')
                    tokenExpiration = localStorage.getItem('tokenExpiration')
                }
                if (new Date().getTime() > parseInt(tokenExpiration) || !token) {
                    console.log('No token or invalid!')
                    dispatch('Logout')
                    return false
                }
                commit('SET_TOKEN', token)
            },
            Logout({commit}) {
                commit('CLEAR_TOKEN')
                if (process.client) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
                Cookie.remove('jwt')
                Cookie.remove('jwtExp')
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthed(state) {
                return state.token != null
            }
        }
    })
}

export default createStore
