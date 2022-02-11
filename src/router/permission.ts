import router from ".";
import { getState } from '@/store'
import { UserState } from '@/store/modules/userStore'

router.beforeEach(async (to) => {
    const token = getState<UserState>('userStore').token
    if (token) {
        if (to.path == '/login') {
            return {name: 'Dashboard', replace: true}
        }
        return true
    }
    if (to.meta.requiresAuth) {
        return {name: 'Login', replace: true}
    }
    return true
})