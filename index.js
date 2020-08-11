/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray) {
  let employeeHash = {}

  employeeHash.firstName = employeeArray[0]
  employeeHash.familyName = employeeArray[1]
  employeeHash.title = employeeArray[2]
  employeeHash.payPerHour = employeeArray[3]
  employeeHash.timeInEvents = []
  employeeHash.timeOutEvents = []

  return employeeHash
}

function createEmployeeRecords(employeeArrays) {
  return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray))
}

function createTimeInEvent(datestamp) {
  // 2014-02-28 1400

  let dateHash = {}

  dateHash.type = "TimeIn"
  dateHash.hour = parseInt(datestamp.split(" ")[1])
  dateHash.date = datestamp.split(" ")[0]

  this.timeInEvents.push(dateHash)
  return this
}

function createTimeOutEvent(datestamp) {
  // 2014-02-28 1400

  let dateHash = {}

  dateHash.type = "TimeOut"
  dateHash.hour = parseInt(datestamp.split(" ")[1])
  dateHash.date = datestamp.split(" ")[0]

  this.timeOutEvents.push(dateHash)
  return this
}

function hoursWorkedOnDate(datestamp) {
  // { firstName: 'Julius',
  // familyName: 'Caesar',
  // title: 'General',
  // payPerHour: 1000,
  // timeInEvents: [ { type: 'TimeIn', hour: 900, date: '44-03-15' } ],
  // timeOutEvents: [ { type: 'TimeOut', hour: 1100, date: '44-03-15' } ] }

  // 44-03-15

  let timeIn = this.timeInEvents.find(hash => hash.date === datestamp).hour
  let timeOut = this.timeOutEvents.find(hash => hash.date === datestamp).hour
  let hoursWorked = (timeOut-timeIn)/100

  return hoursWorked
}

function wagesEarnedOnDate(datestamp) {
  // { firstName: 'Julius',
  //   familyName: 'Caesar',
  //   title: 'General',
  //   payPerHour: 27,
  //   timeInEvents: [ { type: 'TimeIn', hour: 900, date: '44-03-15' } ],
  //   timeOutEvents: [ { type: 'TimeOut', hour: 1100, date: '44-03-15' } ] }

  // 44-03-15

  let wagesEarned = hoursWorkedOnDate.call(this, datestamp) * this.payPerHour
  return wagesEarned
}

function findEmployeeByFirstName(arrayEmployeeRecords, firstName) {
  return arrayEmployeeRecords.find(hash => hash.firstName === firstName)
}
