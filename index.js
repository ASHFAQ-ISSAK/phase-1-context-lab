/* Your Code Here */

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


// This function takes an array with employee details and creates an object with those details
function createEmployeeRecord(employeeArray){
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  // This function takes an array of arrays with employee details and maps each array to an employee object using createEmployeeRecord function
  function createEmployeeRecords(employeesArray){
    return employeesArray.map(employee => createEmployeeRecord(employee))  
  }
  
  // This function creates a timeIn event object and pushes it into the timeInEvents array of an employee object
  function createTimeInEvent(dateStamp) {
    let dateTime = dateStamp.split(" ");
    let date = dateTime[0];
    let time = parseInt(dateTime[1]);
  
    let timeIn = {
      type: "TimeIn",
      hour: time,
      date: date
    };
  
    this.timeInEvents.push(timeIn);
    return this;
  }
  
  // This function creates a timeOut event object and pushes it into the timeOutEvents array of an employee object
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }
  
  // This function finds an employee's timeIn and timeOut event objects for a specific date and calculates the hours worked between those events
  function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(function(e) {
      return e.date === date;
    });
  
    let timeOutEvent = this.timeOutEvents.find(function(e) {
      return e.date === date;
    });
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // This function calculates an employee's wages earned on a specific date based on their hours worked and pay rate
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }
  
  // This function finds an employee object in a collection based on their first name
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(function(employee) {
      return employee.firstName === firstNameString
    })
  }
  
  // This function calculates the total wages earned by all employees in a collection
  function calculatePayroll(employeeRecords) {
    let allWages = 0;
  
    for (let i = 0; i < employeeRecords.length; i++) {
      allWages += allWagesFor.call(employeeRecords[i]);
    }
  
    return allWages;
  }
  