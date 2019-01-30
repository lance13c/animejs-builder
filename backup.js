// Animation Builder
class AnimeBuilder {
  constructor(animeConfig = {}) {
    this.animeRules = {
      animeBuilderId: true               // Identifies this as a ruleset built by an AnimeBuilder
    };
    this.animeConfig = animeConfig;
  }
  
  add(rule) {
    
    // TODO get this to work with extracted rulesets, animeBuilders and animeObjects
    
    for (let [stepKey, stepVal] of Object.entries(rule)) {
      if (!this.animeRules.hasOwnProperty(stepKey)) {
        this.animeRules[stepKey] = stepVal;
      } else {
        stepVal.forEach((val) => {
          this.animeRules[stepKey].push(val);
        });
      }
    }
    
    return this;
  }
  
  // adds functions that happens on every animation update
  onUpdate(callback) {
    this.animeConfig.update = callback;
    
    return this;
  }
  
  // Returns the raw pre generated ruleset
  extractAnimeRules() {
    return this.animeRules;
  }
  
  generateAnime() {
    return anime(Object.assign(this.animeConfig, this.animeRules));
  }
}




let page = document.querySelector("#page");


let homepageEl = document.querySelector("#homepage");
homepageEl.onclick = changeView;

let secondpageEl = document.querySelector("#secondpage");
secondpageEl.onclick = changeView;

let activeView = "homepage";

let blogEl = document.querySelector("#blog");

let homepageCord = homepageEl.getBoundingClientRect();
let homepageStartCord = {
  x: homepageCord.right + (homepageCord.left - homepageCord.right)/2,
  y: homepageCord.top - 5
}

let secondpageCord = secondpageEl.getBoundingClientRect();
let secondpageStartCord = {
  x: secondpageCord.right + (secondpageCord.left - secondpageCord.right)/2,
  y: secondpageCord.top - 5
}

let guideleft = document.querySelector(".guideleft");
let guideright = document.querySelector(".guideright");

guideleft.style.left = `${homepageStartCord.x}px`;
guideleft.style.top = `${homepageStartCord.y}px`;

guideright.style.left = `${homepageStartCord.x}px`;
guideright.style.top = `${homepageStartCord.y}px`;

let homePageBlog = `<h1>Party Time</h1>
       <p>This when an unknown printer took a galley</p>
       <h2>How to Grove 101</h2>
       <p>This is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`



let secondPageBlog = `<h1>Dancing All Day</h1>
       <p>The point of using Lorem Ipsum is that</p>
       <h2>I <3 Pesto!</h2>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`

let homepageElWidth = homepageCord.left - homepageCord.right;
let homepageElHeight = homepageCord.top - homepageCord.bottom;

let guideSpeed = 50;

let leftGuideA = anime({
  targets: '#page .guideleft',
  translateX: [
    {
      value: homepageElWidth/2 - 10,
      duration: guideSpeed * 4,
      easing: "easeInOutQuad"
    },
    {
      value: homepageElWidth/2 - 10,
      duration: guideSpeed * 2,
      easing: "easeInOutQuad"
    },
    {
      value: 0,
      duration: 400,
      easing: "easeInOutQuad"
    }
   ],
   translateY: [
    {value: 0, duration: guideSpeed * 4, easing: "easeInOutQuad"},
    {
     value: -homepageElHeight,
     duration: guideSpeed * 3,
     easing: "easeInOutQuad"
    }
   ],
   scaleX: [
    {value: 1, duration: guideSpeed *.5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},

   ],
   scaleY: [
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 1, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
   ],
  autoplay: false
});

let rightGuideA = anime({
  targets: '#page .guideright',
  translateX: [
    {
      value: -homepageElWidth/2 + 5,
      duration: guideSpeed * 4,
      easing: "easeInOutQuad"
    },
    {
      value: -homepageElWidth/2 + 5,
      duration: guideSpeed * 2,
      easing: "easeInOutQuad"
    },
    {
      value: 0,
      duration: 400,
      easing: "easeInOutQuad"
    }
   ],
   translateY: [
    {value: 0, duration: guideSpeed * 4, easing: "easeInOutQuad"},
    {
     value: -homepageElHeight,
     duration: guideSpeed * 3,
     easing: "easeInOutQuad"
    }
   ],
   scaleX: [
    {value: 1, duration: guideSpeed *.5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},

   ],
   scaleY: [
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 1, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
   ],
  autoplay: false
});


function changeView(e) {
  switch(e.target.id) {
    case "homepage":
      // Set the Start Cord
        guideleft.style.left = `${homepageStartCord.x}px`;
        guideleft.style.top = `${homepageStartCord.y}px`;
      
        guideright.style.left = `${homepageStartCord.x}px`;
        guideright.style.top = `${homepageStartCord.y}px`;
      
      
      leftGuideA.reset();
      leftGuideA.play();
      rightGuideA.reset();
      rightGuideA.play();
      
      

      blog.innerHTML = homePageBlog;
      break;
    case "secondpage": {
      
      guideleft.style.left = `${secondpageStartCord.x}px`;
        guideleft.style.top = `${secondpageStartCord.y}px`;
      
        guideright.style.left = `${secondpageStartCord.x}px`;
        guideright.style.top = `${secondpageStartCord.y}px`;
      
      leftGuideA.reset();
      leftGuideA.play();
      rightGuideA.reset();
      rightGuideA.play();
      
      blog.innerHTML = secondPageBlog;
      break;
    }
  }
}





