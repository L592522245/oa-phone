<template>
    <div class="form-container">
        <form id="applyFrom" onclick="return true">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label">请假类别</label></div>
                    <div class="weui-cell__bd">{{ typeText }}</div>
                </div>
            </div>
            <div class="weui-cells__tips">{{ leaveRemainText }}</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label"><span class="label-require">* </span>开始日期</label></div>
                    <div class="weui-cell__bd">
                        <input v-model="form.startDate" id="startDate" class="weui-input" type="text" placeholder="请选择开始日期" required="" @click.once="initStartDate" readonly="" notMatchTips="开始日期不能大于结束日期" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label"><span class="label-require">* </span>结束日期</label></div>
                    <div class="weui-cell__bd">
                        <input v-model="form.endDate" id="endDate" class="weui-input" type="text" placeholder="请选择结束日期" required="" @click.once="initEndDate" readonly="" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label"><span class="label-require">* </span>天数</label></div>
                    <div class="weui-cell__bd">
                        <input id="leaveDays" class="weui-input" type="number" v-model.number="form.days" placeholder="请输入请假天数" required="" pattern="REG_LEAVEDAYS" notMatchTips="请输入正确的天数" @blur="checkIfBlur" @focus.once="initCheckIfBlur" />
                    </div>
                    <div class="weui-cell__ft">
                        <i class="weui-icon-warn"></i>
                    </div>
                </div>
            </div>
            <div class="weui-cells__tips">请假天数不小于0.5天</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <label for="" class="weui-label" style="margin-bottom: .5em"><span class="label-require">* </span>请假原因</label>
                        <textarea v-model="form.reason" class="weui-textarea" placeholder="请输入请假原因" rows="3" maxlength="200" required="" @focus.once="initCheckIfBlur"></textarea>
                        <div class="weui-textarea-counter"><span>{{form.reason.length}}</span>/200</div>
                    </div>
                </div>
            </div>
            <uploader v-if="fileUploader" :maxFile="maxFile" @on-file-change="fileChange" :fileList="form.fileList" />
            <div class="weui-footer_fixed-bottom form-footer">
                <div class="weui-flex">
                    <div class="weui-flex__item">
                        <a href="javascript:;" class="weui-btn weui-btn_default" :class="{'weui-btn_loading': saveBtnLoading, 'weui-btn_disabled': btnDisabled}" @click="save" style="margin: 0 .5em;"><i v-show="saveBtnLoading" class="weui-loading"></i>{{saveText}}</a>
                    </div>
                    <div class="weui-flex__item">
                        <a href="javascript:;" class="weui-btn weui-btn_primary" :class="{'weui-btn_loading': btnLoading, 'weui-btn_disabled': btnDisabled}" @click="submit" style="margin: 0 .5em;"><i v-show="btnLoading" class="weui-loading"></i>{{submitText}}</a>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import weui from 'weui.js'
import Uploader from '_c/uploader.vue'
import store from '_s/index.js'
import util from '@/util'

