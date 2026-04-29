// Navigation Logic
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Data Handling
const resultForm = document.getElementById('resultForm');
const resultsBody = document.getElementById('resultsBody');

// Load data on startup
document.addEventListener('DOMContentLoaded', displayResults);

resultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const marks = document.getElementById('marks').value;

    const result = { subject, marks, id: Date.now() };
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    
    results.push(result);
    localStorage.setItem('examResults', JSON.stringify(results));
    
    resultForm.reset();
    displayResults();
});

function displayResults() {
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    resultsBody.innerHTML = results.map(res => `
        <tr>
            <td>${res.subject}</td>
            <td>${res.marks}</td>
            <td><button onclick="deleteResult(${res.id})" style="color:red">Delete</button></td>
        </tr>
    `).join('');
}

function deleteResult(id) {
    let results = JSON.parse(localStorage.getItem('examResults'));
    results = results.filter(res => res.id !== id);
    localStorage.setItem('examResults', JSON.stringify(results));
    displayResults();
}
