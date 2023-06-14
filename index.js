function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    return array.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(date){
    const obj = {}

    obj.type = 'TimeIn'
    obj.hour = parseInt(date.slice(11, 13) + '00')
    obj.date = date.slice(0, 10)

    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(date){
    const obj = {}

    obj.type = 'TimeOut'
    obj.hour = parseInt(date.slice(11, 13) + '00')
    obj.date = date.slice(0, 10)

    this.timeOutEvents.push(obj)
    return this
}

function hoursWorkedOnDate(date){
    let timeIn = 0
    let timeOut = 0

    this.timeInEvents.forEach(element => {
        if (element.date === date){
            timeIn = element.hour
        }
    })

    this.timeOutEvents.forEach(element => {
        if (element.date === date){
            timeOut = element.hour
        }
    })

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(array, firstName){
    let record = {}
    array.forEach(element => {
        if (element.firstName === firstName){
            record = element
        }
    })
    return record
}

function calculatePayroll(array){
    return array.reduce((accum, current) => accum + allWagesFor.call(current), 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

