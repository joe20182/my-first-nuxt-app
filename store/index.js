import Vuex from 'vuex'

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
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('SET_POSTS', [
                            {
                                id: '1',
                                title: 'post page 1',
                                content: 'this is first post',
                                bgi: 'https://picsum.photos/400/300'
                            },
                            {
                                id: '2',
                                title: 'post page 2',
                                content: 'this is second post',
                                bgi: 'https://picsum.photos/400/300'
                            }
                        ])
                        resolve()
                    }, 1000)
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
