let loggedInUser = localStorage.getItem("loggedkey");
let head1 = document.getElementById("head");
if (loggedInUser) {
    head1.innerHTML = `Welcome ${loggedInUser}`;
}

function logout(){
    window.location = './index.html';
}

let expElm = document.getElementById("exp");
let balElm = document.getElementById("bal");
let amtElm = document.getElementById("amt");

function setamt() {
    let totalAmt = document.getElementById("totAmt").value;

    if (totalAmt === "") {
        alert("Enter the amount!");
    } else {
        // Increment budget when setting a new budget
        let newTotal = parseFloat(localStorage.getItem('totalAmount')) || 0;
        newTotal += parseFloat(totalAmt);
        localStorage.setItem('totalAmount', newTotal.toFixed(2));

        amtElm.innerHTML = newTotal;
        balElm.innerHTML = newTotal;

        localStorage.setItem('total', totalAmt);
        alert("Amount Added");
    }
}

function checkamt() {

    let exptype = document.getElementById("expType").value;
    let expamt = document.getElementById("expAmt").value;

    if (expamt === "" || exptype === "") {
        alert("Please enter the amount and type");
    } else {
        let totalAmt = parseFloat(localStorage.getItem('total')) || 0;
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let newTotalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;

        // Update total expenses
        newTotalExpenses += parseFloat(expamt);
        localStorage.setItem('totalExpenses', newTotalExpenses.toFixed(2));

        let newTotal = parseFloat(localStorage.getItem('totalAmount')) || 0;
        let newBalance = newTotal - parseFloat(newTotalExpenses);
        expenses.push({ type: exptype, amount: expamt,budget:newTotal, balance: newBalance });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expElm.innerHTML = newTotalExpenses.toFixed(2);
        balElm.innerHTML = `${newBalance.toFixed(2)}`;
        alert("Expense Added");
        displayExpenses();
    }
}



//function to add expense to a list using type and amt
function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expensedetails = document.getElementById("expensedetails");
    let tableHTML = "";

    expenses.forEach(expense => {
        tableHTML += `
        
        <tr>
        <td>${expense.type}</td>
        <td>${expense.amount}</td>
        <td>${expense.budget}</td>
        <td>${expense.balance}</td></tr>`;
    });
    expensedetails.innerHTML = tableHTML;
}

function clearrecord(){
    let ask = confirm("Are you sure to delete all data ?")
    if(ask){
        document.getElementById("expForm").reset();
        document.getElementById("setForm").reset();
        amtElm.innerHTML = "0";  
        expElm.innerHTML = "0"; 
        balElm.innerHTML = "0"; 
        document.getElementById("expensedetails").innerHTML = '';
        localStorage.clear();
}
alert("Cleared all data successfully");
}