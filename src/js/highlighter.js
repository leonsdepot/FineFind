class Highlighter {
  constructor( path ) {
    this.ring = document.createElement( 'div' );
    this.ring.setAttribute( 'id', 'finefind-indicator' );
    this.ring.setAttribute( 'part', 'finefind-indicator' );
    this.ring.style.backgroundImage = 'url(' + path + ')';
  }

  getElement() {
    return this.ring;
  }

  moveTo( x, y ) {
    this.ring.style.left = ( x - ( this.ring.offsetWidth / 2 ) ) + 'px';
    this.ring.style.top = ( y - ( this.ring.offsetHeight / 2 ) ) + 'px';
  }

  animate() {
    this.ring.animate(
      [
        { backgroundSize: '100%' },
        { backgroundSize: '0%' }
      ],
      {
        duration: 1000,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
      }
    )
  }
}