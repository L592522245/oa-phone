<template>
    <div class="detail-container">
    	<div class="weui-form-preview">
		    <div class="weui-form-preview__hd">
		        <div class="form-preview__label">{{detail.type}}详情</div>
		        <div class="form-preview__info" :class="detail.stateClass">{{detail.stateText}}</div>
		    </div>
		    <div class="weui-form-preview__bd">
		        <p>
		            <label class="weui-form-preview__label">{{detail.type}}金额</label>
		            <span class="form-preview__value">{{detail.amount}} 元</span>
		        </p>
		        <p>
		            <label class="weui-form-preview__label">用途/说明</label>
		            <span class="form-preview__value">{{detail.reason}}</span>
		        </p>
		        <!-- <p v-if="detail.fileList.length > 0">
		            <label class="weui-form-preview__label">证明文件</label>
		            <span class="form-preview__value" style="padding-top: .5em;">
		            	<ul class="weui-uploader__files">
			                <li v-for="item in detail.fileList" class="weui-uploader__file upload-file-li" :style="{backgroundImage: 'url(' + item + ')'}" :key="'upload-file-' + item" @click="imgGallery(item)"></li>
			            </ul>
		            </span>
		        </p> -->
		    </div>
		</div>

		<div class="weui-form-preview">
		    <div class="weui-form-preview__bd">
            	<div class="form-preview__label apply-process__label">{{detail.name}} <span>发起申请</span></div>
            	<span class="weui-form-preview__value">{{detail.fcd}}</span>
            	<div class="form-preview__label apply-process__label">{{detail.name}} <span class="state-warning">审批中</span></div>
            	<span class="weui-form-preview__value">{{detail.fcd}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import weui from 'weui.js'
import store from '_s/index.js'

export default {
    name: 'expense-detial',
    data () {
    	return {
    		detail: {}
    	}
    },
    created () {
    	this.detail = {
    		stateClass: 'state-warning',
    		stateText: '审批中',
    		fcd: '2018-9-28',
    		type: '报销',
    		amount: '200',
    		reason: '车费报销',
    		name: '李明'
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
.weui-form-preview__label {
	min-width: 6em;
	text-align: left;
	text-align-last: auto;
}
</style>
