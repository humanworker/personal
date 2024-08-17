document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blog-form');
    const input = document.getElementById('blog-input');
    const entriesContainer = document.getElementById('blog-entries');

    let entries = [];

    // Load existing entries
    fetch('entries.json')
        .then(response => response.json())
        .then(data => {
            entries = data;
            renderEntries();
        })
        .catch(() => {
            console.log('No existing entries found');
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim() === '') return;

        const newEntry = {
            content: input.value,
            date: new Date().toISOString()
        };

        entries.unshift(newEntry);
        saveEntries();
        renderEntries();
        input.value = '';
    });

    function renderEntries() {
        entriesContainer.innerHTML = entries.map(entry => `
            <div class="blog-entry">
                <p>${entry.content}</p>
                <p class="date">${new Date(entry.date).toLocaleString()}</p>
            </div>
        `).join('');
    }

    function saveEntries() {
        const blob = new Blob([JSON.stringify(entries)], {type: 'application/json'});
        const formData = new FormData();
        formData.append('file', blob, 'entries.json');

        fetch('/.netlify/functions/save-entries', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Entries saved successfully');
        }).catch(error => {
            console.error('Error saving entries:', error);
        });
    }
});