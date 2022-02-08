import { Suspense } from 'vue'
import Loading from '@/components/loading/Loading.vue'
export default function (Component: any) {  // eslint-disable-line
    const temp = {
        components: {
            Component,
            Loading
        },
        setup() {
            return () => (<Suspense>
                {{
                    default: () => <Component></Component>,
                    fallback: () => <loading></loading>
                }}
            </Suspense>)
        }
    }
    return import('@/base/BasePage').then(() => {
        return new Promise((resolve) => resolve(temp))
    })
}