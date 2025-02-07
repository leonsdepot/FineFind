class Utils {
  static defaultSettings = {
    settings: {
      showBannerOnActivation: { value: false },
      showBannerOnFailure: { value: true },
      debounceTime: { value: 0 },
      highlighterDuration: { value: 1000 },
      highlighterHueDegree: { value: 0 },
      highlighterBrightness: { value: 1 },
      highlighterSaturation: { value: 1 }
    }
  }

  static saveOptions( entries ) {
    browser.storage.sync.set( { settings: entries } );
  }

  static restoreOptions() {
    return browser.storage.sync.get()
    .then( storageItems => {
      if ( ! storageItems.settings ) {
        storageItems = this.defaultSettings;

        browser.storage.sync.set( this.defaultSettings );
      } else {
        for ( const [key, value] of Object.entries( this.defaultSettings.settings ) ) {
          if ( ! storageItems.settings[key] ) {
            storageItems.settings[key] = value;
            
            browser.storage.sync.set( storageItems );
          }
        }
      }

      return storageItems.settings;
    })
  }

  static resetOptions() {
    return browser.storage.sync.remove( 'settings' );
  }

  static getAllStorageData() {
    return browser.storage.sync.get()
  }

  static getLocalizedString( key ) {
    return browser.i18n.getMessage( key );
  }

  static getInternalURL( path ) {
    return browser.runtime.getURL( path );
  }
}