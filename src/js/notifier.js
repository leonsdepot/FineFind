class Notifier {
  constructor( path = false ) {
    this.msgText = document.createElement( 'p' );
    
    this.msgBox = document.createElement( 'div' );
    this.msgBox.id = 'finefind-notifier';
    if ( path ) {
      const icon = document.createElement( 'div' );
      icon.style.backgroundImage = 'url(' + path + ')';
      
      this.msgBox.appendChild( icon );
    }
    this.msgBox.appendChild( this.msgText );
  }

  getElement() {
    return this.msgBox;
  }

  show( text ) {
    while ( this.msgText.firstChild ) {
      this.msgText.removeChild( this.msgText.firstChild );
    }
    this.msgText.appendChild( document.createTextNode( text ) );

    this.animate();
  }

  animate() {
    this.msgBox.animate(
      [
        {
          visibility: 'visible',
          left: '-' + this.msgBox.offsetWidth + 'px'
        },
        {
          left: '2.2rem',
          offset: 0.3
        },
        {
          left: '2.2rem',
          offset: 0.95
        },
        {
          visibility: 'hidden',
          left: '-' + this.msgBox.offsetWidth + 'px',
        }
      ],
      {
        duration: 3000,
        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
      }
    )
  }
}