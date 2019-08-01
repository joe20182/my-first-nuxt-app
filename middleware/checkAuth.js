export default function(context) {
    // first load的時候是SSR，因此不會有localStorage，導致報錯undefined
    context.store.dispatch('InitAuth', context.req)
}