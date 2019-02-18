# animejs-modules


  Need a way to create reusable animations. 
  Put them in a given order.
  Allow them to run in parallel.
  Combine them to create new animations.

  All animations should be able to target any element.
  Animation should be functions such as: moveX(value, duration)

  create functions of functions to expand

    moveXY(durX, valX, durY, valY) {
      let xA = moveX(valX, durX)
      let yA = moveY(valY, durY)

      let mod = AnimeMod.combine([xA, yA]);
      return mod
    }



    {
      translateY: [
        { value: 250, duration: 500}
      ],
      translateX: [
        { value: 250, duration: 400}
      ],
    }

    {
      translateX: 250
    }


    { 
      translateX: [
        { value: 250, duration: 400}
      ],
    }




  AnimeModule({
    
  })

  .generate()

  AnimeModule.combine([]);




# animejs-library

- Create Animation List
  - moveX(distance, duration)
  - moveY(distance, duration)
  - moveXY(distanceX, distanceY, durationX (or XY), durationY (optional))
  - rotate(x,y,z)
  - scale(x,y)
  - shake(amplitude, delay)
  - zipX(distance, taillength, duration)
  - zipY(distance, taillength, duration)
  - zipXY(distanceX, distanceY, durationX (or XY), durationY (optional))
  - curve(radius, direction, distance (radian), duration)

- Create animation drag and drop

