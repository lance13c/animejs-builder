import anime from 'animejs';

export default class AnimeBuilder {
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