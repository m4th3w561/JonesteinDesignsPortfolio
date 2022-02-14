const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");
const circle4 = document.getElementById("circle4");

const circle1loc = returnLocation("circle1");
const circle2loc = returnLocation("circle2");
const circle3loc = returnLocation("circle3");
const circle4loc = returnLocation("circle4");



function returnLocation(id, containerXOffset, containerYOffset) {
  var d = document.getElementById(id);
  let rect = d.getBoundingClientRect();
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  let xPos, yPos;
  xPos = rect.left + width / 2;
  yPos = rect.top + height / 2;

  if (containerYOffset) {
    yPos -= containerYOffset;
  }
  if (containerXOffset) {
    xPos -= containerXOffset;
  }
  // console.log(`xpos ${xPos.toFixed(1)}, ypos ${yPos.toFixed(1)}`);
  let topOffset = rect.top;
  return [xPos, yPos, width, height, rect.left, rect.top];
}

  //set iterator counter
  let counter = 0
  //set variable for number of times to go from starting back to starting
  let opacityTime = 100

  let lineOpacityOffsetArray = [Math.random()*opacityTime,Math.random()*opacityTime,Math.random()*opacityTime,Math.random()*opacityTime,Math.random()*opacityTime,Math.random()*opacityTime]
  let lineOpacityArray = [0,0,0,0,0,0]

function createLine(parent, name, x1, y1, x2, y2,opacity) {
  var newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );
  newLine.setAttribute("points", `${x1} ${y1} ${x2} ${y2}`);
  newLine.setAttribute("id", name);
  newLine.setAttribute("stroke", "red");
  newLine.setAttribute("opacity",opacity)
  var parentElement = document.getElementById(parent);
  parentElement.append(newLine);
}

// create interval code that is always running and drawing line 1
const animationInterval = setInterval(() => {

  document.getElementById("line1svg").innerHTML = "";
  document.getElementById("line2svg").innerHTML = "";
  document.getElementById("line3svg").innerHTML = "";
  document.getElementById("line4svg").innerHTML = "";
  document.getElementById("line5svg").innerHTML = "";
  document.getElementById("line6svg").innerHTML = "";

  //find container offset from top screen
  const detailsContainer = returnLocation("networkContainer");
  const containerXOffset = detailsContainer[4];
  const containerYOffset = detailsContainer[5];
  //find middle of some object
  const object1 = returnLocation("circle1", containerXOffset, containerYOffset);
  const object2 = returnLocation("circle2", containerXOffset, containerYOffset);
  const object3 = returnLocation("circle3", containerXOffset, containerYOffset);
  const object4 = returnLocation("circle4", containerXOffset, containerYOffset);

  //set new opacities
  

  // draw line between them
  createLine( "line1svg", "line1", object1[0], object1[1], object2[0], object2[1], lineOpacityArray[0]);
  createLine( "line2svg", "line2", object2[0], object2[1], object3[0], object3[1], lineOpacityArray[1]);
  createLine( "line3svg", "line3", object3[0], object3[1], object1[0], object1[1], lineOpacityArray[2]);
  createLine( "line4svg", "line4", object4[0], object4[1], object3[0], object3[1], lineOpacityArray[3]);
  createLine( "line5svg", "line5", object1[0], object1[1], object4[0], object4[1], lineOpacityArray[4]);
  createLine( "line6svg", "line6", object2[0], object2[1], object4[0], object4[1], lineOpacityArray[5]);
  
  const updateOpacity= (lineOpacityArray)=>{
   let newArray = lineOpacityArray.map((opacity,index)=>{
    let newOpacity
    let opacityOffset = lineOpacityOffsetArray[index]
      newOpacity = 0.5+(Math.cos(((opacityOffset+counter)/opacityTime)*2*Math.PI))/3
      
    return newOpacity.toFixed(3)
   })
   counter +=1
   return newArray
  } 
  lineOpacityArray = updateOpacity(lineOpacityArray)
  // console.log(lineOpacityArray)
}, 20);


//code to figure out screen size

//if screen is x side set a bunch of variables
let circle1fleeParams = [50, -35];
//circle2flee =[x,y]

let hover = gsap.to(circle1, {
  scale: 1.5,
  color: "blue",
  duration: 0.2,
  paused: true,
  ease: "power1.inOut",
});

circle1.addEventListener("mouseenter", () => hover.play());
circle1.addEventListener("mouseleave", () => hover.reverse());

let hover3 = gsap.to(circle3, {
  scale: 2,
  x: -150,
  y: -100,
  color: "blue",
  duration: 0.2,
  paused: true,
  ease: "power1.inOut",
});

