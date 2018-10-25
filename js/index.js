window.onload = function() {
   // fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&search=dog")
    //fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&gsrlimit=10&exsentences=1&gsrsearch=dog")
    
    document.getElementById('search').addEventListener('click', function() {
        const text = document.getElementById('text').value;
        makeQuery(text);
    });
    document.addEventListener('keypress', function(event) {
        const text = document.getElementById('text').value;
        if(event.key === 'Enter') {
            makeQuery(text);
        }
    })
    function makeQuery(searchText) {
        let query = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + searchText;
        fetch(query)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            addBlock(result.query.pages)
        })
        .catch(err => console.log(err));
    }
    function addBlock(result) {
        const parent = document.getElementById('wrapper');
        let arrayOfResults = [];
        parent.innerHTML = "";
    
         /** // The loop will iterate over all enumerable properties of the object itself and those the object inherits from its constructor's prototype
        for(let key in result) {
            // the inherited properties are not displayed.
            if (result.hasOwnProperty(key)) {
            arrayOfResults.push(result[key]);
        }
        }**/
        // Object.keys(obj) returns an array of a given object's own property names
        arrayOfResults = Object.keys(result).map(key => {
            return result[key];
        });
        arrayOfResults.sort((a, b) => {
            return a.index - b.index;
        });
               
        arrayOfResults.map(item => {            
            parent.innerHTML+=`<div><h2>${item.title}</h2>
            <p><a href="https://en.wikipedia.org/?curid=${item.pageid}" target="_blank">${item.extract}</a><p>
            </div>`;
            return
        })
        
    }
    
}