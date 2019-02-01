import AnimeBuilder from "../src/js/AnimeBuilder";
import { expect } from "chai";

describe("add", () => {

  let animeBuilder;

  const SIMPLE_RULE = {
    translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
  }

  // Rule with different prop
  const SIMPLE_RULE_P2 = {
    scaleX: [
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        }
      ]
  }

  beforeEach( () => {
    animeBuilder = new AnimeBuilder({
      target: '.test',
      autoplay: false
    });
  });
  

  // it("should add anime properties when no properties exist", () => {
    
  //   animeBuilder.add(SIMPLE_RULE);

  //   expect(animeBuilder.extractAnimeRules()).to.eql({
  //      animeBuilderId: true,
  //      translateX: [
  //       {
  //         value: 1,
  //         duration: 100,
  //         easing: "easeInOutQuad"
  //       }
  //     ]
  //   });
  // });

  // it("should append anime properties arrays on pre-existing properties", () => {

  //   animeBuilder.add(SIMPLE_RULE);
  //   animeBuilder.add(SIMPLE_RULE);

  //   expect(animeBuilder.extractAnimeRules()).to.eql({
  //      animeBuilderId: true,
  //      translateX: [
  //       {
  //         value: 1,
  //         duration: 100,
  //         easing: "easeInOutQuad"
  //       },
  //       {
  //         value: 1,
  //         duration: 100,
  //         easing: "easeInOutQuad"
  //       }
  //     ]
  //   });
  // });

  // it("should throw an error when each property's duration sum does not equal one another", () => {
  //   const DIFFERENT_DURATION_RULE = {
  //     translateX: [
  //       {
  //         value: 1,
  //         duration: 100,
  //         easing: "easeInOutQuad"
  //       }
  //     ],
  //     translateY: [
  //       {
  //         value: 1,
  //         duration: 200,
  //         easing: "easeInOutQuad"
  //       }
  //     ]
  //   }

  //     expect(animeBuilder.add.bind(animeBuilder, DIFFERENT_DURATION_RULE)).to.throw(Error);
  // });

  // placeholder-property-value is an object within the property array. An array is (translateX, translateY, scaleX, etc..)
  it("should add a placeholder-property-value to a non-existing property that's duration does not equal the totalDuration", () => {
    
    animeBuilder.add(SIMPLE_RULE);
    animeBuilder.add(SIMPLE_RULE_P2);
    
    expect(
      animeBuilder.extractAnimeRules()).
      to.eql({
      animeBuilderId: true,
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ],
      scaleX: [
        {
          value: '*=1',
          duration: 100,
        },
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

//   it("should add a placeholder-property-value to an existing property that's duration does not equal the totalDuration", () => {
//     expect(true).to.equal(true);
//   });
});
