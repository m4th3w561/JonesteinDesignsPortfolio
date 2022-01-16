
/* For jonestein-design-portfolio.html  */
const loader = document.querySelector('.loader')
const body = document.querySelector('body')

window.onload = () => {
  loader.style.width =  "0";
  loader.style.height = "0";
  loader.style.transition = "2s ease-out"
}



// const t1 = gsap.timeline({ default: { duration: 5, ease: "power1.out" } });

// window.onload= ()=>{
// t1.to(".loader", {transform: "scale(0.1)"});
// }