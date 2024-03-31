import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code 
let mybalance = 5000;
let myPin = 5678;
// Print Welcome message
console.log(chalk.blue("\n \tWelcome to ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance is ${mybalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > mybalance) {
                console.log("Insufficient Balance");
            }
            else {
                mybalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${mybalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > mybalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                mybalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${mybalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${mybalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
