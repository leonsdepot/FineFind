class Highlighter {
  constructor( path ) {
    this.ring = document.createElement( 'div' );
    this.ring.setAttribute( 'id', 'finefind-indicator' );
    this.ring.setAttribute( 'part', 'finefind-indicator' );
    this.ring.style.backgroundImage = 'url(' + path + ')';

    this.animation = new Animation(
      new KeyframeEffect(
        this.ring,
        [
          { backgroundSize: '100%' },
          { backgroundSize: '0%' }
        ],
        { duration: 500, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' }
      )
    )
  }

  getElement() {
    return this.ring;
  }

  moveTo( x, y ) {
    this.ring.style.left = ( x - ( this.ring.offsetWidth / 2 ) ) + 'px';
    this.ring.style.top = ( y - ( this.ring.offsetHeight / 2 ) ) + 'px';
  }

  updateColor( hueDegree, brightness = 1, saturation = 1 ) {
    this.ring.style.filter =
      'hue-rotate(' + hueDegree + 'deg) ' +
      'brightness(' + brightness + ') ' +
      'saturate(' + saturation + ')';
  }

  cancelAnimation() {
    this.animation.cancel();
  }

  animate( milliseconds = 1000 ) {
    this.cancelAnimation();
    this.animation.effect.updateTiming( { duration: milliseconds } );
    this.animation.play();
  }
}