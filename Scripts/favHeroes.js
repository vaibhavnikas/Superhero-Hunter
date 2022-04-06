// JavaScript File for Favourite Heroes Page.

// Selecting the Container to add all the Favourite Heroes to it.
const container = document.querySelector('#container');

// Getting the array which has all the Favourite Heroes stored in it.
let favHeroes = JSON.parse(localStorage.getItem('favHeroes')) || [];

// Loop to add each Favourite Hero to the container one at a time.
for(let x of favHeroes){
    const div = document.createElement('div');
    const image = document.createElement('img');
    image.setAttribute('src',x.url);
    const span = document.createElement('span');
    span.innerText = x.name;
    const button = document.createElement('button');
    button.innerText = 'delete';

    div.appendChild(image);
    div.appendChild(span);
    div.appendChild(button);
    div.setAttribute('id',x.id);
    container.appendChild(div);

    // Adding eventlistener to the delete button.
    button.addEventListener('click',function (){
        let favHeroes = JSON.parse(localStorage.getItem('favHeroes'));

        container.removeChild(this.parentElement);

        let currID = this.parentElement.getAttribute('id');

        for(let i = 0;i<favHeroes.length;i++){
            if(favHeroes[i].id == currID){
                favHeroes.splice(i,1);
                i--;
            }
        }

        localStorage.setItem('favHeroes',JSON.stringify(favHeroes));
    });
}