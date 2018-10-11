<template>
    <div class="main-container">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd grid-container">
                <div class="weui-flex main-grid">
                    <div class="weui-flex__item" @click="apply(1, '事假')">
                        <div class="grid__icon grid__icon_info">事</div>
                        <div class="placeholder">事假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(2, '调休假')">
                        <div class="grid__icon grid__icon_light-primary">调<span class="weui-badge" v-show="overtimeDays > 0">{{overtimeDays}}</span></div>
                        <div class="placeholder">调休假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(3, '年休假')">
                        <div class="grid__icon grid__icon_success">年<span class="weui-badge" v-show="annualDays > 0">{{annualDays}}</span></div>
                        <div class="placeholder">年休假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(4, '婚假')">
                        <div class="grid__icon grid__icon_danger">婚</div>
                        <div class="placeholder">婚假</div>
                    </div>
                </div>
                <div class="weui-flex main-grid">
                    <div class="weui-flex__item" @click="apply(5, '产假')">
                        <div class="grid__icon grid__icon_primary">产</div>
                        <div class="placeholder">产假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(6, '陪产假')">
                        <div class="grid__icon grid__icon_info">陪</div>
                        <div class="placeholder">陪产假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(7, '病假')">
                        <div class="grid__icon grid__icon_warning">病</div>
                        <div class="placeholder">病假</div>
                    </div>
                    <div class="weui-flex__item" @click="apply(8, '奖励假')">
                        <div class="grid__icon grid__icon_dark-primary">奖<span class="weui-badge" v-show="rewardDays > 0">{{rewardDays}}</span></div>
                        <div class="placeholder">奖励假</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="leaveDrafts.length > 0" class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">请假草稿</div>
            <div class="weui-panel__bd">
                <div v-for="(item, index) in leaveDrafts" class="weui-media-box weui-media-box_text" :class="{'panel-tap': item.tap}" @click="toApply(item, index)">
                    <h4 class="weui-media-box__title">
                        {{name}}的请假
                        <span class="media-box__title_info">{{item.fcd}}</span>
                    </h4>
                    <p class="weui-media-box__desc">请假类型：{{item.typeText}}</p>
                    <p class="weui-media-box__desc">开始时间：{{item.startDate}}</p>
                    <p class="weui-media-box__desc">结束时间：{{item.endDate}}</p>
                    <p class="weui-media-box__desc" :class="item.stateClass" style="margin-top: 5px;">{{item.stateText}}</p>
                </div>
            </div>
        </div>
        <div v-if="leaveRecords.length > 0" class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">请假记录</div>
            <div class="weui-panel__bd">
                <div v-for="(item, index) in leaveRecords" class="weui-media-box weui-media-box_text" :class="{'panel-tap': item.tap}" @click="toDetail(item, index)">
                    <h4 class="weui-media-box__title">
                        {{name}}的请假
                        <span class="media-box__title_info">{{item.fcd}}</span>
                    </h4>
                    <p class="weui-media-box__desc">请假类型：{{item.typeText}}</p>
                    <p class="weui-media-box__desc">开始时间：{{item.startDate}}</p>
                    <p class="weui-media-box__desc">结束时间：{{item.endDate}}</p>
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
import store from '_s/index.js'

export default {
    name: 'leave-main',
    data () {
        return {
            name: '李明',
            leaveDrafts: [],
            leaveRecords: [],
            rewardDays: 1,
            annualDays: 2,
            overtimeDays: 0,
            loading: true
        }
    },
    created () {
        store.setRemainDays(this.overtimeDays, this.annualDays, this.rewardDays)
    },
    mounted () {
        this.leaveDrafts = this.leaveDrafts.concat([
            {
                id: '123',
                type: 7,
                typeText: '病假',
                fcd: '2018-9-12 15:00',
                startDate: '2018-8-13 10:00',
                endDate: '2018-9-13 18:00',
                state: '0',
                stateText: '待提交',
                stateClass: 'state-danger',
                fileList: ['http://n.sinaimg.cn/games/crawl/w500h375/20171217/_Kl0-fypsqka4874723.jpg'],
                reason: '生病',
                days: 1
            }
        ])

        this.leaveRecords = this.leaveRecords.concat([{
            id: '123',
            type: 7,
            typeText: '病假',
            fcd: '2018-9-12 15:00',
            startDate: '2018-8-13 9:00',
            endDate: '2018-9-13 18:00',
            state: '1',
            stateText: '审批中',
            stateClass: 'state-warning',
            fileList: ['http://n.sinaimg.cn/games/crawl/w500h375/20171217/_Kl0-fypsqka4874723.jpg', 'http://cimage.tianjimedia.com/uploadImages/thirdImages/2017/256/CRYWFZDWYL7K.jpg', 'http://www.xitongzhijia.net/uploads/allimg/171101/80-1G101164J6-50-water.jpg', 'http://5b0988e595225.cdn.sohucs.com/images/20171104/daa0378240c74043a50b3aca1537a05f.jpeg'],
            reason: '生病',
            days: 1
        },
        {
            id: '234',
            type: 7,
            typeText: '病假',
            fcd: '2018-9-12 15:00',
            startDate: '2018-8-13 9:00',
            endDate: '2018-9-13 18:00',
            state: '2',
            stateText: '审批通过',
            stateClass: 'state-success',
            fileList: [],
            reason: '生病',
            days: 1
        }])
        this.loading = false
    },
    methods: {
        apply (type, typeText) {
            store.setApplyData({ id: '123', type, typeText })
            this.$router.push({name: 'leave-apply'})
        },
        toDetail (item, index) {
            this.$set(this.leaveRecords[index], 'tap', true)
            item.name = this.name
            store.setApplyData(item)
            this.$router.push({name: 'leave-detail'})
        },
        toApply (item, index) {
            this.$set(this.leaveDrafts[index], 'tap', true)
            store.setApplyData(item)
            this.$router.push({name:'leave-apply'})
        }
    }
}
</script>

<style scoped>
.main-container {
    margin-top: 1em;
    margin-bottom: 30px;
}
.main-grid {
    text-align: center;
    margin-bottom: 1em;
}
.main-grid:last-child {
    margin-bottom: 0;
}
.panel-tap {
    background-color: #eee;
}
.media-box__title_info {
    float: right;
    font-size: 12px;
    color: #aaa;
}
.grid-container {
    padding: 15px 0;
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
.grid__icon .weui-badge {
    position: absolute;
    top: -.5em;
    right: -.5em;
}
.weui-flex__item {
    font-size: 13px;
}
.weui-loadmore__tips {
    background-color: #f8f8f8;
}
.weui-media-box__desc {
    font-size: 14px;
}
</style>
