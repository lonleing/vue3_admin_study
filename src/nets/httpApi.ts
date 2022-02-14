const baseUrl = process.env.NODE_ENV === 'production' ? 'https://mock-1600520-1304471224.ap-shanghai.run.tcloudbase.com/apis' : 'http://localhost:3000/apis'
export const Http = {
    BaseUrl: baseUrl,
    Login: '/login',
    ArticleList: '/article/list',
    ArticleInfo: '/article/info',
    Tab: '/tab/getTab'
} 