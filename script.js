const destinations = [

{
city:"Honolulu",
code:"HNL",
country:"USA",
region:"USA",
difficulty:"Moderate",
type:"Beach",
season:"Winter",
family:"9/10",
weather:"82°F",
flight:"6h",
price:"$$$",
notes:"Perfect Hawaiian standby getaway.",
airport:"Daniel K. Inouye International Airport",
routing:"Best routed through SFO or LAX.",
hotels:["Hilton Hawaiian Village","Prince Waikiki","Sheraton Waikiki"],
food:["Leonard's Bakery","Duke's Waikiki","Rainbow Drive-In"],
activities:["Waikiki Beach","Diamond Head","Pearl Harbor"],
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
},

{
city:"Tokyo",
code:"HND",
country:"Japan",
region:"Asia",
difficulty:"Hard",
type:"City",
season:"Spring",
family:"8/10",
weather:"73°F",
flight:"11h",
price:"$$$$",
notes:"Amazing food, transit, and family experiences.",
airport:"Haneda Airport",
routing:"Best through SFO or LAX.",
hotels:["Park Hotel Tokyo","Hilton Tokyo","Shibuya Excel"],
food:["Ichiran","Sushi Dai","Gyukatsu Motomura"],
activities:["Shibuya","Tokyo DisneySea","Akihabara"],
image:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop"
},

{
city:"Paris",
code:"CDG",
country:"France",
region:"Europe",
difficulty:"Moderate",
type:"City",
season:"Spring",
family:"7/10",
weather:"70°F",
flight:"10h",
price:"$$$$",
notes:"Beautiful architecture and family sightseeing.",
airport:"Charles de Gaulle Airport",
routing:"Best through EWR or IAD.",
hotels:["Le Bristol","CitizenM Paris","Hyatt Paris"],
food:["Angelina","Cafe de Flore","L'Avenue"],
activities:["Eiffel Tower","Louvre","Disneyland Paris"],
image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop"
},

{
city:"Sydney",
code:"SYD",
country:"Australia",
region:"Oceania",
difficulty:"Hard",
type:"Adventure",
season:"Summer",
family:"8/10",
weather:"79°F",
flight:"15h",
price:"$$$$",
notes:"Incredible beaches and harbor views.",
airport:"Sydney Kingsford Smith Airport",
routing:"Best through LAX or SFO.",
hotels:["Four Seasons Sydney","Shangri-La","QT Sydney"],
food:["Opera Bar","Bills","Mr. Wong"],
activities:["Opera House","Bondi Beach","Harbour Bridge"],
image:"https://images.unsplash.com/photo-1506973035872-a4ec16b8d07f?q=80&w=2000&auto=format&fit=crop"
},

{
city:"Cancun",
code:"CUN",
country:"Mexico",
region:"Caribbean",
difficulty:"Easy",
type:"Beach",
season:"Winter",
family:"9/10",
weather:"88°F",
flight:"4h",
price:"$$",
notes:"Easy family beach destination.",
airport:"Cancun International Airport",
routing:"Direct from IAH often easiest.",
hotels:["Hyatt Ziva","Moon Palace","Riu Palace"],
food:["Navios","Rosa Negra","Puerto Madero"],
activities:["Xcaret","Isla Mujeres","Chichen Itza"],
image:"https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop"
},

{
city:"London",
code:"LHR",
country:"United Kingdom",
region:"Europe",
difficulty:"Moderate",
type:"City",
season:"Summer",
family:"8/10",
weather:"67°F",
flight:"10h",
price:"$$$$",
notes:"Historic attractions and train access.",
airport:"Heathrow Airport",
routing:"Best through EWR or IAD.",
hotels:["The Savoy","CitizenM London","The Langham"],
food:["Dishoom","Sketch","Duck & Waffle"],
activities:["London Eye","Tower Bridge","Harry Potter Studio"],
image:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop"
},

{
city:"Miami",
code:"MIA",
country:"USA",
region:"USA",
difficulty:"Moderate",
type:"Beach",
season:"Winter",
family:"8/10",
weather:"86°F",
flight:"5h",
price:"$$$",
notes:"Fast tropical getaway for standby trips.",
airport:"Miami International Airport",
routing:"Easy through IAH.",
hotels:["Fontainebleau","1 Hotel South Beach","Loews Miami"],
food:["Joe's Stone Crab","Versailles","Komodo"],
activities:["South Beach","Wynwood","Everglades"],
image:"https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=2000&auto=format&fit=crop"
}

];

