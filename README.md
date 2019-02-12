# AnimeJS Builder 🎊🎊🎊
![min size](https://img.shields.io/bundlephobia/min/animejs-builder.svg?style=flat)
![npm version](https://img.shields.io/npm/v/animejs-builder.svg?colorB=violet&style=flat)
![last commit](https://img.shields.io/github/last-commit/lance13c/animejs-builder.svg?style=flat)

A sequential animation building tool for the Anime.js library.
Allowing for _smooth_, _seamless_, and _modular_ animations.

## Installation 💻

### NPM 💠

    $ npm install animejs
    $ npm install animejs-builder

### Yarn 💠
    
    $ yarn add animejs
    $ yarn add animejs-builder

### CDN 💠

    <script src="https://cdn.jsdelivr.net/npm/animejs-builder@0.0.8/lib/AnimeBuilder.iife.min.js"></script>

#### [CDN Link Here]("https://www.jsdelivr.com/package/npm/animejs-builder")

## How to Use Example 🍉

[AnimeJS Config Docs](https://animejs.com/documentation/#cssSelector)

    import anime from 'animejs';
    import AnimeBuilder from 'animejs-builder'

    const moveHorizontal = (length, duration) => {
      return {
        translateX: [
          {
            value: length, 
            duration: duration, 
            easing: 'easeInOutQuad'
          }
        ]
      }
    }

    const builder = new AnimeBuilder({
      targets: '.circle',
      autoplay: true
    });

    const animation = builder
      .add(moveHorizontal(200, 500))
      .add(moveHorizontal('+=200', 800))
      .add(moveHorizontal(0, 1000))
      .generateAnime();


### [CodePen]("https://codepen.io/lance13c/pen/NoyYOd") 🌀

### Restrictions ☢️

* Currently, properties **must** be defined in the array format

      translateX: [
        {
          value: length, 
          duration: duration, 
          easing: 'easeInOutQuad'
        }
      ]

## Features 🎁

### Placeholders 🗻

The Anime Builder adds property placeholders, so each additional animation happens sequentially after the other.

For example, look at the following

    const animation = builder
      .add({
        translateX: [
          {value: 100, duration: 1000}
        ]
      })
      .add({
        scaleX: [
          {value: 5, duration: 500}
        ]
      })
      .generateAnime();



When scaleX is added. A placeholder value for scaleX is added with a duration of 500. Internally the values will look like this.

    {
      translateX: [
        {value: 100, duration: 1000}
      ]
      scaleX: [
        {value: '*=1', duration: 1000},
        {value: 5, duration: 500}
      ]
    }

These placeholder values are added for any property in order to align each animation addition.


# Methods ⚔️

## class `AnimeBuilder([options])`

_**options**_ - `{Object}`

They are AnimeJS config options: [Anime JS Docs Here](https://animejs.com/documentation/#cssProperties)

_**description**_

Creates a new instance of AnimeBuilder

## `add([properties])`

_**properties**_ - `{Object of Property Arrays}`

`1. i.e`

    {
      translateX: [
        { value: 100, duration: 1000}
      ]
    }

`2. i.e`

    {
      opacity: [
        { value: 100, duration: 1000}
      ],
      rotateX: [
        { value: '80deg', duration: 800},
        { value: '0deg', duration: 400}
      ]
    }

_**@returns**_ - `{current AnimeBuilder instance}`


## `generateAnime()`

_**@returns**_ `{ AnimeJS instance }`

This generates the actual animejs animation.

## More Coming Soon 🎉🎉🎉