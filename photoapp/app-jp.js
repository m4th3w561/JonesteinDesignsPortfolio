
/* For jonestein-design-portfolio.html  */
const loader = document.querySelector('.loader');
const loaderContainer = document.querySelector(".loader-container");
const body = document.querySelector('body');

window.onload = () => {
  loader.style.width = "0";
  loader.style.height = "0";
  loader.style.transition = "1.5s ease-out";
};



const tlLeave = gsap.timeline({ defaults: { duration: 0.75, ease: 'Power2.easeOut' } });
const tlEnter = gsap.timeline({ defaults: { duration: 0.75, ease: 'Power2.easeOut' } });


const leaveAnimation = (current, done) => {
  const thumbnail = current.querySelector('.image-container');
  const text = current.querySelector('.summary-text');
  // const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.summary-arrow');
  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50, onComplete: done }),
    tlLeave.fromTo(thumbnail, { y: 0, opacity: 1 }, { opacity: 0, y: 100 }, '<'),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: -100 }, '<'));
  // tlLeave.fromTo(circles, { y: 0, opacity: 1 }, { opacity: 0, y: -200, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 }, '<');
};

const enterAnimation = (next, done) => {
  const thumbnail = next.querySelector('.image-container');
  const text = next.querySelector('.summary-text');
  // const circles = next.querySelectorAll('.circle');
  const arrow = next.querySelector('.summary-arrow');
  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0, onComplete: done }),
    // tlEnter.to('body', { background: gradient }, '<'),
    tlEnter.fromTo(thumbnail, { y: -100, opacity: 0 }, { opacity: 1, y: 0 }, '<'),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { opacity: 1, y: 0 }, '<'));
  // tlEnter.fromTo(circles, { y: -200, opacity: 0 }, { opacity: 1, y: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 }, '<')
};

barba.init({
  preventRunning: true,
  transitions: [{
    //summary transitions
    name: 'default',
    once (data) {
      const done = this.async();
      let next = data.next.container;
      // let gradient = getGradient(data.next.namespace);
      // gsap.set('body', { background: gradient });
      enterAnimation(next, done);
    },
    leave (data) {
      console.log(data);
      const done = this.async();
      let current = data.current.container;
      leaveAnimation(current, done);
    },
    enter (data) {
      const done = this.async();
      console.log("This is the enter function")
      let next = data.next.container;
      // let gradient = getGradient(data.next.namespace);
      enterAnimation(next, done);
    },
  }]
});

const home = document.querySelector("#home")

home.addEventListener("click", () => {
  barba.force( "/")
})
