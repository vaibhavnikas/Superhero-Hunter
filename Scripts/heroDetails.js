// Javascript file to show Hero Details.

// Selecting all the containers to update Hero Details.
const heroname = document.querySelector('#name');
const combat = document.querySelector('#combat');
const durability = document.querySelector('#durability');
const intelligence = document.querySelector('#intelligence');
const power = document.querySelector('#power');
const speed = document.querySelector('#speed');
const strength = document.querySelector('#strength');
const heroimage = document.querySelector('#heroimage');


// Fetching Hero Details from the API.
fetch('https://www.superheroapi.com/api.php/3383566708344630/' + localStorage.getItem('heroID'))
.then((response)=>{
    return response.json();
})
.then((data)=>{
    let hero = data;

    // Updating all the containers with the Hero Details.
    heroname.innerText = heroname.innerText + " " + hero.name;
    combat.innerText = combat.innerText + " " + hero.powerstats.combat;
    durability.innerText = durability.innerText + " " + hero.powerstats.durability;
    intelligence.innerText = intelligence.innerText + " " + hero.powerstats.intelligence;
    power.innerText = power.innerText + " " + hero.powerstats.power;
    speed.innerText = speed.innerText + " " + hero.powerstats.speed;
    strength.innerText = strength.innerText + " " + hero.powerstats.strength;
    heroimage.setAttribute('src',hero.image.url);
})

