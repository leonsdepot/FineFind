class Utils {
  static defaultSettings = {
    settings: {
      showBanner: { value: true },
      highlighterDuration: { value: 1000 }
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

  static getLocalizedString( key ) {
    return browser.i18n.getMessage( key );
  }
}