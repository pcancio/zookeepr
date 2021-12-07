const { animals } = require('./data/animals');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// app.get('/', (req, res) => {
//     console.log('string');
//     res.send('<h1>Hi there!</h1>');
// })
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
    }
    personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet ===
            query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;

}

function findbyId(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}
app.get('/api/animals/:id', (req, res) => {
    const result = findbyId(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// let results = animals; 
// if (req.query) {
//     results = filterByQuery(req.query, results);
// }
// res.json(results);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});