const grid = document.getElementById("destinationsGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const typeFilter = document.getElementById("typeFilter");
const favoritesOnlyBtn = document.getElementById("favoritesOnly");

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

let recent =
JSON.parse(localStorage.getItem("recent")) || [];

let favoritesMode = false;

document.getElementById("destinationCount").textContent =
destinations.length;

updateFavoriteCount();

function renderDestinations(){

grid.innerHTML = "";

const filtered = destinations.filter(dest=>{

const matchesSearch =
dest.city.toLowerCase().includes(searchInput.value.toLowerCase()) ||
dest.code.toLowerCase().includes(searchInput.value.toLowerCase());

const matchesRegion =
!regionFilter.value ||
dest.region === regionFilter.value;

const matchesDifficulty =
!difficultyFilter.value ||
dest.difficulty === difficultyFilter.value;

const matchesType =
!typeFilter.value ||
dest.type === typeFilter.value;

const matchesFavorites =
!favoritesMode ||
favorites.includes(dest.code);

return (
matchesSearch &&
matchesRegion &&
matchesDifficulty &&
matchesType &&
matchesFavorites
);

});

filtered.forEach(dest=>{

const card = document.createElement("div");

card.className = "destination-card reveal";

card.innerHTML = `

<div
class="destination-image"
style="background-image:url('${dest.image}')"
></div>

<div class="destination-content">

<div class="destination-top">

<div>

<h3>${dest.city}</h3>

<p>${dest.code} • ${dest.country}</p>

</div>

<button class="favorite-btn">
${favorites.includes(dest.code) ? "★" : "☆"}
</button>

</div>

<p>${dest.notes}</p>

<div class="destination-meta">

<div class="tag">${dest.region}</div>

<div class="tag">${dest.difficulty}</div>

<div class="tag">${dest.type}</div>

<div class="tag">${dest.weather}</div>

</div>

</div>

`;

const favoriteBtn = card.querySelector(".favorite-btn");

favoriteBtn.addEventListener("click",(e)=>{

e.stopPropagation();

if(favorites.includes(dest.code)){

favorites = favorites.filter(f=>f!==dest.code);

showToast("Removed from favorites");

}else{

favorites.push(dest.code);

showToast("Added to favorites");

}

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

updateFavoriteCount();

renderFavoritesSection();

renderDestinations();

});

card.addEventListener("click",()=>{

addRecent(dest);

openModal(dest);

});

grid.appendChild(card);

});

revealAnimations();

}

function renderFavoritesSection(){

const container =
document.querySelector(".favorites-placeholder");

if(!container) return;

if(favorites.length === 0){

container.innerHTML = `
<p>
No saved favorites yet.
</p>
`;

return;

}

const favoriteDestinations =
destinations.filter(dest =>
favorites.includes(dest.code)
);

container.innerHTML = favoriteDestinations.map(dest=>`

<div class="favorite-item">

<h3>${dest.city}</h3>

<p>${dest.code} • ${dest.country}</p>

</div>

`).join("");

}

function addRecent(dest){

recent = recent.filter(r=>r.code!==dest.code);

recent.unshift(dest);

recent = recent.slice(0,5);

localStorage.setItem(
"recent",
JSON.stringify(recent)
);

}

function updateFavoriteCount(){

document.getElementById("favoriteCount").textContent =
favorites.length;

}

function showToast(message){

const toast = document.getElementById("toast");

toast.textContent = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

function openModal(dest){

const modal =
document.getElementById("destinationModal");

const modalBody =
document.getElementById("modalBody");

modalBody.innerHTML = `

<img
class="modal-image"
src="${dest.image}"
alt="${dest.city}"
>

<h2>${dest.city} • ${dest.code}</h2>

<p>${dest.notes}</p>

<div class="modal-details">

<div class="modal-box">
<h3>Airport</h3>
<p>${dest.airport}</p>
</div>

<div class="modal-box">
<h3>Best Season</h3>
<p>${dest.season}</p>
</div>

<div class="modal-box">
<h3>Weather</h3>
<p>${dest.weather}</p>
</div>

<div class="modal-box">
<h3>Flight Time</h3>
<p>${dest.flight}</p>
</div>

<div class="modal-box">
<h3>Routing Strategy</h3>
<p>${dest.routing}</p>
</div>

<div class="modal-box">
<h3>Hotels</h3>
<p>${dest.hotels.join("<br>")}</p>
</div>

<div class="modal-box">
<h3>Food</h3>
<p>${dest.food.join("<br>")}</p>
</div>

<div class="modal-box">
<h3>Activities</h3>
<p>${dest.activities.join("<br>")}</p>
</div>

<div class="modal-box">
<h3>Family Score</h3>
<p>${dest.family}</p>
</div>

<div class="modal-box">
<h3>Budget Level</h3>
<p>${dest.price}</p>
</div>

<div class="modal-box">
<h3>Standby Difficulty</h3>
<p>${dest.difficulty}</p>
</div>

<div class="modal-box">
<h3>NonRev Advice</h3>
<p>
Always have 2 backup routes and monitor loads closely.
</p>
</div>

</div>

`;

modal.style.display = "flex";

}

document
.getElementById("closeModal")
.addEventListener("click",()=>{

document.getElementById("destinationModal").style.display =
"none";

});

window.addEventListener("click",(e)=>{

const modal =
document.getElementById("destinationModal");

if(e.target === modal){

modal.style.display = "none";

}

});

searchInput.addEventListener(
"input",
renderDestinations
);

regionFilter.addEventListener(
"change",
renderDestinations
);

difficultyFilter.addEventListener(
"change",
renderDestinations
);

typeFilter.addEventListener(
"change",
renderDestinations
);

favoritesOnlyBtn.addEventListener("click",()=>{

favoritesMode = !favoritesMode;

favoritesOnlyBtn.textContent =
favoritesMode
? "Showing Favorites"
: "Favorites Only";

renderDestinations();

});

document.querySelectorAll(".accordion-header")
.forEach(button=>{

button.addEventListener("click",()=>{

button.parentElement.classList.toggle("active");

});

});

document.getElementById("menuBtn")
.addEventListener("click",()=>{

document.getElementById("navLinks")
.classList.toggle("show");

});

document.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle("light");

});

