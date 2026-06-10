const clocks = () => {

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

};

setInterval(clocks,1000);

clocks();

document
.getElementById("menuBtn")
.addEventListener("click",()=>{

document
.getElementById("navLinks")
.classList.toggle("show");

});

/* PREMIUM MOTION */

const cards = document.querySelectorAll(
'.hero-panel,.stat-card,.flight-board'
);

cards.forEach(card=>{

card.addEventListener('mousemove',e=>{

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

const centerX =
rect.width / 2;

const centerY =
rect.height / 2;

const rotateX =
((y-centerY)/centerY)*-6;

const rotateY =
((x-centerX)/centerX)*6;

card.style.transform = `
perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-6px)
`;

});

card.addEventListener('mouseleave',()=>{

card.style.transform = `
perspective(1200px)
rotateX(0deg)
rotateY(0deg)
translateY(0px)
`;

});

});