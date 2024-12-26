// base url for json server

const baseUrl = "https://puzzled-prairie-bandicoot.glitch.me";
async function fetchQuestions() {
    try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
} catch (error){
    console.error('Error fetching data', error);
    return [];
}
}
//function to add new question

async function addQuestion(questionData) {
    try{
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });
       if (response.ok) {
           throw new Error('Failed to add question');
       }
       return await response.json();
    } catch (error) {
        console.error('Error adding question', error);
        return null;
    }
}
//fuction to update question review

async function updateQuestion(questionId, reviewStatus) {
    try {
        const response = await fetch(`${baseUrl}/${questionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({reviewStatus}),
        });
        if (!response.ok) {
            throw new Error('Failed to update question');
        }
        return true;
    } catch (error) {
        console.error('Error updating question', error);
        return false;
    }
}
//function to delete question

async function deleteQuestion(questionId) {
    try {
        const response = await fetch(`${baseUrl}/${questionId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete question');
        }
        return true;
    } catch (error) {
        console.error('Error deleting question', error);
        return false;
    }
}
//fuction to display questions on the page 

 function displayQuestions(questions) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach((question) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        if (question.reviewstatus){
            questionCard.classList.add('reviewed');
        }
        questionCard.innerHTML = `
        <h3>${question.title}</h3>
        <ul>
        <li>A: ${Question.optionA}</li>
        <li>B: ${Question.optionB}</li>
        <li>C: ${Question.optionC}</li>
        <li>D: ${Question.optionD}</li>
        </ul>
        <p>Correct Answer: ${Question.correctAnswer}</p>
        <button class="delete-btn">Delete</button>
        <button class="review-btn">Review</button>
        `;
        questionList.appendChild(questionCard);
    }); 
}
// event listener for form submission
const questionForm = document.getElementById('question-form');
questionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const questionData = {
        title: getElementById('question').value,
        optionA: getElementById('optionA').value,
        optionB: getElementById('optionB').value,
        optionC: getElementById('optionC').value,
        optionD: getElementById('optionD').value,
        correctOption: getElementById('correctOption').value,
        reviewStatus: false,
    };
    const question = await addQuestion(questionData);
    if (newQuestion){
        alert('Question added successfully');
        const questions = await fetchQuestions();
        displayQuestions(questions);
    }
});

//event listener for delete and review buttons
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const questionCard = event.target.parentElement;
        const questionId = questionCard.id;
        const deleted = await deleteQuestion(questionId);
        if (deleted) {
            alert('Question deleted successfully');
            const questions = await fetchQuestions();
            displayQuestions(questions);
        }
    }
    if (event.target.classList.contains('review-btn')) {
        const questionCard = event.target.parentElement;
        const questionId = questionCard.id;
        const reviewed = await updateQuestion(questionId, true);
        if (reviewed) {
            alert('Question reviewed successfully');
            const questions = await fetchQuestions();
            displayQuestions(questions);
        }
    }
});
fetchQuestions().then(displayQuestions);


