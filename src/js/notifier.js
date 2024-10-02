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

    this.isAnimationReady = false;
  }

  #initAnimations() {
    const slideIn = [
      {
        transform: 'translateX(-100%)'
      },
      {
        visibility: 'visible',
        transform: 'translateX(2.2em)'
      }
    ]
    const slideOut = [
      {
        transform: 'translateX(-100%)'
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

    this.msgBoxIn = new Animation(
      new KeyframeEffect(
        this.msgBox,
        slideIn,
        { duration: 450, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'both' }
      )
    )

    this.msgBoxOut = new Animation(
      new KeyframeEffect(
        this.msgBox,
        slideOut,
        { duration: 450, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'both' }
      )
    )

    this.circle1 = new Animation(
      new KeyframeEffect(
        this.circleLeftFill,
        rotate,
        { duration: 10000, fill: 'both' }
      )
    )

    this.circle2 = new Animation(
      new KeyframeEffect(
        this.circleRightFill,
        rotate,
        { duration: 10000, fill: 'both' }
      )
    )

    this.msgBoxIn.addEventListener( 'finish', () => {
      this.circle1.play();
    })

    this.circle1.addEventListener( 'finish', () => {
      this.circle2.play();
    })

    this.circle2.addEventListener( 'finish', () => {
      this.msgBoxOut.play();
    })

    this.msgBoxOut.addEventListener( 'finish', () => {
      this.#clearText();
    })
  }

  #setIdAndPart( element, id ) {
    element.setAttribute( 'id', id );
    element.setAttribute( 'part', id );
  }

  #clearText() {
    while ( this.textBox.firstChild ) {
      this.textBox.firstChild.remove();
    }
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
    this.#clearText();

    this.textBox.appendChild( this.#createTextElement( text, 'finefind-notifier-text' ) );
    if ( subText ) {
      this.textBox.appendChild( this.#createTextElement( subText, 'finefind-notifier-subtext' ) );
    }

    this.animate();
  }

  animate( milliseconds = 4000 ) {
    if ( ! this.isAnimationReady ) {
      this.isAnimationReady = true;
      this.#initAnimations();
    }
    else {
      this.msgBox.getAnimations( { subtree: true } ).forEach( animation => {
        animation.cancel();
      })
    }

    this.circle1.effect.updateTiming( { duration: ( milliseconds / 2 ) } );
    this.circle2.effect.updateTiming( { duration: ( milliseconds / 2 ) } );

    this.msgBoxIn.play();
  }
}