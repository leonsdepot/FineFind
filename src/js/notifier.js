class Notifier {
  constructor( path = false ) {
    this.textBox = document.createElement( 'div' );
    this.textBox.id = 'finefind-notifier-textbox';
    this.textBox.part = this.textBox.id;

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

  #createTextElement( text, id = false ) {
    const p = document.createElement( 'p' );
    if ( id ) {
      p.id = id;
      p.part = id;
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