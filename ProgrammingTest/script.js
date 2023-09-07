
const personList = document.getElementById('person-list');
const nextPersonButton = document.getElementById('next-person');

let currentIndex = 0;
const batchSize = 3;

async function loadNextBatch() {
    try {
        const response = await fetch('data.json'); 
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();

        const currentBatch = data.slice(currentIndex, currentIndex + batchSize);

        if (currentBatch.length > 0) {
            personList.innerHTML = '';
            currentBatch.forEach((person, index) => {
                const personInfo = document.createElement('div');

                const recordNumber = currentIndex + index + 1; 
                const recordNumberElement = document.createElement('p');
                recordNumberElement.className = 'record-number';
                recordNumberElement.textContent = `Record ${recordNumber}:`;
                personInfo.appendChild(recordNumberElement);

                const nameElement = document.createElement('p');
                nameElement.className = 'name';
                nameElement.textContent = `Name: ${person.name}`;
                personInfo.appendChild(nameElement);

                const locationElement = document.createElement('p');
                locationElement.className = 'location';
                locationElement.textContent = `Location: ${person.location}`;
                personInfo.appendChild(locationElement);

                personList.appendChild(personInfo);
            });
            const message = document.createElement('p');
            message.textContent = `Currently showing 3 people.`;
            personList.appendChild(message);

            currentIndex += batchSize;
        } else {
            alert('No more people!');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
nextPersonButton.addEventListener('click', loadNextBatch);
loadNextBatch();