let circle2flee = gsap.to(circle2, {
  x: -150,
  y: -35,
  duration: 0.2,
  paused: true,
  ease: "power1.inOut",
});
let circle1flee = gsap.to(circle1, {
  x: circle1fleeParams[0],
  y: circle1fleeParams[1],
  duration: 0.2,
  paused: true,
  ease: "power1.inOut",
});

circle3.addEventListener("click", (event) => {
  if (!circle3.style.transform.includes("scale")) {
    // stop yoyo animation
    event.target.style.position = 'fixed';
    event.target.style.zIndex = 7;
    event.target.style.borderRadius = "5px";
    event.target.style.filter = 'drop-shadow(4px 4px 0.5rem rgba(65, 65, 65, 0.7))'
    circle2flee.play();
    circle1flee.play();
    hover3.play();
    t2.pause();
    t1.pause();
  } else {
    event.target.style.zIndex = 3;
    event.target.style.borderRadius = "50%";
    event.target.style.filter = 'drop-shadow(2px 2px 2px rgba(65, 65, 65, 0.5))'
    hover3.reverse();
    circle1flee.reverse();
    circle2flee.reverse();
    t1.play();
    t2.play();
  }
});

// This is for the animation for the "projects" section
const t1 = gsap.timeline({ defaults: { duration: 2, ease: "power1.inOut" }});
const t2 = gsap.timeline({ defaults: { duration: 1.75, ease: "power1.inOut" }});
const t3 = gsap.timeline({defaults: {duration:1, ease: "power1.out"}})
const t4 = gsap.timeline({ defaults: { duration: 1, ease: "power1.out" } });

t1.fromTo("#circle2", { y: 0 }, { y: -40, yoyo: true, repeat: -1 });

t2.fromTo("#circle1", { x: 0 }, { x: 40, yoyo: true, repeat: -1 });

t1.fromTo( "#circle3", { x: 0, y: 0 }, { x: -40, y: -40, yoyo: true, repeat: -1 });

t2.fromTo( "#circle4", { x: 0, y: 0 }, { x: 40, y: -40, yoyo: true, repeat: -1 });

// This is the "animation for recent-project section"
const t5 = gsap.timeline({ defaults: { duration: 2, ease: "power1.out" } });

const portfolioProject = document.querySelector("#portfolio-site");
const t11 = gsap.timeline({ defaults: { duration: 2, ease: "power1.out" } });
const portfolioProjectFlipper = document.querySelector("#secondFlipper");
portfolioProjectFlipper.addEventListener("mouseover", () => {
  // console.log("called project");
  t11.to("#secondFlipper", { rotationY: 720 });
});
portfolioProjectFlipper.addEventListener("click", () => {
  t11.restart();
  t11.pause();
  portfolioProjectFlipper.style.position = 'relative';
  portfolioProjectFlipper.style.zIndex = 6
  document.querySelector("header").style.display = "none";
  document.querySelector("nav").style.display = "none";
  document.querySelector("#firstFlipper").style.display = "none";
  document.querySelector("#firstFlipperText").style.display = "none";
  document.querySelector(".projects").style.display = "none";

  t5.to("#secondFlipper", { scale: 500 });
  t5.to("body", { height: "100vh",overflow: 'hidden'}, ">");
  // after play load next page
  //function to load next page
  setTimeout(function(){window.location.href = "./jonestein-design-portfolio.html"},1500)
  
});

const photoApp = document.querySelector('#photoApp')
const t10 = gsap.timeline({ defaults: { duration: 2, ease: "power1.out" } });
const photoAppFlipper = document.querySelector("#firstFlipper");
photoAppFlipper.addEventListener("mouseover", () => {
  // console.log("called photo");
  t10.to("#firstFlipper", { rotationY: 720 });
});
photoAppFlipper.addEventListener("click", () => {
  t10.restart();
  t10.pause();
  photoAppFlipper.style.position = 'relative';
  photoAppFlipper.style.zIndex = 6
  document.querySelector("header").style.display = "none";
  document.querySelector("nav").style.display = "none";
  document.querySelector("#secondFlipper").style.display = "none";
  document.querySelector("#secondFlipperText").style.display = "none";
  document.querySelector(".projects").style.display = "none";

  t5.to("#firstFlipper", { scale: 500 });
  t5.to("body", { height: "100vh",overflow: 'hidden'}, ">");
  // after play load next page
  //function to load next page
  setTimeout(function(){window.location.href = "./photoapp/photo-app.html"},1500)
});

const t6 = gsap.timeline({ defaults: { duration: 0.0001, ease: "power1.inOut" }});
t6.fromTo("#line1", {opacity: 0}, {opacity: 1, repeat: -1 });

const body = document.querySelector('body')
window.onload = () => {
  body.style.overflow = "visible"
}