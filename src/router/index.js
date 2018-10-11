import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers.js'
import config from '@/config'
import weui from 'weui.js'
import { getUserInfo } from '@/api/user'
import { getToken, setToken } from '@/libs/util'

Vue.use(Router)
const router = new Router({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {
            x: 0,
            y: 0
        }
    }
})

const BASE_URL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const CORPID = config.corpId
const AGENTID = config.agentId

router.beforeEach((to, from, next) => {
	// console.log(to)

	if (to.meta.title) {
		document.title = to.meta.title
	}

	if (to.meta.code) {
		if (to.query.code) {
			// 获取CODE
		} else {
			const loading = weui.loading('加载中')
			/*
			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CORPID + '&redirect_uri=' + BASE_URL + to.path + '&response_type=code&scope=snsapi_privateinfo&agentid=' + AGENTID + '&state=STATE#wechat_redirect'
			return*/
			loading.hide()
			next()
		}
	} else {
		next()
	}
})

export default router