//-----------------------------------------------------



// Guide Library
class ElementBox {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.boundingBox = this.updateBoundingBox();
  }
  
  updateBoundingBox() {
    return this.element.getBoundingClientRect();
  }
}

class Guide {
  constructor(selector, x = 0, y = 0) {
    console.log(selector);
    this.el = new ElementBox(selector);
  }
  
  // Gets the current position including the current translation offsets
  getCurrentPos() {
    this.el.updateBoundingBox();
   
    let translateVals = getComputedTranslateXY(this.el.element);
    
    console.log(translateVals);
    
    return {
      x: this.el.boundingBox.x + translateVals[0],
      y: this.el.boundingBox.y + translateVals[1]
    }
  }
  
  goToContext(selector, options) {
    
  }
  
  // Options
  /*
    {
      direction: left, right
      distance: .25, .5, .75, 1,
      position: 'top', 'left', 'right', 'bottom' // place relative to selector element
      positionOffsetX: // offset of position x val
      positionOffsetY:  // offset of position y val
      speed: // multiplier of animation 1=normal
    }
  */
  goAround(selector, options) {
    
  }
  
  goAroundCW(selector) {
    
  }
  
  static animeMoveX(distance, {
                    duration = 1000, 
                    trailLength = 4}) {
    return {
      translateX: [
        {
          value: distance,
          duration: duration,
          easing: "easeInOutQuad"
        }
      ],
      scaleX: [
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
        {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
        {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"},
      ],
      scaleY: [
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
        {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
      ]
    }
  }
  
  static animeMoveY(distance, {
                    duration = 1000,
                    trailLength = 4
                   }) {
    return {
      translateY: [
        {
          value: distance,
          duration: duration,
          easing: "easeInOutQuad"
        }
      ],
      scaleX: [
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
        {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"}
      ],
      scaleY: [
        {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
        {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
        {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"}
      ]
    }
  }
}

class MenuItem {
  constructor(selector, leftGuide, rightGuide) {
    menuItemBox = new ElementBox(selector);
    this.leftGuide = leftGuide;
    this.rightGuide = rightGuide;
  }
}


// TESTING GUIDE

let guideLeft = new Guide(".guideleft");

let builder = new AnimeBuilder({
  targets: '.guideleft',
  loop: true,
  autoplay: true //true
});

let animation = builder
  .add(Guide.animeMoveX(100, {duration: 3000, trailLength: 12}))
  .add(Guide.animeMoveX(0, {duration: 3000, trailLength: 12}))
//   .onUpdate(() => {
// guideLeft.getCurrentPos()
//    })
  .generateAnime();

console.log(guideLeft.getCurrentPos());

setTimeout(() => {
  console.log(guideLeft.getCurrentPos())
}, 200);























//test

//let a = 

// let builder = new AnimeBuilder({
//       targets: '.guideleft',
//       loop: true,
//       autoplay: true //true
//     });

// let animation = builder
//   .add(createLeftRule(100, 300, 12))
//   .add(createRightRule(0, 300, 12))
//   .generateAnime();

// console.log(animation);

function createLeftRule(distance, duration = 1000, trailLength = 4) {
  return {
    translateX: [
      {
        value: distance,
        duration: duration,
        easing: "easeInOutQuad"
      }
    ],
    scaleX: [
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
      {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
      {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"},
    ],
    scaleY: [
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
      {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
    ]
  }
}






function createRightRule(distance, duration = 1000, trailLength = 4) {
  return {
    translateX: [
      {
        value: -distance,
        duration: duration,
        easing: "easeInOutQuad"
      }
    ],
    scaleX: [
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
      {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
      {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"},
    ],
    scaleY: [
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
      {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
      {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
    ]
  }
}





let menuToContent = anime({
  targets: '#page .guide',
  translateX: [
    {
      value: -homepageElWidth/2 + 5,
      duration: guideSpeed * 4,
      easing: "easeInOutQuad"
    },
    {
      value: -homepageElWidth/2 + 5,
      duration: guideSpeed * 2,
      easing: "easeInOutQuad"
    },
    {
      value: 0,
      duration: 400,
      easing: "easeInOutQuad"
    }
   ],
   translateY: [
    {value: 0, duration: guideSpeed * 4, easing: "easeInOutQuad"},
    {
     value: -homepageElHeight,
     duration: guideSpeed * 3,
     easing: "easeInOutQuad"
    }
   ],
   scaleX: [
    {value: 1, duration: guideSpeed *.5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},

   ],
   scaleY: [
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
    {value: 0.6, duration: guideSpeed * 1, easing: "easeInOutQuad"},
    {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
   ],
  autoplay: false
});




// Helper - https://gist.github.com/aderaaij/a6b666bf756b2db1596b366da921755d
function getComputedTranslateXY(element) {
    const transArr = [];
      if(!window.getComputedStyle) return;
      const style = getComputedStyle(element),
          transform = style.transform || style.webkitTransform || style.mozTransform;
      let mat = transform.match(/^matrix3d\((.+)\)$/);    
      if(mat) return parseFloat(mat[1].split(', ')[13]);
      mat = transform.match(/^matrix\((.+)\)$/);
      mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
      mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
      return transArr;
 }