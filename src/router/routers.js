export default [
	{
		path: '/leave',
		name: 'leave-main',
		meta: {
			code: true,
			title: '请假'
		},
		component: () => import('../views/leave/main/main.vue')
	},
	{
		path: '/leave/apply',
		name: 'leave-apply',
		meta: {
			title: '请假申请'
		},
		component: () => import('../views/leave/apply/apply.vue')
	},
	{
		path: '/leave/detail',
		name: 'leave-detail',
		meta: {
			title: '请假详情'
		},
		component: () => import('../views/leave/detail/detail.vue')
	},
	{
		path: '/check',
		name: 'check-main',
		meta: {
			code: true,
			title: '考勤打卡'
		},
		component: () => import('../views/check/main.vue')
	},
	{
		path: '/notice',
		name: 'notice-list',
		meta: {
			title: '查看公告'
		},
		component: () => import('../views/notice/list/list.vue')
	},
	{
		path: '/notice/detail',
		name: 'notice-detail',
		meta: {
			title: '公告详情'
		},
		component: () => import('../views/notice/detail/detail.vue')
	},
	{
		path: '/expense',
		name: 'expense-main',
		meta: {
			code: true,
			title: '报销/费用'
		},
		component: () => import('../views/expense/main/main.vue')
	},
	{
		path: '/expense/apply',
		name: 'expense-apply',
		component: () => import('../views/expense/apply/apply.vue')
	},
	{
		path: '/expense/detail',
		name: 'expense-detail',
		meta: {
			title: '报销/费用详情'
		},
		component: () => import('../views/expense/detail/detail.vue')
	}
]