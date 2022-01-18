type Env = 'development' | 'test' | 'production'

export const env: Env = (import.meta.env.MODE as Env) || 'production'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/2d8f8bcbe2736dc65bf67c4dbd98f6df/api'
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/2d8f8bcbe2736dc65bf67c4dbd98f6df/api'
  },
  production: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/2d8f8bcbe2736dc65bf67c4dbd98f6df/api'
  }
}

console.log(env);

export const baseApi = import.meta.env.VITE_MOCK ? EnvConfig[env].mockApi : EnvConfig[env].baseApi

// export default {
//   env,
//   mock: true,
//   baseApi: EnvConfig[env].baseApi
// }
