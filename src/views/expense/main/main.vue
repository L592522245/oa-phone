<template>
    <div class="main-container">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd grid-container">
                <div class="weui-flex main-grid">
                    <div class="weui-flex__item" @click="apply('报销')">
                        <div class="grid__icon grid__icon_danger">销</div>
                        <div class="placeholder">报销</div>
                    </div>
                    <div class="weui-flex__item" @click="apply('费用')">
                        <div class="grid__icon grid__icon_dark-primary">费</div>
                        <div class="placeholder">费用</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="expenseRecords.length > 0" class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">我的报销</div>
            <div class="weui-panel__bd">
                <div v-for="(item, index) in expenseRecords" class="weui-media-box weui-media-box_text" :class="{'panel-tap': item.tap}" @click="toDetail(item, index)">
                    <h4 class="weui-media-box__title">
                        {{name}}的报销
                        <span class="media-box__title_info">{{item.fcd}}</span>
                    </h4>
                    <p class="weui-media-box__desc">报销金额(元)：{{item.amount}}</p>
                    <p class="weui-media-box__desc" :class="item.stateClass" style="margin-top: 5px;">{{item.stateText}}</p>
                </div>
            </div>
        </div>
        <div v-if="costRecords.length > 0" class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">我的费用</div>
            <div class="weui-panel__bd">
                <div v-for="(item, index) in costRecords" class="weui-media-box weui-media-box_text" :class="{'panel-tap': item.tap}" @click="toDetail(item, index)">
                    <h4 class="weui-media-box__title">
                        {{name}}的费用
                        <span class="media-box__title_info">{{item.fcd}}</span>
                    </h4>
                    <p class="weui-media-box__desc">费用金额(元)：{{item.amount}}</p>
                    <p class="weui-media-box__desc" :class="item.stateClass" style="margin-top: 5px;">{{item.stateText}}</p>
                </div>
            </div>
        </div>
        <div v-show="loading" class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'expense-main',
    data () {
        return {
            name: '李明',
            expenseRecords: [],
            costRecords: [],
            loading: false
        }
    },
    created () {
        this.expenseRecords = [
            {fcd: '2018-9-28', stateClass: 'state-warning', stateText: '审批中', id: '829', amount: 120},
            {fcd: '2018-9-22', stateClass: 'state-success', stateText: '审批通过', id: '3455', amount: 200},
            {fcd: '2018-9-21', stateClass: 'state-danger', stateText: '审批不通过', id: '234242', amount: 1000}
        ]
    },
    methods: {
        toDetail (item, index) {
            this.$set(this.expenseRecords[index], 'tap', true)
            item.name = this.name
            this.$router.push({name: 'expense-detail', query: {id: item.id}})
        },
        apply (typeText) {
            this.$router.push({name: 'expense-apply', query: {typeText}})
        }
    }
}
</script>

<style scoped>
.main-container {
    margin-top: 1em;
    margin-bottom: 30px;
}
.media-box__title_info {
    float: right;
    font-size: 12px;
    color: #aaa;
}
.weui-media-box__desc {
    font-size: 14px;
}
.panel-tap {
    background-color: #eee;
}
.grid-container {
    padding: 15px 0;
}
.main-grid {
    text-align: center;
    margin-bottom: 1em;
}
.main-grid:last-child {
    margin-bottom: 0;
}
.grid__icon {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0 auto .3em;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}
.weui-flex__item {
    flex: none;
    width: 25%;
    display: inline-block;
}
.weui-flex__item {
    font-size: 13px;
}
</style>
