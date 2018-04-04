var config = {
    apiKey: "AIzaSyA8S1q1xWJzLW9a1PgPvakPvz9JEVGL4qg",
    authDomain: "employeeofthemonth25.firebaseapp.com",
    databaseURL: "https://employeeofthemonth25.firebaseio.com",
    projectId: "employeeofthemonth25",
    storageBucket: "",
    messagingSenderId: "366252577684"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit-button").on("click", function (e) {
    e.preventDefault();
    var employeeName = $('#employeeName').val().trim();
    var role = $('#role').val().trim();
    var startDate = $('#startDate').val().trim();
    var monthlyRate = $('#monthlyRate').val().trim();

    database.ref().push({
        employeeName,
        role,
        startDate,
        monthlyRate
    })

});


database.ref().on("child_added", function (snapshot) {
    console.log("child added:", snapshot.val())
    console.log('snapshot:', snapshot.val().employeeName)
    employeeTable = $('#employee-table')
    console.log(employeeTable)
    employeeRow = $('<tr>')
    employeeNameColumn= $('<td>')
    employeeNameColumn.text(snapshot.val().employeeName)
    employeeRoleColumn= $('<td>')
    employeeRoleColumn.text(snapshot.val().role)
    employeestartDateColumn= $('<td>')
    employeestartDateColumn.text(snapshot.val().startDate)
    employeeMonthlyRateColumn= $('<td>')
    employeeMonthlyRateColumn.text(snapshot.val().monthlyRate)
    employeeMonthsWorkedColumn= $('<td>')
    

    vStartDate = snapshot.val().startDate
    now=moment();
    months = now.diff(vStartDate, 'months');
    employeeMonthsWorkedColumn.text(months)

    employeeTotalBilledColumn= $('<td>')
    vTotalBilled = months* snapshot.val().monthlyRate
    employeeTotalBilledColumn.text(vTotalBilled)

    employeeRow.append(employeeNameColumn)
    employeeRow.append(employeeRoleColumn)
    employeeRow.append(employeestartDateColumn)
    employeeRow.append(employeeMonthsWorkedColumn)
    employeeRow.append(employeeMonthlyRateColumn)
    employeeRow.append(employeeTotalBilledColumn)
    employeeTable.append(employeeRow)

})