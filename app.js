#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    ID;
    balance;
    courses;
    tuitionFees;
    constructor(name) {
        this.name = name;
        this.ID = Math.floor(Math.random() * 89000 + 10000);
        this.courses = []; //initializing an empty array
        this.balance = 0; //by default 0
        this.tuitionFees = 0;
    }
    //method for enrolling students
    enrollStudent(course) {
        this.courses.push(course);
    }
    //method for adding balance
    addBalance(amount) {
        this.balance += amount;
        console.log(chalk.green(`BALANCE HAS BEEN INCREASED BY ${chalk.magenta(amount)}, NEW BALANCE IS: ${chalk.magenta(this.balance)}`));
    }
    //method for viewing balance
    viewBalance() {
        console.log(chalk.green(`BALANCE IS: ${chalk.magenta(this.balance)}`));
    }
    //method for paying tuition fees
    payTuitionFees(amount) {
        if (amount > this.balance) {
            console.log(chalk.red("INSUFFICIENT BALANCE!, PLEASE ADD SOME MONEY IN YOUR BALANCE..."));
        }
        else {
            this.balance -= amount;
            this.tuitionFees = 0;
            console.log(chalk.green("TUTION FEES HAS BEEN PAID!"));
            console.log(chalk.magenta(`YOUR REMAINING BALANCE IS ${this.balance}`));
        }
    }
    //method for showing status
    showStatus() {
        console.log(chalk.green(`NAME: ${chalk.magenta(this.name)}`));
        console.log(chalk.green(`ID: ${chalk.magenta(this.ID)}`));
        console.log(chalk.green(`BALANCE: ${chalk.magenta(this.balance)}`));
        console.log(chalk.green(`REMAINING TUITION FEES: ${chalk.magenta(this.tuitionFees)}`));
        console.log(chalk.green(`COURSES ENROLLED: ${chalk.magenta(this.courses)}`));
    }
}
//making a class for students management:
class Student_Management {
    students;
    constructor() {
        this.students = [];
    }
    //for adding new students:
    add_student(name) {
        let student = new Student(name); //making a new object using class Student
        this.students.push(student); //inheriting properties present in Student class
        console.log(chalk.green(`STUDENT ${chalk.magenta(name)} HAS BEEN ADDED SUCCESSFULLY!`));
    }
    //for enrolling in course
    enroll_student(id, course) {
        let student = this.find_Student(id);
        if (student) {
            student.enrollStudent(course);
            student.tuitionFees += 100;
            console.log(`STUDENT ${chalk.magenta(student.name)} HAS BEEN ENROLLED IN ${chalk.magenta(course)} SUCCESSFULLY!`);
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for add balance
    add_Balance(id, Amount) {
        let student = this.find_Student(id);
        if (student) {
            student.addBalance(Amount);
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for viewing balance
    view_Balance(id) {
        let student = this.find_Student(id);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for paying tuition fees
    pay_TuitionFees(id, amount) {
        let student = this.find_Student(id);
        if (student) {
            if (student.tuitionFees == 0) {
                console.log(chalk.red("YOUR TUITION FEES HAS ALREADY PAID!"));
            }
            if (amount === student.tuitionFees) {
                student.payTuitionFees(amount);
                student.tuitionFees -= amount;
            }
            if (amount > student.tuitionFees) {
                let newAmount = amount - student.tuitionFees;
                student.balance += newAmount;
                student.payTuitionFees(amount);
                console.log(chalk.green(`YOU HAVE GIVEN AN EXTRA AMOUNT OF ${newAmount}, YOU HAVE RECIEVED BACK ${newAmount}`));
            }
            else {
                console.log(chalk.red("AMOUNT IS NOT EQUAL TO THE REQUIRED AMOUNT!"));
            }
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for showing status
    show_Status(id) {
        let student = this.find_Student(id);
        if (student) {
            console.log(chalk.green(`**********STATUS**********`));
            student.showStatus();
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for removing students:
    remove_Student(id) {
        let student = this.find_Student(id);
        if (student) {
            let newStudents = this.students.filter((val) => id !== val.ID);
            this.students = newStudents;
            console.log("-----------", chalk.magenta(student.name), chalk.green("HAS BEEN REMOVED!"), "-----------");
        }
        else {
            console.log(chalk.red("PLEASE GIVE RELEVANT ID!"));
        }
    }
    // for DRY work:
    find_Student(id) {
        return this.students.find((std) => std.ID === id); //using array method find to find the student whose id will be given
    }
}
// main work start:
async function main() {
    console.log("-".repeat(25), chalk.bgMagenta("WELCOME TO STUDENT MANAGEMENT SYSTEM!!!"), "-".repeat(25));
    console.log("-".repeat(100));
    // for accessing all methods of class:
    let std = new Student_Management();
    let condition = true;
    while (condition) {
        // using inquirer for user input:
        let operation = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellow("WHAT WOULD YOU LIKE TO DO?"),
            choices: [
                "ADD STUDENT",
                "REMOVE STUDENT",
                "SHOW STATUS",
                "ADD BALANCE",
                "VIEW BALANCE",
                "ENROLL IN COURSE",
                "PAY TUITION FEES",
                "EXIT",
            ],
        });
        if (operation.select === "ADD STUDENT") {
            let adding = await inquirer.prompt({
                name: "studentName",
                type: "input",
                message: chalk.yellow("WRITE NAME OF STUDENT, YOU WANT TO ADD..."),
                validate: function (value) {
                    //VALIDATING so that name should be something rather than empty
                    if (value.trim() !== "") {
                        return true;
                    }
                    else {
                        return chalk.red("VALUE SHOULD NOT BE EMPTY!");
                    }
                },
            });
            std.add_student(adding.studentName);
            console.log(std.students);
            console.log("-".repeat(100));
        }
        if (operation.select === "REMOVE STUDENT") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let remove = await inquirer.prompt({
                    name: "removing",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID YOU WANT TO REMOVE..."),
                });
                std.remove_Student(remove.removing);
                console.log("-".repeat(100));
            }
        }
        if (operation.select === "SHOW STATUS") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let showingStatus = await inquirer.prompt({
                    name: "showStatus",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID WHOSE STATUS YOU WANT TO SEE..."),
                });
                std.show_Status(showingStatus.showStatus);
                console.log("-".repeat(100));
            }
        }
        if (operation.select === "ADD BALANCE") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let adding = await inquirer.prompt({
                    name: "add",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID WHOSE BALANCE YOU WANT TO INCREASE..."),
                });
                let addingBalance = await inquirer.prompt({
                    name: "add",
                    type: "number",
                    message: chalk.yellow("HOW MUCH AMOUNT DO YOU WANT TO ADD?")
                });
                std.add_Balance(adding.add, addingBalance.add);
            }
        }
        if (operation.select === "VIEW BALANCE") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let viewingBalance = await inquirer.prompt({
                    name: "viewBalance",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID WHOSE BALANCE YOU WANT TO SEE..."),
                });
                std.view_Balance(viewingBalance.viewBalance);
                console.log("-".repeat(100));
            }
        }
        if (operation.select === "ENROLL IN COURSE") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let enrolling = await inquirer.prompt({
                    name: "enroll",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID YOU WANT TO ENROLL IN A COURSE..."),
                });
                console.log(chalk.bgRed("NOTE:"), chalk.red("EACH COURSE WILL CHARGE 100$!"));
                let enrollingCourse = await inquirer.prompt({
                    name: "enroll",
                    type: "list",
                    message: chalk.yellow("SELECT THE COURSE YOU WANT TO ENROLLED THE STUDENT..."),
                    choices: ["TYPESCRIPT", "JAVASCRIPT", "HTML", "CSS", "PYTHON", "NEXT.JS"]
                });
                std.enroll_student(enrolling.enroll, enrollingCourse.enroll);
                console.log("-".repeat(100));
            }
        }
        if (operation.select === "PAY TUITION FEES") {
            if (std.students.length === 0) {
                console.log(chalk.red("NO STUDENTS PRESENT PLEASE ADD SOME..."));
            }
            else {
                let paying = await inquirer.prompt({
                    name: "pay",
                    type: "number",
                    message: chalk.yellow("INPUT STUDENT'S ID WHOSE TUITION FEES YOU WANT TO PAY...")
                });
                let payingAmount = await inquirer.prompt({
                    name: "pay",
                    type: "number",
                    message: chalk.yellow("INPUT AMOUNT YOU WANT TO PAY...")
                });
                std.pay_TuitionFees(paying.pay, payingAmount.pay);
                console.log("-".repeat(100));
            }
        }
        if (operation.select === "EXIT") {
            // process.exit()
            // OR 
            condition = false;
        }
    }
}
main();
