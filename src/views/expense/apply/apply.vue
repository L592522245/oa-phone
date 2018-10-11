<template>
    <div class="form-container">
        <form id="applyFrom" onclick="return true">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label for="" class="weui-label">申请类别</label></div>
                    <div class="weui-cell__bd">{{ $route.query.typeText }}申请</div>
                </div>
            </div>
            <div class="expense-list" v-for="(item, index) in expenseList">
                <div class="weui-cells__title">
                    {{ $route.query.typeText }}明细 {{ index + 1 }}
                    <span class="expense-item-delete" v-show="showDeleteBtn" @click="deleteExpense(index)">删除</span>
                </div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label for="" class="weui-label"><span class="label-require">* </span>金额(元)</label></div>
                        <div class="weui-cell__bd">
                            <input v-model="item.amount" class="weui-input" type="number" min="0" placeholder="请输入数字" required="" notMatchTips="请输入正确数字" pattern="REG_AMOUNT" @keyup="typingAmount" />
                        </div>
                        <div class="weui-cell__ft">
                            <i class="weui-icon-warn"></i>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label for="" class="weui-label"><span class="label-require">* </span>{{ $route.query.typeText }}类别</label></div>
                        <div class="weui-cell__bd">
                            <input v-model="item.type" class="weui-input" type="text" placeholder="请输入类别" required="" />
                        </div>
                        <div class="weui-cell__ft">
                            <i class="weui-icon-warn"></i>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <label for="" class="weui-label" style="margin-bottom: .5em"><span class="label-require">* </span>用途/说明</label>
                            <textarea v-model="item.reason" class="weui-textarea" placeholder="请输入用途/说明" rows="3" maxlength="200" required=""></textarea>
                            <div class="weui-textarea-counter"><span>{{item.reason.length}}</span>/200</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="expense-add-btn" @click="addExpense">＋ 增加{{ $route.query.typeText }}明细</div>
            <div class="weui-cells__tips">总{{ $route.query.typeText }}金额(元)：<span style="color: #333;">{{totalAmount}}</span></div>

            <uploader v-if="fileUploader" :maxFile="maxFile" @on-file-change="fileChange" :fileList="form.fileList" uploadTitle="附件" />
            <div class="weui-footer_fixed-bottom form-footer">
                <div class="weui-flex">
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
    name: 'expense-apply',
    components: {
        Uploader
    },
    data () {
        return {
            form: {
                fileList: []
            },
            maxFile: 5,
            btnLoading: false,
            submitText: '提 交',
            localStartDate: '',
            localEndDate: '',
            submiting: false,
            fileUploader: true,
            leaveRemainText: '',
            btnDisabled: false,
            expenseList: [
                {
                    amount: '',
                    type: '',
                    reason: ''
                }
            ],
            showDeleteBtn: false,
            totalAmount: null
        }
    },
    created () {
        document.title = this.$route.query.typeText + '申请'
    },
    mounted () {
        this.initCheckIfBlur()
    },
    methods: {
        addExpense () {
            let data = {
                amount: '',
                type: '',
                reason: ''
            }
            let _this = this
            this.expenseList.push(data)
            this.showDeleteBtn = true
            this.$nextTick(() => {
                _this.initCheckIfBlur()
            })
        },
        deleteExpense (index) {
            let _this = this
            weui.confirm('确定要删除数据吗？', {
                title: '提示',
                buttons: [{
                    label: '取消',
                    type: 'default',
                    onClick: function() {}
                }, {
                    label: '删除',
                    type: 'primary',
                    onClick: function() {
                        _this.expenseList.splice(index, 1)
                        if(_this.expenseList.length <= 1) {
                            _this.showDeleteBtn = false
                        }
                        _this.countAmount()
                    }
                }]
            })
        },
        typingAmount (e) {
            this.countAmount()      
        },
        countAmount () {
            let _this = this
            _this.totalAmount = null
            for (let i = 0, len = _this.expenseList.length; i < len; i++) {
                let amount = Number.parseFloat(_this.expenseList[i].amount)
                if (amount)
                    _this.totalAmount += amount
            }
        },
        initCheckIfBlur () {
            let regexp = {
                regexp: {
                    AMOUNT: /^\d+(\.\d+)?$/
                }
            }
            weui.form.checkIfBlur('#applyFrom', regexp)
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
                            _this.$router.push({name: 'expense-main'})
                        }, 1500)
                    }
                }
                // return true; // 当return true时，不会显示错误
            }, {
                regexp: {
                    AMOUNT: /^\d+(\.\d+)?$/
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
.expense-add-btn {
    padding: .6em 0;
    text-align: center;
    color: #2d8cf0;
    background-color: #fff;
}
.expense-item-delete {
    float: right;
    color: #2d8cf0;
}
</style>
