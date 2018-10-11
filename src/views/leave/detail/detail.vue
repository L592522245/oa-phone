<template>
    <div class="detail-container">
    	<div class="weui-form-preview">
		    <div class="weui-form-preview__hd">
		        <div class="form-preview__label">请假详情</div>
		        <div class="form-preview__info" :class="detail.stateClass">{{detail.stateText}}</div>
		    </div>
		    <div class="weui-form-preview__bd">
		        <p>
		            <label class="weui-form-preview__label">请假类型</label>
		            <span class="form-preview__value">{{detail.typeText}}</span>
		        </p>
		        <p>
		            <label class="weui-form-preview__label">开始时间</label>
		            <span class="form-preview__value">{{detail.startDate}}</span>
		        </p>
		        <p>
		            <label class="weui-form-preview__label">结束时间</label>
		            <span class="form-preview__value">{{detail.endDate}}</span>
		        </p>
		        <p>
		            <label class="weui-form-preview__label">请假天数</label>
		            <span class="form-preview__value">{{detail.days}}</span>
		        </p>
		        <p>
		            <label class="weui-form-preview__label">请假原因</label>
		            <span class="form-preview__value">{{detail.reason}}</span>
		        </p>
		        <p v-if="detail.fileList.length > 0">
		            <label class="weui-form-preview__label">证明文件</label>
		            <span class="form-preview__value" style="padding-top: .5em;">
		            	<ul class="weui-uploader__files">
			                <li v-for="item in detail.fileList" class="weui-uploader__file upload-file-li" :style="{backgroundImage: 'url(' + item + ')'}" :key="'upload-file-' + item" @click="imgGallery(item)"></li>
			            </ul>
		            </span>
		        </p>
		    </div>
		</div>

		<div class="weui-form-preview">
		    <div class="weui-form-preview__bd">
            	<div class="form-preview__label apply-process__label">{{detail.name}} 发起申请</div>
            	<span class="weui-form-preview__value">{{detail.fcd}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import weui from 'weui.js'
import store from '_s/index.js'

export default {
    name: 'leave-detial',
    data () {
    	return {
    		detail: {}
    	}
    },
    created () {
    	let data = store.getApplyData()
        if (data) {
            this.detail = data
        } else {
        	this.$router.push({ name: 'leave-main' })
        }
    },
    methods: {
    	imgGallery (url) {
            let _this = this
            let gallery = weui.gallery(url, {
                className: 'remove-delete'
            })
        }
    }
}
</script>

<style scoped>
.detail-container {
	margin: 0 0 3em;
}
.form-preview__label {
	float: left;
    margin-right: 1em;
    min-width: 4em;
    color: inherit;
    text-align: justify;
    text-align-last: justify;
}
.form-preview__info {
	display: block;
    overflow: hidden;
    word-break: normal;
    word-wrap: break-word;
}
.form-preview__value {
	display: block;
    overflow: hidden;
    word-break: normal;
    word-wrap: break-word;
    text-align: left;
    color: #333;
}
.weui-form-preview {
	margin-top: 1.17em;
}
.apply-process__label {
	color: #2c3e50;
}
</style>
