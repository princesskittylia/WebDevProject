function checkSpelling() {
  
  const userInput = document.getElementById('textInput').value;

  const dictionary = new Typo('en_US', false, false, {
    dictionaryPath: 'dictionaries',
  });

  const isCorrect = dictionary.check(userInput);

  if (isCorrect) {
    alert('Your spelling is good!');
  } else {
    const suggestions = dictionary.suggest(userInput);

    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '<p>Did you mean:</p><ol>';
    suggestions.forEach(suggestion => {
      suggestionsList.innerHTML += `<li>${suggestion}</li>`;
    });
    suggestionsList.innerHTML += '</ol>';
  }
}

function capitalizeFirstLetter(sentence) {
  return sentence.replace(/(^\w{1})|([\.\?!]\s*\w{1})/g, match => match.toUpperCase());
}

function checkCapitlization() {
  const userInput = document.getElementById('textInput').value;
  const correctedText = capitalizeFirstLetter(userInput);
  const suggestionsDiv = document.getElementById('suggestions');

  suggestionsDiv.textContent = 'Capitalized Text:\n' + correctedText;
}

async function checkGrammar() {
    const userInput = jQuery('#textInput').val();

    try {
        const response = await jQuery.ajax({
            url: 'https://api.languagetool.org/v2/check',
            type: 'POST',
            data: {
                text: userInput,
                language: 'en-US',
            },
            dataType: 'json',
        });

        displayResults(response.matches);
    } catch (error) {
        console.error(error);
    }
}

function displayResults(matches) {
    const resultsDiv = jQuery('#suggestions');
    resultsDiv.html('<p>Grammar suggestions:</p><ul>');

    matches.forEach(match => {
        resultsDiv.append(`<li>${match.message}</li>`);
    });

    resultsDiv.append('</ul>');
}
