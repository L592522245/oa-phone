Date.prototype.format = function(f){
    var o ={
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(f))f=f.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(f))f = f.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));return f
}

export default {
	formatDatetimeLocalStr (date) {
		let u = navigator.userAgent
		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

		// ios 时间格式要为 2018/9/14
		if (isiOS) {
			date = date.replace(/-/g, '/')
		}

		let today

		if (date) {
			today = new Date(date)
		} else {
			today = new Date()
		}
		let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
        let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours()
        let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
        let dateStr = today.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':00'
        return dateStr
	},
    getNewDate(date) {
        let u = navigator.userAgent
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

        // ios 时间格式要为 2018/9/14
        if (isiOS) {
            date = date.replace(/-/g, '/')
        }

        return new Date(date)
    }
}