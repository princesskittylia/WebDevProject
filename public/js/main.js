document.getElementById('job-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const skills = document.getElementById('skills').value.split(',');
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;

    fetch('/search-jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills, education, experience })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('job-results');
        resultsDiv.innerHTML = data.map(job => `<div>${job.title} - ${job.description}</div>`).join('');
    })
    .catch(error => console.error('Error:', error));
});