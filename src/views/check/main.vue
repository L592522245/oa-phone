<template>
    <div class="main-container">
        <div id="mapContainer" class="map-container"></div>
        <div class="check-container" :class="{'active': !checkIn}">
            <p class="check-other-info">上班时间{{amStart}}</p>
            <div v-if="!checkIn">
                <a class="check-btn" :class="{'disabled': disabled, 'disabled': gettingLocation}" href="javascript:;" @click="check">
                    <div v-show="!gettingLocation">
                        <span class="check-btn__word">上班打卡</span>
                        <span class="check-btn__time">{{nowTime}}</span>
                    </div>
                    <div v-show="gettingLocation" class="getting-location">
                        <span class="check-btn__word">定位中</span>
                    </div>
                </a>
                <p class="check-desc" v-show="!gettingLocation"><i :class="{'weui-icon-success': !disabled, 'weui-icon-warn': disabled}"></i><span>{{locationLabel}}<span class="location" @click.stop="toLocation">{{locationName}}</span></span></p>
            </div>
            <p v-if="checkIn" class="check-time">
                <span>打卡时间{{checkInTime}}</span>
                <span class="check-mark" :class="checkInState">{{checkInStateText}}</span>
            </p>
            <p v-if="checkIn" class="check-other-info">{{checkInLocation}}</p>
        </div>
        <div class="check-container" :class="{'active': checkIn && !checkOut}">
            <p class="check-other-info">下班时间{{pmEnd}}</p>
            <div v-if="checkIn && !checkOut">
                <a class="check-btn" :class="{'disabled': disabled}" href="javascript:;" @click="check">
                    <div>
                        <span class="check-btn__word">下班打卡</span>
                        <span class="check-btn__time">{{nowTime}}</span>
                    </div>
                </a>
                <p class="check-desc"><i :class="{'weui-icon-success': !disabled, 'weui-icon-warn': disabled}"></i><span>{{locationLabel}}<span class="location" @click.stop="toLocation">{{locationName}}</span></span></p>
            </div>
            <p v-if="checkOut" class="check-time">
                <span>打卡时间{{checkOutTime}}</span>
                <span class="check-mark" :class="checkOutState">{{checkOutStateText}}</span>
            </p>
            <p v-if="checkOut" class="check-other-info">{{checkOutLocation}}</p>
        </div>
    </div>
</template>

<script>
import util from '@/util'
import weui from 'weui.js'

