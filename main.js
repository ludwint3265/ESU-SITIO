
// Slideshow

// **
// Issues:
// - When Adjusting the window size the slidwshow adds more
// elements causing more repeated images near the end of the 
// original slidehshow
// 
// 
// 
// 
// 
// 
// 
// **

function slideshowAnimation(cardWrapper)
{
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

function adjustAnimation(cardWrapper)
{
  const widthToScroll = cardWrapper.children[0].offsetWidth
  const cardBounding = cardWrapper.getBoundingClientRect()
  let currScroll = 0
  let initPos = 0
  let clicked = false
  
  const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
  cardImageAndLink.forEach(item=> {
    item.setAttribute('draggable', false)
  })
  
  cardWrapper.classList.add('no-smooth')
  cardWrapper.scrollLeft = cardWrapper.offsetWidth
  cardWrapper.classList.remove('no-smooth') 
  
  cardWrapper.onmousedown = function(e) {
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
  let cardWrapper = document.querySelectorAll(".card-wrapper");
  cardWrapper.forEach(element => {
    console.log(element);
    slideshowAnimation(element);
  });
});

window.addEventListener("resize", function() {
  if (window.innerWidth < 1175)
  {
    let cardWrapper = document.querySelectorAll(".card-wrapper");
    cardWrapper.forEach(element => {
      console.log(element);
      adjustAnimation(element);
    });
  }
  else
  {
    let cardWrapper = document.querySelectorAll(".card-wrapper");
    cardWrapper.forEach(element => {
      console.log(element);
      adjustAnimation(element);
    });
  }
});

// removes mobile menu when screen size exceeds the width limit (1175)
window.addEventListener("resize", function() {
  if (window.innerWidth > 1175)
  {
    document.getElementById("drop-down-options").style.display = "none";
  }
});

function sectionActions(index, nav)
{
  const sectionAction = [
    () => {
      console.log('Section 1 in view')
      nav.style.background = "#FCD116";
    },
    () => {
      console.log('Section 2 in view')
      nav.style.background = "#003893";
    },
    () => {
      console.log('Section 3 in view')
      nav.style.background = "#CE1126";
    },
    () => {
      console.log('Section 4 in view')
      nav.style.background = "transparent"
    }
  ];

  sectionAction[index]()

}



window.addEventListener("scroll", function() {
  const sections = document.querySelectorAll('.section-container'); // Get all sections
  const navHeight = window.innerHeight * 0.075;
  const scrollPosition = window.scrollY + navHeight;
  const viewportHeight = window.innerHeight;
  const nav = document.getElementsByTagName("nav")[0];
    
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + viewportHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Execute the action for the current section
        sectionActions(index, nav);
    }
  });


});


function openMenu()
{
  document.getElementById("drop-down-options").style.display = "block";
}

function closeMenu()
{
  document.getElementById("drop-down-options").style.display = "none";
}


// Scrolls a selected part of the page
function scrollToSection(sectionNum) {
  const sectionList = document.querySelectorAll(".section-container");

  section = sectionList[sectionNum]

  section.scrollIntoView({ behavior: "smooth" });

  if (document.getElementById("drop-down-options").style.display != "none")
  {
    document.getElementById("drop-down-options").style.display = "none";
  }
}

