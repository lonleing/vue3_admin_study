import {
  CommitOptions,
  createStore,
  // mapActions,
  // mapMutations
} from 'vuex'

interface Store<T> {
  state: () => T;
  mutations?: { [props: string]: () => void }
  actions?: { [props: string]: () => void | Promise<T> }
}

interface Modules{
  [props: string]: Store<any>  // eslint-disable-line
}

const modulesFile = require.context('./modules', true, /\.(?:ts|js)$/)
const modules = modulesFile.keys().filter((modulePath: string) => modulePath != './baseModule.ts').reduce((moduleTotal: Modules, modulePath: string) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.(?:ts|js)$/, '$1')
  const value = modulesFile(modulePath)
  moduleTotal[moduleName] = new value.default
  return moduleTotal
}, {})

export const store = createStore<any>({ modules: modules })  // eslint-disable-line

export function setCommit (moduleName: string, fnName: string, payload?: any, options?: CommitOptions): void {  // eslint-disable-line
  const type = moduleName + '/' + fnName
  store.commit(type, payload, options)
}

export function getState<T> (moduleName: string): T {
  return store.state[moduleName]
}

// export function getMutations<T> (namespace: string, map: string[]): T {
//   return mapMutations(namespace, map) as unknown as T
// }

// export function getActions<T> (namespace: string, map: string[]): T {
//   return mapActions(namespace, map) as unknown as T
// }