export default {
    name: 'check-main',
    data () {
        return {
            nowTime: new Date().format('hh:mm'),
            amStart: '9:00',
            pmEnd: '18:00',
            checkIn: false,
            checkInTime: null,
            checkInState: '',
            checkInStateText: '',
            checkInLocation: '',
            checkOut: false,
            checkOutTime: null,
            checkOutState: '',
            checkOutStateText: '',
            checkOutLocation: '',
            disabled: false,
            locationLabel: '已进入打卡范围：',
            locationName: '',
            locationSrc: '',
            gettingLocation: true
        }
    },
    created () {
        let _this = this

        setInterval(() => {
            this.nowTime = new Date().format('hh:mm')
        }, 1000)

        wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，企业微信的corpID
            timestamp: 0, // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '', // 必填，签名，见附录1
            jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        // this.disabled = true
        // this.locationLabel = '未进入打卡范围：'

    },
    mounted () {
        let _this = this

        _this.disabled = true
        _this.gettingLocation = true

        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                console.log(res)
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
            }
        })

        _this.disabled = false
        _this.locationName = 'name'
        _this.gettingLocation = false

        const map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            center: [116.481181, 39.989792],
            zoom: 16
        })

        map.clearMap()
        const marker = new AMap.Marker({
            map: map,
            position: [116.481181, 39.989792]
        })

        /*AMap.plugin('AMap.Geolocation', function() {
            const geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
                markerOptions: '',
            })
            map.addControl(geolocation)

            geolocation.getCurrentPosition(function(status, result) {
                if (status == 'complete') {
                    _this.onComplete(result)
                } else {
                    _this.onError(result)
                }
            })

            setInterval(() => {
                geolocation.getCurrentPosition(function(status, result) {
                    if (status == 'complete') {
                        _this.onComplete(result)
                    } else {
                        _this.onError(result)
                    }
                })
            }, 10000)
            
        })*/

    },
    methods: {
        onComplete (data) {
            // data是具体的定位信息
            // console.log(data)

            this.disabled = false
            this.locationName = data.formattedAddress
            this.gettingLocation = false
        },
        onError (data) {
            // 定位出错
            this.disabled = true
            this.locationLabel = '定位失败'
        },
        check () {
            let _this = this
            if (!_this.disabled) {
                weui.confirm('确定要打卡吗？', {
                    title: '提示',
                    buttons: [{
                        label: '不打卡',
                        type: 'default',
                        onClick: function() {}
                    }, {
                        label: '打卡',
                        type: 'primary',
                        onClick: function() {
                            if (!_this.disabled) {
                                let loading = weui.loading('loading', {
                                    content: '打卡中'
                                })
                                setTimeout(() => {
                                    loading.hide()
                                    weui.toast('打卡成功', 2000)
                                    if (!_this.checkIn) {
                                        _this.handleCheckIn()
                                    } else if (_this.checkIn && !_this.checkOut) {
                                        _this.handleCheckOut()
                                    }
                                }, 1000)
                            }
                        }
                    }]
                })
            } else {
                if (!_this.gettingLocation) {
                    weui.confirm('未进入打卡范围！', {
                        title: '提示',
                        buttons: [{
                            label: '确定',
                            type: 'primary'
                        }]
                    })
                }
            }
        },
        handleCheckIn () {
            this.checkIn = true
            this.checkInTime = new Date().format('hh:mm')

            let time = new Date().format('yyyy-MM-dd')
            let checkInTime = util.getNewDate(time + ' ' + this.checkInTime)
            time = util.getNewDate(time + ' ' + this.amStart)
            if (checkInTime.getTime() < time.getTime()) {
                this.checkInStateText = '正常'
                this.checkInState = 'state-success'
            } else {
                this.checkInStateText = '迟到'
                this.checkInState = 'state-warning'
            }
            this.checkInLocation = this.locationName

        },
        handleCheckOut () {
            this.checkOut = true
            this.checkOutTime = new Date().format('hh:mm')

            let time = new Date().format('yyyy-MM-dd')
            let checkOutTime = util.getNewDate(time + ' ' + this.checkOutTime + ':00')
            time = util.getNewDate(time + ' ' + this.pmEnd + ':00')
            if (checkOutTime.getTime() < time.getTime()) {
                this.checkOutStateText = '早退'
                this.checkOutState = 'state-warning'
            } else {
                this.checkOutStateText = '正常'
                this.checkOutState = 'state-success'
            }
            this.checkOutLocation = this.locationName
        },
        toLocation () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed // 速度，以米/每秒计
                    var accuracy = res.accuracy // 位置精度

                    wx.openLocation({
                        latitude,
                        longitude,
                        name: '', // 位置名
                        address: '', // 地址详情说明
                        scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为16
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.main-container {
    margin-bottom: 50px;
}
.map-container {
    width: 100%;
    height: 200px;
    background-color: #fff;
    margin-bottom: .5em;
    border: none;
}
.check-container {
    position: relative;
    padding: 15px 40px;
}
.check-container:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 15px;
    border: 4px solid #ccc;
    z-index: 99;
}
.check-container.active:before {
    border-color: #2d8cf0;
}
.check-container:after {
    content: "";
    background-color: #ccc;
    position: absolute;
    top: 20px;
    left: 1.16em;
    width: 1px;
    height: 100%;
}
.check-container:last-child:after {
    content: none;
}
.check-btn {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    margin: 20px auto 0;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 3px 15px #76baff;
    /*background-color: #5cadff;*/
    background: linear-gradient(#8dc3fb, #57a2ef, #46a1fb, #2b90f7);
}
.check-btn:active {
    background: #8ac4ff;
}
.check-btn.disabled {
    background: #8ac4ff;
}
.check-btn span {
    display: block;
}
.check-btn div {
    margin-top: 20px;
}
.check-btn__word {
    color: #fff;
    font-size: 18px;
}
.check-btn__time {
    color: #eee;
    font-size: 14px;
}
.check-other-info {
    font-size: 14px;
    color: #888;
}
.check-time {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin: 5px 0;
}
.check-time span {
    vertical-align: middle;
}
.check-mark {
    border: 1px solid;
    border-radius: 3px;
    font-size: 12px;
    margin-left: 1em;
    padding: 1px 4px;
}
.check-desc {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: #666;
}
.check-desc i {
    font-size: 12px;
    margin-bottom: .2em;
}
.location {
    font-weight: bold;
    text-decoration: underline;
}
/*.location:active {
    color: #999;
}*/
.getting-location {
    margin-top: 0 !important;
}
</style>
