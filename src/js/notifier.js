class Notifier {
  constructor( path = false ) {
    this.textBox = document.createElement( 'div' );
    this.#setIdAndPart( this.textBox, 'finefind-notifier-textbox' );

    this.circleLeftFill = document.createElement( 'div' );
    this.#setIdAndPart( this.circleLeftFill, 'finefind-circle-left-fill' );

    const circleLeft = document.createElement( 'div' );
    this.#setIdAndPart( circleLeft, 'finefind-circle-left' );
    circleLeft.appendChild( this.circleLeftFill );

    this.circleRightFill = document.createElement( 'div' );
    this.#setIdAndPart( this.circleRightFill, 'finefind-circle-right-fill' );

    const circleRight = document.createElement( 'div' );
    this.#setIdAndPart( circleRight, 'finefind-circle-right' );
    circleRight.appendChild( this.circleRightFill );

    const circleLoading = document.createElement( 'div' );
    this.#setIdAndPart( circleLoading, 'finefind-circle-loading' );
    circleLoading.appendChild( circleLeft );
    circleLoading.appendChild( circleRight );

    this.msgBox = document.createElement( 'div' );
    this.#setIdAndPart( this.msgBox, 'finefind-notifier' );
    if ( path ) {
      const icon = document.createElement( 'div' );
      icon.style.backgroundImage = 'url(' + path + ')';
      this.#setIdAndPart( icon, 'finefind-notifier-icon' );
      
      this.msgBox.appendChild( icon );
    }
    this.msgBox.appendChild( this.textBox );
    this.msgBox.appendChild( circleLoading );

    this.msgBox.addEventListener( 'mouseenter', event => {
      event.stopPropagation();

      this.msgBox.getAnimations( { subtree: true } ).forEach( animation => {
        if ( animation.playState == 'running' ) {
          animation.pause();
        }
      });
    })

    this.msgBox.addEventListener( 'mouseleave', event => {
      event.stopPropagation();

      this.msgBox.getAnimations( { subtree: true } ).forEach( animation => {
        if ( animation.playState == 'paused' ) {
          animation.play();
        }
      });
    })
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

  animate( milliseconds = 3000 ) {
    const halfMilliseconds = ( milliseconds / 2 );

    const slideIn = [
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
    ]
    const rotate = [
      {
        transform: 'rotate(0deg)'
      },
      {
        transform: 'rotate(180deg)'
      }
    ]

    this.msgBox.animate(
      slideIn,
      { duration: milliseconds, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' }
    )

    this.circleLeftFill.animate(
      rotate,
      { duration: halfMilliseconds, fill: 'both' }
    )

    this.circleRightFill.animate(
      rotate,
      { duration: halfMilliseconds, fill: 'both', delay: halfMilliseconds }
    )
  }
}