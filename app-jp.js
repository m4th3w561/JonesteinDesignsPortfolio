
/* For jonestein-design-portfolio.html  */
const loader = document.querySelector('.loader')
const loaderContainer = document.querySelector(".loader-container")
const body = document.querySelector('body')

window.onload = () => {
  loader.style.width =  "0";
  loader.style.height = "0";
  loader.style.transition = "1.5s ease-out";
}
// window.onload = () => {
//     loader.style.transitionDelay = "1.8s"
//     loaderContainer.style.display = 'none';
// }




// const t1 = gsap.timeline({ default: { duration: 5, ease: "power1.out" } });

// window.onload= ()=>{
// t1.to(".loader", {transform: "scale(0.1)"});
// }