export default function(context) {
    if (!context.store.getters.isAuthed) {
        context.redirect('/admin/auth')
    }
}