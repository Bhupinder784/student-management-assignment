const readLine = require('readline-sync');
const {generateStudentList} = require('./StudentDetails')

const Students = generateStudentList();

function displayMenu() {
    console.log(`
        Menu:
        1) Take Test
        2) View Result
        3) View Students Result
        4) View Classwise Result
        5) Details Analysis of Result
        6) Exit
    `);
}

function detailsAnalysisOfResult(){
    console.log("\nDetails Analysis of Results:");
    const classwiseAnalysis = {};

    Students.forEach(student => {
        if(!student.testScore || student.testScore.length === 0){
            return; 
        }

        const className = `Class ${student.class}`;
        if (!classwiseAnalysis[className]) {
            classwiseAnalysis[className] = {
                students: [],
                totalMarks: 0,
                totalPercentage: 0,
                failedCount: 0,
                passedCount: 0,
            };
        }
        classwiseAnalysis[className].students.push(student);
    })

    const analysisResults = [];
    for(const className in classwiseAnalysis){
        
        const { students } = classwiseAnalysis[className];
        console.log("abcd: ", students)
        const totalStudents = students.length;
        let totalMarks = 0;
        let totalPercentage = 0;
        let failedCount = 0;
        let passedCount = 0;

        students.forEach(student => {
            totalMarks += student.totalMarks;
            totalPercentage += parseFloat(student.percentage);
            if(student.percentage < 40){
                failedCount++;
            }else{
                passedCount++;
            }
        })

        const averageTotalMarks = (totalMarks / totalStudents).toFixed(2);
        const averagePercentage = (totalPercentage / totalStudents).toFixed(2);
        const failedPercentage = ((failedCount / totalStudents) * 100).toFixed(2);
        const passedPercentage = ((passedCount / totalStudents) * 100).toFixed(2);

        let overallGrade;
        if(averagePercentage >= 85){
            overallGrade  = 'A';
        }else if(averagePercentage >= 70){
            overallGrade = 'B';
        }else if(averagePercentage >= 50){
            overallGrade = 'C'
        }else{
            overallGrade = 'D';
        }

        analysisResults.push({
            className,
            totalStudents,
            averageTotalMarks,
            averagePercentage,
            overallGrade,
            failedCount,
            failedPercentage,
            passedCount,
            passedPercentage
        })
    }

    console.log("\nClass | Total Students | Avg Marks | Avg % | Grade | Failed Count | Failed % | Passed Count | Passed %");
    console.log("-----------------------------------------------------------------------------------------------");
    analysisResults.forEach(result => {
        console.log(
            `${result.className} | ${result.totalStudents} | ${result.averageTotalMarks} | ${result.averagePercentage}% | ${result.overallGrade} | ${result.failedCount} | ${result.failedPercentage}% | ${result.passedCount} | ${result.passedPercentage}%`
        )
    })
    console.log();
}

function takeTest(){
    console.log("\nGenerating marks for all students...");
    Students.forEach(student => {
        student.testScore = ["Math", "Science", "English"].map(subject => ({
            subjectName : subject,
            marks : Math.floor(Math.random() * 51) + 0,
        }))

        const totalMarks = student.testScore.reduce((acc, test) => acc + test.marks, 0);
        const percentage = (totalMarks / (student.testScore.length * 100)) * 100;

        student.totalMarks = totalMarks;
        student.percentage = percentage.toFixed(2);
    });

    console.log("Test completed and marks updated for all students.\n");
    
}

function viewResult(){
    const rollNo = parseInt(readLine.question("\nEnter Roll No to view result: "));
    const student = Students.find(s => s.roll === rollNo);

    if(student){
        if (!student.testScore || student.testScore.length === 0) {
            console.log("The student has not taken the test yet. Please take the test first.\n");
            return;
        }

        // calculateResult(student);
        console.log(`\nResult for Roll No: ${rollNo}, Name: ${student.name}`);

        student.testScore.forEach(test => {
            console.log(`${test.subjectName}: ${test.marks}`);
        });

        console.log(`Total Marks: ${student.totalMarks}`);
        console.log(`Percentage: ${student.percentage}%\n`);
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

        // calculateResult(student);
        console.log(`Roll No: ${student.roll}, Name: ${student.name}`);
        console.log(`  Total Marks: ${student.totalMarks}`);
        console.log(`  Percentage: ${student.percentage}%`);
        console.log();
    })
}

function viewClasswiseResult(){
    console.log("\nClasswise Results:");

    const classwiseResults = {}
    Students.forEach(student => {
        if(!student.testScore || student.testScore.length === 0){
            return;
        }

        // calculateResult(student);
        const className = `Class ${student.class}`;
        if(!classwiseResults[className]){
            classwiseResults[className] = [];
        }

        classwiseResults[className].push(student);
    });

    for(const className in classwiseResults){
        console.log(`\nResults for ${className}:`)
        classwiseResults[className].forEach(student => {
            console.log(`Roll No: ${student.roll}, Name: ${student.name}`);
            console.log(`  Total Marks: ${student.totalMarks}`);
            console.log(`  Percentage: ${student.percentage}%`);
            console.log();
            console.log("----------------------------")
        })
    }
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
            case '4' :
                viewClasswiseResult();
                break;
            case '5' :
                detailsAnalysisOfResult();
                break;
            case '6':
                console.log("\nExiting the program...");
                return;
            default : 
                console.log("\nInvalid choice. Please try again.\n")
        }
    }
}

mainMenu();