const storage = window.localStorage

export default {
    getApplyData () {
        let data = storage['applyData']
        return JSON.parse(data)
    },
    setApplyData (newVal) {
        newVal = JSON.stringify(newVal)
        storage['applyData'] = newVal
    },
    getRemainDays () {
        let data = storage['remainDays']
        return JSON.parse(data)
    },
    setRemainDays (overtimeDays, annualDays, rewardDays) {
        let data = {
            overtimeDays,
            annualDays,
            rewardDays
        }
        data = JSON.stringify(data)
        storage['remainDays'] = data
    }
}