class Notifier {
  constructor( path = false ) {
    this.textBox = document.createElement( 'div' );
    this.#setIdAndPart( this.textBox, 'finefind-notifier-textbox' );

    this.msgBox = document.createElement( 'div' );
    this.#setIdAndPart( this.msgBox, 'finefind-notifier' );
    if ( path ) {
      const icon = document.createElement( 'div' );
      icon.style.backgroundImage = 'url(' + path + ')';
      this.#setIdAndPart( icon, 'finefind-notifier-icon' );
      
      this.msgBox.appendChild( icon );
    }
    this.msgBox.appendChild( this.textBox );
  }

  #setIdAndPart( element, id ) {
    element.setAttribute( 'id', id );
    element.setAttribute( 'part', id );
  }

  #createTextElement( text, id = false ) {
    const p = document.createElement( 'p' );
    if ( id ) {
      this.#setIdAndPart( p, id );
    }
    p.appendChild( document.createTextNode( text ) );

    return p;
  }

  getElement() {
    return this.msgBox;
  }

  show( text, subText = false ) {
    while ( this.textBox.firstChild ) {
      this.textBox.firstChild.remove();
    }

    this.textBox.appendChild( this.#createTextElement( text, 'finefind-notifier-text' ) );
    if ( subText ) {
      this.textBox.appendChild( this.#createTextElement( subText, 'finefind-notifier-subtext' ) );
    }

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