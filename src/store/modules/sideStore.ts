import { isMobileNoRef } from '@/unit/Helper'
import BaseModule from './baseModule'

export interface SideState {
    isCollapse: boolean
}

export default class Side extends BaseModule<SideState> {
    state () {
        return {
            isCollapse: isMobileNoRef()
        }
    }

    mutations = {
        setIsCollapse (state: SideState, isCollapse: boolean) {
            state.isCollapse = isCollapse
        }
    }

    actions = {}
}