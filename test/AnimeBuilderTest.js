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

  const TWO_PROPERTY_RULE = {
      scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    }

    const THREE_PROPERTY_RULE = {
      scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ],
      translateY: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    }

    const THREE_PROP_VAL_RULE = {
      translateZ: [
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 200,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    }


    function animeMoveX(distance, {
                    duration = 1000}) {
    return {
      translateX: [
        {
          duration: duration,
        }
      ],
      scaleX: [
        {duration: (duration / 8)},
        {duration: (duration * 3/8)},
        {duration: (duration * 4/8)},
      ],
      scaleY: [
        {duration: (duration / 8)},
        {duration: (duration * 6/8)},
        {duration: (duration / 8)},
      ]
    }
  }
  
  function animeMoveY(distance, {
                    duration = 1000}) {
    return {
      translateY: [
        {
          duration: duration,
        }
      ],
      scaleX: [
        {duration: (duration / 8)},
        {duration: (duration * 6/8)},
        {duration: (duration / 8)}
      ],
      scaleY: [
        {duration: (duration / 8)},
        {duration: (duration * 3/8)},
        {duration: (duration * 4/8)}
      ]
    }
  }

      // Rule with different prop
    const OFFSET_RULE = {
      scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
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
  

  it("should add anime properties when no properties exist", () => {
    
    animeBuilder.add(SIMPLE_RULE);

    expect(animeBuilder.extractAnimeRules()).to.eql({
       animeBuilderId: true,
       translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

  it("should append anime properties arrays on pre-existing properties", () => {

    animeBuilder.add(SIMPLE_RULE);
    animeBuilder.add(SIMPLE_RULE);

    expect(animeBuilder.extractAnimeRules()).to.eql({
       animeBuilderId: true,
       translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

  it("should be able to accept an array of 2 animation properties", () => {
    
    animeBuilder.add(TWO_PROPERTY_RULE);

    expect(animeBuilder.extractAnimeRules()).to.eql({
       animeBuilderId: true,
       scaleY: [
          {
            value: 1,
            duration: 700,
            easing: "easeInOutQuad"
          }
        ],
        translateX: [
          {
            value: 1,
            duration: 100,
            easing: "easeInOutQuad"
          }
        ]
    });
  });

  it("should be able to accept an array of 3 animation properties", () => {
    
    animeBuilder.add(THREE_PROPERTY_RULE);

    expect(animeBuilder.extractAnimeRules()).to.eql({
       animeBuilderId: true,
       scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ],
      translateY: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

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

  it("should add a placeholder-property-value to an existing property that's duration does not equal the totalDuration", () => {

    const TRANSLATE_X_100_RULE = {
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    }
    
    animeBuilder.add(OFFSET_RULE);
    animeBuilder.add(TRANSLATE_X_100_RULE);
    
    expect(animeBuilder.extractAnimeRules()).
      to.eql({
      animeBuilderId: true,
      scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
        {
          value: '*=1',
          duration: 600,
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
      ]
    });
  });

  it("should be able to handel three addition of multiple properties and add placeholders", () => {
    animeBuilder.add(OFFSET_RULE);
    animeBuilder.add(OFFSET_RULE);
    animeBuilder.add(OFFSET_RULE);
    
    expect(animeBuilder.extractAnimeRules()).
      to.eql({
      animeBuilderId: true,
      scaleY: [
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
        {
          value: '*=1',
          duration: 600,
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
        {
          value: '*=1',
          duration: 600,
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
      ]
    });
  });

  it("should allow for multiple property when adding a value", () => {

    // See if the total amount of all the new properties durations in one add, 

    // Know the difference in duration between the properties already added, add a placeholder of that difference after them

    // TotalDur - currentPropDur = deltaPropDur
    // If deltaPropDur > 0
    // Add placeholder

    animeBuilder.add(THREE_PROP_VAL_RULE);

    let rules = animeBuilder.extractAnimeRules();

    expect(rules).to.eql({
      animeBuilderId: true,
      translateZ: [
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 200,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

  it("should allow for multiple properties when adding mutiple values of the same property", () => {

    // See if the total amount of all the new properties durations in one add, 

    // Know the difference in duration between the properties already added, add a placeholder of that difference after them

    // TotalDur - currentPropDur = deltaPropDur
    // If deltaPropDur > 0
    // Add placeholder

    animeBuilder.add(THREE_PROP_VAL_RULE);
    animeBuilder.add(THREE_PROP_VAL_RULE);

    let rules = animeBuilder.extractAnimeRules();

    expect(rules).to.eql({
      animeBuilderId: true,
      translateZ: [
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 200,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 200,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

  it("should allow for multiple different properties when adding mutiple values of the same property", () => {

    // See if the total amount of all the new properties durations in one add, 

    // Know the difference in duration between the properties already added, add a placeholder of that difference after them

    // TotalDur - currentPropDur = deltaPropDur
    // If deltaPropDur > 0
    // Add placeholder

    animeBuilder.add(THREE_PROP_VAL_RULE);
    animeBuilder.add(THREE_PROPERTY_RULE);

    let rules = animeBuilder.extractAnimeRules();

    expect(rules).to.eql({
      animeBuilderId: true,
      translateZ: [
        {
          value: 1,
          duration: 300,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 200,
          easing: "easeInOutQuad"
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ],
      scaleY: [
        {
          value: '*=1',
          duration: 600
        },
        {
          value: 1,
          duration: 700,
          easing: "easeInOutQuad"
        }
      ],
      translateX: [
        {
          value: '*=1',
          duration: 600
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ],
      translateY: [
        {
          value: '*=1',
          duration: 600
        },
        {
          value: 1,
          duration: 100,
          easing: "easeInOutQuad"
        }
      ]
    });
  });

  it("should calculate the correct placeholder durations for complex inputs", () => {

    let move1 = animeMoveX(100, {duration: 800, trailLength: 12});
    let move2 = animeMoveY(100, {duration: 800, trailLength: 12})
    let move3 = animeMoveY(0, {duration: 800, trailLength: 12});
    let move4 = animeMoveX(200, {duration: 800, trailLength: 12});

    animeBuilder
    .add(move1)
    .add(move2)
    .add(move3)
    .add(move4)


    expect(animeBuilder.extractAnimeRules()).to.eql({
      animeBuilderId: true,
      scaleX: [
        {duration: 100},
        {duration: 300},
        {duration: 400},
        {duration: 100},
        {duration: 600},
        {duration: 100},
        {duration: 100},
        {duration: 600},
        {duration: 100},
        {duration: 100},
        {duration: 300},
        {duration: 400},
        
      ],
      scaleY: [
        {duration: 100},
        {duration: 600},
        {duration: 100},
        {duration: 100},
        {duration: 300},
        {duration: 400},
        {duration: 100},
        {duration: 300},
        {duration: 400},
        {duration: 100},
        {duration: 600},
        {duration: 100},
      ],
      translateX: [
        {duration: 800},
        {value: "*=1", duration: 1600},
        {duration: 800}
      ],
      translateY: [
        {value: "*=1", duration: 800},
        {duration: 800},
        {duration: 800}
      ]
    });
  });
});
