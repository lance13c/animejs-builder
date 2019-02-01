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
    
    if (!this._checkSumEquality(propertySet)) { throw new Error(`Each property in the added property-set needs to have equal total durations: ${JSON.stringify([...this.propDurationMap])} `)};

    for (let [propKey, propVal] of Object.entries(propertySet)) {
      
      let diffDur = this._getDurationDiff(propKey); 
      // Add placeholder if there is a duration difference
      if (diffDur > 0) { 
        this._addPlaceholderProp(propKey, diffDur);
      };

      if (!this.animeRules.hasOwnProperty(propKey)) {
        this.animeRules[propKey] = propVal;
      } else {
        propVal.forEach((val) => {
          this.animeRules[propKey].push(val);
        });
      }

      this._updatePropDurMap(propKey);
    }
    
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

  _getCurrentDuration(property) {
    if(!this.propDurationMap.has(property)) { return 0 };
     return this.propDurationMap.get(property);
  }

  /**
   * Sums up all of the duration of an array of prop values
   * @param {Array} propVals - An array of property values
   */
  _getDurationPropValSum(propVals) {
    return propVals.reduce((v1, v2) => {
      if (!v1.duration == undefined || !v2.duration == undefined) { throw new Error(`All propvals must have a duration. Propvals: ${propVals}`)}
      return v1.duration + v2.duration;
    }, {duration: 0});
  }

  _getDurationDiff(property) {
    let diffDur = this.totalDuration - this._getCurrentDuration(property);
    if (diffDur < 0) { throw new Error(`Property ${property} has a negitive duration difference, which is not allowed. Please check all added property durations`)}

    return diffDur;
  }

  /**
   * Adds a new propertyValue with the inputed duration.
   * The placeholder properties value will either be the current
   * value, or if no current value exists, the default value.
   * @param {*} property - The property to add the new placeholder to
   * @param {Number} duration - The duration of that placeholder property
   */
  _addPlaceholderProp(property, duration) {
    if (this.animeRules[property] == undefined) {
      this.animeRules[property] = [];
    }

    this.animeRules[property].push({
      value: '*=1',
      duration: duration
    });
  }

  /**
   * Gets the previous property value
   * @param {} property 
   */
  _getPreviousPropVal(property) {

  }

 
  /**
   * Checks if the sum of each property's duration values
   * is equivalent to each other. 
   * 
   * returns true if they are all are equal
   * @param {Object} propertySet - Object of 1 to many properties
   * @return {boolean}
   */
  _checkSumEquality(propertySet) {
    let compareDur = -1;

    for (let [propKey, propVals] of Object.entries(propertySet)) {   
      if (compareDur < 0) {
        compareDur = this._getDurationPropValSum(propVals);
      } else {
        if (compareDur !== this._getDurationPropValSum(propVals)) {
          return false;
        }
      }
    }

    return true;
  }



  _updatePropDurMap(property) {
    if (!property) { throw new Error(`Property ${property} is undefined`)}

    let propDurationSum = this._calcDurSum(property);
    if (this.propDurationMap.has(property)) {
       this.propDurationMap.set(property, this.propDurationMap.get(property) + totalDuration);
       return;
    }

    this.propDurationMap.set(property, propDurationSum);
    if (propDurationSum > this.totalDuration) { this.totalDuration = propDurationSum };
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