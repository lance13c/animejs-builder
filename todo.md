


# ToDo List

* Change guide animations to non-static so current position can be used. 
* Allow for current position to be used in animations
* Fix issue with animations affecting other animations (by adding default values at the current position). Issue invoves animations that do not have every transform set, causing other animations with not all transforms set to get affected. Is the intended outcome for each animation to be staggered? Can the anime library help with their staggard function or keyframes?
What value does the builder provide?
* Move Guide to its own library
* Create Build Demo Page that demos the ability to choose from premade animationa and combine them in many ways.
* Recreate my menu item effect with the builder and classes
* Create effect that sends guide to an element's left, right, top, bottom, or center position.
* Create Guide Demo Page


* Make sure all properties entered equal the same final duration.






Go through previously added animations. Add the ones that are new, with default values and total duration of all previous.

Current-build-duration
animation-property-duration

if (current-build-duration > animation-property-duration)
  add the animation property (previousValue or defaultVal, difference in duration)

