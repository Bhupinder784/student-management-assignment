const readLine = require('readline-sync');
const {generateStudentList} = require('./StudentDetails')

const Students = generateStudentList();

function displayMenu() {
    console.log(`
        Menu:
        1) Take Test
        2) View Result
        3) View Students Result
        4) Exit
    `);
}

function calculateResult(student){
    if(!student.totalMarks || !student.percentage){
        const totalMarks = student.testScore.reduce((acc, test) => acc + test.marks, 0);
        const percentage = (totalMarks/ (student.testScore.length * 100)) * 100;

        student.totalMarks = totalMarks;
        student.percentage = percentage.toFixed(2);
    }
    return student;
}

function takeTest(){
    console.log("\nGenerating marks for all students...");
    Students.forEach(student => {
        student.testScore = ["Math", "Science", "English"].map(subject => ({
            subjectName : subject,
            marks : Math.floor(Math.random() * 51) + 0,
        }))
    });
    console.log("Test completed and marks updated for all students.\n");
    
}

function viewResult(){
    const rollNo = parseInt(readLine.question("\nEnter Roll No to view result: "));
    const student = Students.find(s => s.roll === rollNo);

    if(student){
        if(!student.testScore || student.testScore === 0){
            console.log("No test scores found for this student. Please take the test first.\n");
            return;
        }

        calculateResult(student);
        console.log(`\nResult for Roll No: ${rollNo}, Name: ${student.name}`);
        student.testScore.forEach(test => {
            console.log(`${test.subjectName}: ${test.marks}`);
        });
    }  else {
        console.log("\nStudent not found.\n");
    }
}

function viewAllResults(){
    console.log("\nAll students results:")
    Students.forEach(student => {
        if(!student.testScore || student.testScore.length === 0){
            console.log(`Roll No: ${student.roll}, Name: ${student.name} - No test scores available. Take the test first.`)
            return;
        }

        calculateResult(student);
        console.log(`Roll No: ${student.roll}, Name: ${student.name}`);
        console.log(`  Total Marks: ${student.totalMarks}`);
        console.log(`  Percentage: ${student.percentage}%`);
        console.log();
    })
}


function mainMenu(){
    while(true){
        displayMenu();
        const choice = readLine.question("Enter your choice: ");
        switch(choice){
            case '1' : 
                takeTest();
                break;
            case '2': 
                viewResult();   
                break;
            case '3':
                viewAllResults();
                break;
            case '4':
                console.log("\nExiting the program...");
                return;
            default : 
                console.log("\nInvalid choice. Please try again.\n")
        }
    }
}

mainMenu();