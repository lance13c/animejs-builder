# AnimeJS Builder

A sequential animation building tool for the Anime.js library.
Allowing for _smooth_, _seamless_, and _modular_ animations.

## Installation

    npm install animejs
    npm install animejs-builder

or
    
    yarn add animejs
    yarn add animejs-builder

## How to Use Example

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
      .add(moveHorizontal(100, 500))
      .add(moveHorizontal(200, 1000))
      .generateAnime();


### Restrictions

* Currently, properties **must** be defined in the array format

      translateX: [
        {
          value: length, 
          duration: duration, 
          easing: 'easeInOutQuad'
        }
      ]

## Features

### Placeholders

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

More Coming Soon