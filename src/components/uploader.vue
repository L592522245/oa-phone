<template>
	<div class="weui-cells weui-cells_form">
		<div class="weui-cell">
			<div class="weui-cell__bd">
				<div class="weui-uploader">
					<div class="weui-uploader__hd">
						<p class="weui-uploader__title">{{uploadTitle}}</p>
						<div class="weui-uploader__info">{{fileList.length}}/{{maxFile}}</div>
					</div>
					<div class="weui-uploader__bd" style="overflow: inherit;">
					<ul class="weui-uploader__files">
		                <li v-for="(item, index) in fileList" class="weui-uploader__file upload-file-li" :class="{'weui-uploader__file_status': item.uploading}" :style="{backgroundImage: 'url(' + item.src + ')'}" :key="'upload-file-' + item.src" @click="imgGallery(item.src)">
		                	<div v-show="item.uploading" class="weui-uploader__file-content">{{item.precent}}%</div>
		                	<span v-if="!item.uploading" class="weui-badge upload-file-del" @click.stop="deletFile(index)">x</span>
		                </li>
		            </ul>
					<div class="weui-uploader__input-box">
						<input @change="fileSelected" class="weui-uploader__input" type="file" accept="image/*" multiple @click="fileSelect" />
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
import weui from 'weui.js'

export default {
	name: 'Uploader',
	props: {
		uploadUrl: {
			type: String,
			default: 'http://localhost'
		},
		uploadTitle: {
			type: String,
			default: '证明文件'
		},
		maxFile: {
		  	type: Number,
		  	default: 3
		},
		fileList: {
			type: Array,
			default () {
				return []
			}
		}
	},
	data() {
		return {
		    uploading: true
		}
	},
	methods: {
		fileSelected (e) {
            // console.log(e)
            let src = ''
            let url = url = window.URL || window.webkitURL || window.mozUR
            let files = e.target.files
            for (let i = 0, len = files.length; i < len; ++i) {
                if (i < this.maxFile) {
                    let file = files[i];

                    if (url) {
                        src = url.createObjectURL(file);
                    } else {
                        src = e.target.result;
                    }

                    this.fileList.push({
                        src,
                        precent: 0,
                        uploading: true
                    })
                }
            }

            this.uploadFile(this.fileList).then(() => {
            	this.$emit('on-file-change', this.fileList)
            })
        },
        uploadFile (files) {
        	return new Promise((resolve, reject) => {
        		setTimeout(() => {
        			for (let file of files) {
	        			file.uploading = false
	    			}
        		}, 600)
        		resolve()
        	})
        },
        imgGallery (url) {
            let _this = this
            let gallery = weui.gallery(url, {
                className: 'remove-delete'
            })
        },
        fileSelect (e) {
            if (this.fileList.length >= this.maxFile) {
                e.preventDefault()
                weui.topTips('最多上传不超过' + this.maxFile + '个文件', 3000)
            }
        },
        deletFile (index) {
    		this.fileList.splice(index, 1)
        }
	}
}
</script>

<style>
.upload-file-li {
	position: relative;
}
.upload-file-del {
	position: absolute;
	right: -5px;
	top: -5px;
}
</style>