const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");
const circle4 = document.getElementById("circle4");

const circle1loc = returnLocation("circle1");
const circle2loc = returnLocation("circle2");
const circle3loc = returnLocation("circle3");
const circle4loc = returnLocation("circle4");

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

  //offset all line centers

  // draw line between them
  createLine(
    "line1svg",
    "line1",
    object1[0],
    object1[1],
    object2[0],
    object2[1]
  );
  // console.log(`object 1 ${object1}\nobject 2  ${object2}`);

  createLine(
    "line2svg",
    "line2",
    object2[0],
    object2[1],
    object3[0],
    object3[1]
  );
  createLine(
    "line3svg",
    "line3",
    object3[0],
    object3[1],
    object1[0],
    object1[1]
  );
  createLine(
    "line4svg",
    "line4",
    object4[0],
    object4[1],
    object3[0],
    object3[1]
  );
  createLine(
    "line5svg",
    "line5",
    object1[0],
    object1[1],
    object4[0],
    object4[1]
  );
  createLine(
    "line6svg",
    "line6",
    object2[0],
    object2[1],
    object4[0],
    object4[1]
  );
}, 10);

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

circle3.addEventListener("click", () => {
  if (!circle3.style.transform.includes("scale")) {
    // stop yoyo animation
    event.target.style.zIndex = 55;
    event.target.style.borderRadius = "5px";

    circle2flee.play();
    circle1flee.play();
    hover3.play();
    t2.pause();
    t1.pause();
  } else {
    event.target.style.zIndex = 15;
    event.target.style.borderRadius = "50%";
    hover3.reverse();
    circle1flee.reverse();
    circle2flee.reverse();
    t1.play();
    t2.play();
  }
});

// This is for the animation
const t1 = gsap.timeline({ defaults: { duration: 2, ease: "power1.inOut" } });
const t2 = gsap.timeline({
  defaults: { duration: 1.75, ease: "power1.inOut" },
});

t1.fromTo("#circle2", { y: 0 }, { y: -40, yoyo: true, repeat: -1 });

t2.fromTo("#circle1", { x: 0 }, { x: 40, yoyo: true, repeat: -1 });

t1.fromTo(
  "#circle3",
  { x: 0, y: 0 },
  { x: -40, y: -40, yoyo: true, repeat: -1 }
);

t2.fromTo(
  "#circle4",
  { x: 0, y: 0 },
  { x: 40, y: -40, yoyo: true, repeat: -1 }
);

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

function createLine(parent, name, x1, y1, x2, y2) {
  var newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );
  newLine.setAttribute("points", `${x1} ${y1} ${x2} ${y2}`);
  newLine.setAttribute("id", name);
  newLine.setAttribute("stroke", "red ");
  var parentElement = document.getElementById(parent);
  parentElement.append(newLine);
}

const photoApp = document.getElementById('photoApp')
const portfolioProject = document.getElementById('portfolio-site')

const t5 = gsap.timeline({ defaults: { duration: 1, ease: "power1.out" } });
const t6 = gsap.timeline({ defaults: { duration: 1, ease: "power1.out" } });


photoApp.addEventListener("click", ()=> {
    t5.fromTo("#photoApp", { scale: 1 }, { scale: 100, zIndex: 100, transition: "none"  });
});
portfolioProject.addEventListener("click", ()=> {
    t6.fromTo(
      "#portfolio-site",
      { scale: 1 },
      { scale: 1000, zIndex: 100, transition: "none" }
    );
})