class Notifier {
  constructor( path = false ) {
    this.msgText = document.createElement( 'p' );
    this.msgText.id = 'finefind-notifier-text';
    this.msgText.part = this.msgText.id;

    this.subText = document.createElement( 'p' );
    this.subText.id = 'finefind-notifier-subtext';
    this.subText.part = this.subText.id;

    this.textBox = document.createElement( 'div' );
    this.textBox.id = 'finefind-notifier-textbox';
    this.textBox.part = this.textBox.id;
    this.textBox.appendChild( this.msgText );
    this.textBox.appendChild( this.subText );
    
    this.msgBox = document.createElement( 'div' );
    this.msgBox.id = 'finefind-notifier';
    this.msgBox.part = this.msgBox.id;
    if ( path ) {
      const icon = document.createElement( 'div' );
      icon.id = 'finefind-notifier-icon';
      icon.part = icon.id;
      icon.style.backgroundImage = 'url(' + path + ')';
      
      this.msgBox.appendChild( icon );
    }
    this.msgBox.appendChild( this.textBox );
  }

  getElement() {
    return this.msgBox;
  }

  show( text, subText = '' ) {
    for ( const element of this.textBox.children ) {
      while ( element.firstChild ) {
        element.removeChild( element.firstChild );
      }
    }

    this.msgText.appendChild( document.createTextNode( text ) );
    this.subText.appendChild( document.createTextNode( subText ) );

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