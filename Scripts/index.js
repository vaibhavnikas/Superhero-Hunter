// Javascript file for the Home Page(index.html)

// Selecting the search input box.
const searchbar = document.querySelector('#search-bar');

var timeoutID;

// Adding Event Listener to the Search Input.
searchbar.addEventListener('input',()=>{
    if(timeoutID){
        clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(()=>{
        // Calling the getResults function to get all the results after entering the search query in Search Box.
        getResults();
    },100);
});


// Function to get all the results and display them after entering the search query in the Search Box.
function getResults(){
    // Fetching the search results from the API for the Search Query.
    fetch('https://www.superheroapi.com/api.php/3383566708344630/search/' + searchbar.value)
    .then((response) => {
        // parsing the response to JSON.
        return response.json();
    })
    .then((data) => {
        // Selecting the results box to display all the search results.
        const results = document.querySelector('#results');

        // Removing all the Search results from the Search Box for the previous search query.
        while(results.children.length !== 0){
            results.removeChild(results.children[0]);
        }

        results.classList.remove('hidden');

        // Loop to add each search result to the results container.
        for(let hero of data.results){
            // creating elements to show the search results
            const div = document.createElement('div');
            const atag = document.createElement('a');
            const span = document.createElement('span');
            const image = document.createElement('img');
            image.setAttribute('src',hero.image.url);
            span.innerText = hero.name;
            div.appendChild(atag);
            atag.appendChild(span);
            atag.appendChild(image);
            atag.setAttribute('href','heroDetails.html');

            // Appending the search result to results container.
            results.appendChild(div);
            div.innerHTML = `${div.innerHTML + '<i id="addFav" class="fa fa-heart"></i>'}`;

            const likebutton = div.lastChild;
            let elements = JSON.parse(localStorage.getItem('favHeroes')) || [];
            // Checking if the result is already added to favourite heroes and if it is then adding class 'fav' to the like button to display it in red color.
            for(let i=0;i<elements.length;i++){
                if(elements[i].id == hero.id){
                    likebutton.setAttribute('id','fav');
                }
            }
            
            // Adding eventlistener to the like button
            likebutton.addEventListener('click',()=>{
                // When like button is clicked - 
                // Adding hero to the favourite heroes and if it is already present in favourite heroes then removing it from favourite heroes.
                let favHeroes = JSON.parse(localStorage.getItem('favHeroes')) || [];
                let isFav = false;

                for(let i=0;i<favHeroes.length;i++){
                    if(favHeroes[i].id == hero.id){
                        isFav = true;
                        favHeroes.splice(i,1);
                        i--;
                    }
                }

                if(isFav){
                    likebutton.setAttribute('id','');
                    localStorage.setItem('favHeroes',JSON.stringify(favHeroes));
                    return;
                }else{
                    let newFav = {
                        id : hero.id,
                        name : hero.name,
                        url : hero.image.url
                    };

                    favHeroes.push(newFav);
                    localStorage.setItem('favHeroes',JSON.stringify(favHeroes));
                    likebutton.setAttribute('id','fav');
                }
            });

            // When a particular div is clicked upon then saving the hero-id to localStorage to show the Hero details on heroDetails.html
            div.addEventListener('click',() => {
                localStorage.setItem('heroID',hero.id);
            });
        }
    });

}

// Making the search results disappear after you click anywhere outside the search results and search box.
window.addEventListener('click',(e) => {
    const results = document.querySelector('#results');
    let flag = true;
    
    for(let element of e.path){
        if(element === results || element === searchbar){
            flag = false;
        }
    }

    if(flag){
        results.classList.add('hidden');
    }
});