export default {
    name: 'leave-apply',
    components: {
        Uploader
    },
    data () {
        return {
            typeText: '',
            form: {
                startDate: '',
                endDate: '',
                days: '',
                reason: '',
                fileList: []
            },
            maxFile: 5,
            btnLoading: false,
            submitText: '提 交',
            saveBtnLoading: false,
            saveText: '保存为草稿',
            localStartDate: '',
            localEndDate: '',
            submiting: false,
            fileUploader: false,
            leaveRemainText: '',
            btnDisabled: false
        }
    },
    created () {
        let data = store.getApplyData()
        let remainDays = store.getRemainDays()
        if (data) {
            this.typeText = data.typeText
            this.form.startDate = data.startDate
            this.form.endDate = data.endDate
            this.form.days = data.days
            this.form.reason = data.reason || ''

            if (this.form.startDate) {
                this.localStartDate = util.formatDatetimeLocalStr(this.form.startDate)
            } else {
                let str = new Date().format('yyyy-MM-dd') + ' 9:00'
                this.localStartDate = util.formatDatetimeLocalStr(str)
            }

            if (this.form.endDate) {
                this.localEndDate = util.formatDatetimeLocalStr(this.form.endDate)
            } else {
                let str = new Date().format('yyyy-MM-dd') + ' 18:00'
                this.localEndDate = util.formatDatetimeLocalStr(str)
            }

            let fileList = data.fileList || []
            let arr = []
            for (let i = 0, len = fileList.length; i < len; i++) {
                arr.push({
                    src: fileList[i],
                    uploading: false
                })
            }
            this.form.fileList = arr

            // 文件上传组件
            if (data.type == 4 || data.type == 5 || data.type == 6 || data.type == 7) {
                this.fileUploader = true
            }

            // 剩余假期
            if (remainDays) {
                if (data.type == 2) {
                    this.leaveRemainText = '调休假：剩余' + remainDays.overtimeDays + '天'
                    if (remainDays.overtimeDays <= 0) this.btnDisabled = true
                } else if (data.type == 3) {
                    this.leaveRemainText = '年休假：剩余' + remainDays.annualDays + '天'
                    if (remainDays.annualDays <= 0) this.btnDisabled = true
                } else if (data.type == 8) {
                    this.leaveRemainText = '奖励假：剩余' + remainDays.rewardDays + '天'
                    if (remainDays.rewardDays <= 0) this.btnDisabled = true
                }
            }
        } else {
            this.$router.push({ name: 'leave-main' })
        }
    },
    mounted () {
        
    },
    methods: {
        initStartDate () {
            this.initCheckIfBlur()
            let dom = document.getElementById('startDate')
            dom.type = 'datetime-local'
            this.form.startDate = this.localStartDate
            dom.value = this.localStartDate
            dom.readOnly = false
            dom.focus()
        },
        initEndDate () {
            this.initCheckIfBlur()
            let dom = document.getElementById('endDate')
            dom.type = 'datetime-local'
            dom.value = this.localEndDate
            this.form.endDate = this.localEndDate
            dom.readOnly = false
            dom.focus()
        },
        initCheckIfBlur () {
            let regexp = {
                regexp: {
                    LEAVEDAYS: /^\d+(\.\d+)?$/
                }
            }
            weui.form.checkIfBlur('#applyFrom', regexp)
        },
        checkIfBlur (e) {
            if (e.target.id == 'leaveDays' && e.target.value && Number(e.target.value) < 0.5) {
                weui.form.showErrorTips({
                    ele: document.getElementById('leaveDays'),
                    msg: 'notMatch'
                })
            }
        },
        fileChange (fileList) {
            this.form.fileList = fileList
        },
        submit () {
            let _this = this
            if (_this.btnDisabled || !_this.dateVaild()) return

            weui.form.validate('#applyFrom', function (error) {
                if (!error) {
                    if (!_this.submiting) {
                        _this.submiting = true

                        _this.btnLoading = true
                        _this.submitText = '提交中'
                        // 提交
                        setTimeout(function () {
                            _this.btnLoading = false
                            _this.submitText = '提 交'
                            _this.submiting = false
                            weui.toast('提交成功', 3000)
                            _this.$router.push({name: 'leave-main'})
                        }, 1500)
                    }
                }
                // return true; // 当return true时，不会显示错误
            }, {
                regexp: {
                    LEAVEDAYS: /^\d+(\.\d+)?$/
                }
            })
        },
        save () {
            let _this = this
            if (_this.btnDisabled || !_this.dateVaild()) return

            weui.form.validate('#applyFrom', function (error) {
                if (!error) {
                    if (!_this.submiting) {
                        _this.submiting = true

                        _this.saveBtnLoading = true
                        _this.saveText = '保存中'
                        // 提交
                        setTimeout(function () {
                            _this.saveBtnLoading = false
                            _this.saveText = '保存为草稿'
                            _this.submiting = false
                            weui.toast('保存成功', 3000)
                            _this.$router.push({name: 'leave-main'})
                        }, 1500)
                    }
                }
                // return true; // 当return true时，不会显示错误
            }, {
                regexp: {
                    LEAVEDAYS: /^\d+(\.\d+)?$/
                }
            })
        },
        dateVaild () {
            if (new Date(this.form.startDate).getTime() > new Date(this.form.endDate).getTime()) {
                weui.form.showErrorTips({
                    ele: document.getElementById('startDate'),
                    msg: 'notMatch'
                })
                return false
            }
            return true
        }
    }
}
</script>

<style scoped>
.form-container {
    margin-bottom: 100px;
}
.form-footer {
    padding: 10px 20px;
    bottom: 0;
    z-index: 888;
    background-color: #fff;
}
.weui-uploader {
    width: 100%;
}
.label-require {
    color: #F43530;
}
</style>