window.addEventListener("scroll",()=>{

const button =
document.getElementById("scrollTopBtn");

if(window.scrollY > 300){

button.style.display = "block";

}else{

button.style.display = "none";

}

});

document.getElementById("scrollTopBtn")
.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});

function updateClocks(){

const options = {
hour:'2-digit',
minute:'2-digit'
};

document.getElementById("laxClock").textContent =
new Date().toLocaleTimeString(
'en-US',
{
...options,
timeZone:'America/Los_Angeles'
}
);

document.getElementById("nyClock").textContent =
new Date().toLocaleTimeString(
'en-US',
{
...options,
timeZone:'America/New_York'
}
);

document.getElementById("tokyoClock").textContent =
new Date().toLocaleTimeString(
'en-US',
{
...options,
timeZone:'Asia/Tokyo'
}
);

}

setInterval(updateClocks,1000);

updateClocks();

function rotateSpotlight(){

const spotlight =
document.querySelector(".spotlight-content");

if(!spotlight) return;

let index = 0;

setInterval(()=>{

index++;

if(index >= destinations.length){
index = 0;
}

const dest = destinations[index];

spotlight.innerHTML = `

<div>

<h2>
${dest.city} • ${dest.code}
</h2>

<p>
${dest.notes}
</p>

<button class="primary-btn">
Explore ${dest.city}
</button>

</div>

`;

},5000);

}

rotateSpotlight();

function revealAnimations(){

const reveals =
document.querySelectorAll(".reveal");

reveals.forEach(el=>{

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

});

observer.observe(el);

});

}

function animateCounters(){

const counters =
document.querySelectorAll(".stat-card h2");

counters.forEach(counter=>{

const target =
+counter.innerText.replace("+","");

if(isNaN(target)) return;

let current = 0;

const increment = target / 50;

const update = ()=>{

current += increment;

if(current < target){

counter.innerText =
Math.floor(current);

requestAnimationFrame(update);

}else{

counter.innerText = target;

}

};

update();

});

}

animateCounters();

renderFavoritesSection();

renderDestinations();
/* =========================
   PREMIUM MOTION SYSTEM
========================= */

const motionCards = document.querySelectorAll(
  '.destination-card, .dashboard-card, .hub-card, .family-card, .hero-panel'
);

motionCards.forEach(card => {

/* =========================
   PREMIUM GLASS MOTION
========================= */

const motionCards = document.querySelectorAll(
  '.destination-card, .dashboard-card, .hub-card, .family-card, .hero-panel'
);

motionCards.forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.025)
    `;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,.16),
        rgba(255,255,255,.04) 28%,
        rgba(255,255,255,.03) 60%
      )
    `;

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
      scale(1)
    `;

    card.style.background = `
      rgba(255,255,255,.05)
    `;

  });

});

/* =========================
   MAGNETIC BUTTONS
========================= */

const magneticButtons = document.querySelectorAll(
  '.primary-btn, .secondary-btn, .hero-search button'
);

magneticButtons.forEach(button => {

  button.addEventListener('mousemove', e => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.18;
    const moveY = (y - rect.height / 2) * 0.18;

    button.style.transform = `
      translate(${moveX}px, ${moveY}px)
      scale(1.04)
    `;

  });

  button.addEventListener('mouseleave', () => {

    button.style.transform = `
      translate(0px, 0px)
      scale(1)
    `;

  });

});