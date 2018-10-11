<template>
    <div class="main-container">
        <div class="weui-panel weui-panel_access">
		    <div class="weui-panel__bd">
		        <a v-for="item in list" @click="toDetail(item.id)" href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
		            <div class="weui-media-box__bd">
		                <h4 class="weui-media-box__title">{{item.title}}</h4>
		                <p class="weui-media-box__desc">{{item.date}}</p>
		            </div>
		        </a>
		    </div>
		</div>
		<div v-show="loading" class="weui-loadmore">
	        <i class="weui-loading"></i>
	        <span class="weui-loadmore__tips">正在加载</span>
	    </div>
	    <div v-show="noData" class="weui-loadmore weui-loadmore_line">
		    <span class="weui-loadmore__tips">暂无数据</span>
		</div>
		<div v-show="noMore" class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
		    <span class="weui-loadmore__tips"></span>
		</div>
    </div>
</template>

<script>
import util from '@/util'

export default {
    name: 'notice-list',
    data () {
        return {
        	list: [
        		{ title: '2018年国庆节放假通知', date: '2018-9-28', id: '1265' },
        		{ title: '2018年中秋节放假通知', date: '2018-9-25', id: '234' },
        		{ title: '2018年端午节放假通知', date: '2018-9-24', id: '25342' },
        		{ title: '2018五一劳动节放假通知', date: '2018-9-23', id: '2423' },
        		{ title: '2018清明节放假通知', date: '2018-9-22', id: '1231' }
        	],
        	loading: false,
        	noData: false,
        	noMore: true
        }
    },
    methods: {
    	toDetail (id) {
    		this.$router.push({name: 'notice-detail', query: {id}})
    	}
    }
}
</script>

<style scoped>
.main-container {
    margin-top: 1em;
    margin-bottom: 30px;
}
.weui-media-box__desc {
	font-size: 14px;
}
.weui-loadmore__tips {
	background-color: #f8f8f8;
}
</style>
