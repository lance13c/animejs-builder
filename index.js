import AnimeBuilder from './lib/AnimeBuilder.min.js';
import anime from "animejs";
import Guide from './src/js/Guide';
  
  
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
  
  
  
   // TESTING GUIDE
  
  let guideLeft = new Guide(".guideleft");
  
  const builder = new AnimeBuilder({
    targets: '.guideleft',
    loop: true,
    autoplay: true, //true
  });
  
  // let animation = builder
  //   //.add(Guide.animeMoveX(0, {duration: 0, trailLength: 0}))
  //   .add(Guide.animeMoveX(100, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveY(100, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveY(0, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveX(200, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveY(100, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveY(0, {duration: 200, trailLength: 12}))
  //   .add(Guide.animeMoveY(300, {duration: 200, trailLength: 12}))

  //   //.add(Guide.animeMoveX(0, {duration: 800, trailLength: 12}))

  //   .generateAnime();
    const moveHorizontal = (length, duration) => {
      return {
        translateX: [
          {value: length, 
          duration: duration, 
          easing: 'easeInOutQuad'}
        ]
      }
    }

    const scaleHorizontal = (size, duration) => {
      return {
        scaleX: [
          {value: size, 
          duration: duration, 
          easing: 'easeInOutQuad'}
        ]
      }
    }

    // const builder = new AnimeBuilder({
    //   targets: '.circle',
    //   autoplay: true
    // });

    const animation = builder
      .add(moveHorizontal(0, 0))
      .add(moveHorizontal('+=100', 500))
      .add(scaleHorizontal('+=3', 500))
      .add(moveHorizontal('+=100', 500))
      .add(scaleHorizontal(1, 500))
      .add(moveHorizontal(0, 1000))
      .generateAnime();

  console.log(builder.extractAnimeRules());
    
  setTimeout(() => {
    console.log(guideLeft.getCurrentPos())
  }, 200);