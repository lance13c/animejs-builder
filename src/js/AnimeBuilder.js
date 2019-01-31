import anime from 'animejs';

export default class AnimeBuilder {
  constructor(animeConfig = {}) {
    this.animeRules = {
      animeBuilderId: true               // Identifies this as a ruleset built by an AnimeBuilder
    };
    this.animeConfig = animeConfig;
    this.totalDuration = 0;
    this.propDurationMap = new Map();
    this.DEFAULT_VALUES = {
      scaleX: 1,
      scaleY: 1
    }
  }
  
  add(propertySet) {
    
    // TODO get this to work with extracted properties, animeBuilders and animeObjects
    
    for (let [propKey, propVal] of Object.entries(propertySet)) {
      if (!this.animeRules.hasOwnProperty(propKey)) {
        this.animeRules[propKey] = propVal;
      } else {
        propVal.forEach((val) => {
          this.animeRules[propKey].push(val);
        });
      }

      this._updatePropDurMap(propKey);
    }

    if (!this._checkSumEquality(this.propDurationMap)) { throw new Error(`Each property in the added property-set needs to have equal total durations: ${JSON.stringify([...this.propDurationMap])} `)};
    
    return this;
  }

/**
 * Calculates the duration sum of a property (translateX, translateY, scaleX, etc...)
 * @param {*} property - animation css property such as (translateX, translateY, scaleX, etc...)
 */
  _calcDurSum(property) {
    let propValArr = this.animeRules[property];

    return propValArr.reduce((p1, p2) => {
      let dur1 = (p1.duration) ? p1.duration : 0;
      let dur2 = (p2.duration) ? p2.duration : 0;
      return dur1 + dur2;
    }, 0);
  }

 
  /**
   * Checks if all of the values in the map are equivalent
   * returns true if all are equal
   * @param {Map} numberMap - Map of numbers
   * @return {boolean}
   */
  _checkSumEquality(numberMap) {
    if (numberMap.size === 0) { return true };


    const initVal = numberMap.values().next().value;
    for (let val of numberMap.values()) {
      if (initVal !== val) { return false };
    }

    return true;
  }



  _updatePropDurMap(property) {
    if (!property) { throw new Error(`Property ${property} is undefined`)}

    let totalDuration = this._calcDurSum(property);
    if (this.propDurationMap.has(property)) {
       this.propDurationMap.set(property, this.propDurationMap.get(property) + totalDuration);
       return;
    }

    this.propDurationMap.set(property, totalDuration);
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

  getDefaultValues() {
    return this.DEFAULT_VALUES;
  }

  getDefaultValue(property) {
    if (this.DEFAULT_VALUES[property]) {
      return this.DEFAULT_VALUES[property];
    }

    return 0;
  }
  
  generateAnime() {
    return anime(Object.assign(this.animeConfig, this.animeRules));
  }
}