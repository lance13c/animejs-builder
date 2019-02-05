
import ElementBox from './ElementBox';
//-----------------------------------------------------

export default class Guide {
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

// class MenuItem {
//   constructor(selector, leftGuide, rightGuide) {
//     menuItemBox = new ElementBox(selector);
//     this.leftGuide = leftGuide;
//     this.rightGuide = rightGuide;
//   }
// }

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
























// function createLeftRule(distance, duration = 1000, trailLength = 4) {
//   return {
//     translateX: [
//       {
//         value: distance,
//         duration: duration,
//         easing: "easeInOutQuad"
//       }
//     ],
//     scaleX: [
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//       {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
//       {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"},
//     ],
//     scaleY: [
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//       {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//     ]
//   }
// }






// function createRightRule(distance, duration = 1000, trailLength = 4) {
//   return {
//     translateX: [
//       {
//         value: -distance,
//         duration: duration,
//         easing: "easeInOutQuad"
//       }
//     ],
//     scaleX: [
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//       {value: trailLength, duration: (duration * 3/8), easing: "easeOutQuad"},
//       {value: 1, duration: (duration * 4/8), easing: "easeInOutQuad"},
//     ],
//     scaleY: [
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//       {value: 0.6, duration: (duration * 6/8), easing: "easeOutQuad"},
//       {value: 1, duration: (duration / 8), easing: "easeInOutQuad"},
//     ]
//   }
// }





// let menuToContent = anime({
//   targets: '#page .guide',
//   translateX: [
//     {
//       value: -homepageElWidth/2 + 5,
//       duration: guideSpeed * 4,
//       easing: "easeInOutQuad"
//     },
//     {
//       value: -homepageElWidth/2 + 5,
//       duration: guideSpeed * 2,
//       easing: "easeInOutQuad"
//     },
//     {
//       value: 0,
//       duration: 400,
//       easing: "easeInOutQuad"
//     }
//     ],
//     translateY: [
//     {value: 0, duration: guideSpeed * 4, easing: "easeInOutQuad"},
//     {
//       value: -homepageElHeight,
//       duration: guideSpeed * 3,
//       easing: "easeInOutQuad"
//     }
//     ],
//     scaleX: [
//     {value: 1, duration: guideSpeed *.5, easing: "easeInOutQuad"},
//     {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},

//     ],
//     scaleY: [
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 0.6, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 4, duration: guideSpeed * 2.5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     {value: 0.6, duration: guideSpeed * 1, easing: "easeInOutQuad"},
//     {value: 1, duration: guideSpeed * .5, easing: "easeInOutQuad"},
//     ],
//   autoplay: false
// });




