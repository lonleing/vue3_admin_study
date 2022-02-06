import router from ".";

router.beforeEach(async (to) => {
    console.log(to.meta)
})

// 登录验证 路由守卫