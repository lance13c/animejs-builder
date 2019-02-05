// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"RPpU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _animejs = _interopRequireDefault(require("animejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimeBuilder {
  constructor(animeConfig = {}) {
    this.animeRules = {
      animeBuilderId: true // Identifies this as a ruleset built by an AnimeBuilder

    };
    this.animeConfig = animeConfig;
    this.totalDuration = 0; // This will be updated more often than totalDuration.
    // totalduration is read too often so it needs a temp storage

    this.tempDur = 0;
    this.propDurationMap = new Map();
    this.DEFAULT_VALUES = {
      scaleX: 1,
      scaleY: 1
    };
  }

  add(propertySet) {
    // TODO get this to work with extracted properties, animeBuilders and animeObjects
    //if (!this._checkSumEquality(propertySet)) { throw new Error(`Each property in the added property-set needs to have equal total durations: ${JSON.stringify([...this.propDurationMap])} `)};
    for (let [propKey, propVal] of Object.entries(propertySet)) {
      // After all props have been added
      let diffDur = this._getDurationDiff(propKey); // Add placeholder if there is a duration difference


      if (diffDur > 0) {
        this._addPlaceholderProp(propKey, diffDur);

        this._addToPropDurMap(propKey, diffDur);
      }

      ;

      if (!this.animeRules.hasOwnProperty(propKey)) {
        this.animeRules[propKey] = propVal.slice(0);

        let durSum = this._getDurationPropValSum(propVal.slice(0));

        this._addToPropDurMap(propKey, durSum);
      } else {
        propVal.forEach(val => {
          this.animeRules[propKey].push(val);

          this._addToPropDurMap(propKey, val.duration);
        });
      } //this._updatePropDurMap(propKey);

    }

    this.totalDuration = this._getHighestDurFromMap(this.propDurationMap);
    return this;
  }
  /**
   * Calculates the duration sum of a property (translateX, translateY, scaleX, etc...)
   * @param {*} property - animation css property such as (translateX, translateY, scaleX, etc...)
   */


  _calcDurSum(property) {
    let propValArr = this.animeRules[property];
    let sumDurObj = propValArr.reduce((p1, p2) => {
      let dur1 = p1.duration ? p1.duration : 0;
      let dur2 = p2.duration ? p2.duration : 0;
      return {
        duration: dur1 + dur2
      };
    }, 0);
    return sumDurObj.duration;
  }

  _getCurrentDuration(property) {
    if (!this.propDurationMap.has(property)) {
      return 0;
    }

    ;
    return this.propDurationMap.get(property);
  }
  /**
   * Sums up all of the duration of an array of prop values
   * @param {Array} propVals - An array of property values
   */


  _getDurationPropValSum(propVals) {
    let durObj = propVals.reduce((v1, v2) => {
      if (!v1.duration == undefined || !v2.duration == undefined) {
        throw new Error(`All propvals must have a duration. Propvals: ${propVals}`);
      }

      return {
        duration: v1.duration + v2.duration
      };
    }, {
      duration: 0
    });
    return durObj.duration;
  }

  _getDurationDiff(property) {
    let diffDur = this.totalDuration - this._getCurrentDuration(property);

    if (diffDur < 0) {
      throw new Error(`Property ${property} has a negitive duration difference, which is not allowed. Please check all added property durations`);
    }

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
  /**
   * 
   * @param {*} durationMap - a propDurationMap, map linking props to their total durations
   */


  _getHighestDurFromMap(durationMap) {
    let highestDur = 0;

    for (let duration of durationMap.values()) {
      if (duration > highestDur) {
        highestDur = duration;
      }
    }

    return highestDur;
  }

  _updatePropDurMap(property) {
    if (!property) {
      throw new Error(`Property ${property} is undefined`);
    }

    let propDurationSum = this._calcDurSum(property);

    if (propDurationSum > this.tempDur) {
      this.tempDur = propDurationSum;
    }

    ;

    this._addToPropDurMap(property, propDurationSum);
  }

  _addToPropDurMap(property, duration) {
    if (this.propDurationMap.has(property)) {
      this.propDurationMap.set(property, this.propDurationMap.get(property) + duration);
      return;
    }

    this.propDurationMap.set(property, duration);
  } // adds functions that happens on every animation update


  onUpdate(callback) {
    this.animeConfig.update = callback;
    return this;
  } // Returns the raw pre generated ruleset


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
    return (0, _animejs.default)(Object.assign(this.animeConfig, this.animeRules));
  }

}

exports.default = AnimeBuilder;
},{}]},{},["RPpU"], "AnimeBuilder")
//# sourceMappingURL=/AnimeBuilder.map