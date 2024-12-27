function getRandomInt(min, max){
    return Math.floor(Math.random() * (max- min + 1)) + min;
}

function getRandomName(){
    const firstNames = ["John", "Emma", "Liam", "Sophia", "Noah", "Olivia", "James", "Ava", "Elijah", "Isabella"];
    const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Moore", "Jackson", "White", "Harris"];
    return `${firstNames[getRandomInt(0, firstNames.length - 1)]} ${lastNames[getRandomInt(0, lastNames.length - 1)]}`;
}

function generateStudentList(){
    const students = [];
    for(let i = 1; i <= 25; i++){
        students.push({
            roll : 100 + i,
            name : getRandomName(),
            class : getRandomInt(1, 5),
            gender : getRandomInt(0, 1) === 0 ? 'male' : 'Female',
            testScore: [],
        })
    }

    return students;
}

// const studentsList = generateStudentList();
// console.log(studentsList);
module.exports =  {generateStudentList}