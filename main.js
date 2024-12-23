
// Slideshow

//**
// Issues:
// - When Adjusting the window size the slidwshow adds more
// elements causing more repeated images near the end of the 
// original slidehshow
// 
// 
// 
// 
// 
// **//

function slideshowAnimation()
{
  const cardWrapper = document.querySelector('.card-wrapper')
  const cardWrapperChildren = Array.from(cardWrapper.children)
  const widthToScroll = cardWrapper.children[0].offsetWidth
  // const arrowPrev = document.querySelector('.arrow.prev')
  // const arrowNext = document.querySelector('.arrow.next')
  const cardBounding = cardWrapper.getBoundingClientRect()
  const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24))
  let currScroll = 0
  let initPos = 0
  let clicked = false
  
  cardWrapperChildren.slice(-column).reverse().forEach(item=> {
    cardWrapper.insertAdjacentHTML('afterbegin', item.outerHTML)
  })
  
  cardWrapperChildren.slice(0, column).forEach(item=> {
    cardWrapper.insertAdjacentHTML('beforeend', item.outerHTML)
  })
  
  const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
  cardImageAndLink.forEach(item=> {
    item.setAttribute('draggable', false)
  })
  
  cardWrapper.classList.add('no-smooth')
  cardWrapper.scrollLeft = cardWrapper.offsetWidth
  cardWrapper.classList.remove('no-smooth') 
  
  // arrowPrev.onclick = function() {
  //   cardWrapper.scrollLeft -= widthToScroll
  // }
  
  // arrowNext.onclick = function() {
  //   cardWrapper.scrollLeft += widthToScroll
  // }
  
  cardWrapper.onmousedown = function(e) {
  //   cardWrapper.classList.add('grab')
    initPos = e.clientX - cardBounding.left
    currScroll = cardWrapper.scrollLeft
    clicked = true
  }
  
  cardWrapper.onmousemove = function(e) {
    if(clicked) {
      const xPos = e.clientX - cardBounding.left
      cardWrapper.scrollLeft = currScroll + -(xPos - initPos)
    }
  }
  
  // cardWrapper.onmouseup = mouseUpAndLeave
  // cardWrapper.onmouseleave = mouseUpAndLeave
  let autoScroll
  
  cardWrapper.onscroll = function() {
    if(cardWrapper.scrollLeft === 0) {
      cardWrapper.classList.add('no-smooth')
      cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2 * cardWrapper.offsetWidth)
      cardWrapper.classList.remove('no-smooth')
    } else if(cardWrapper.scrollLeft === cardWrapper.scrollWidth - cardWrapper.offsetWidth) {
      cardWrapper.classList.add('no-smooth')
      cardWrapper.scrollLeft = cardWrapper.offsetWidth
      cardWrapper.classList.remove('no-smooth')
    }
  
    if(autoScroll) {
      clearTimeout(autoScroll)
    }
  
    autoScroll = setTimeout(()=> {
      cardWrapper.classList.remove('no-smooth')
      cardWrapper.scrollLeft += widthToScroll
    }, 1000)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  slideshowAnimation();
});

window.addEventListener("resize", function() {
  if (window.innerWidth < 1175)
  {
    slideshowAnimation();
  }
});

window.addEventListener("resize", function() {
  if (window.innerWidth > 1175)
  {
    document.getElementById("drop-down-options").style.display = "none";
  }
});


function openMenu()
{
  document.getElementById("drop-down-options").style.display = "block";
}

function closeMenu()
{
  document.getElementById("drop-down-options").style.display = "none";
}

function scrollToSection(sectionNum) {
  const sectionList = document.querySelectorAll(".section-container");

  section = sectionList[sectionNum]

  section.scrollIntoView({ behavior: "smooth" });
}
