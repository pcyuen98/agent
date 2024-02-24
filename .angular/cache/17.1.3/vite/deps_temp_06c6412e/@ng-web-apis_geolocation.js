import {
  DOCUMENT
} from "./chunk-X73D5MPF.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  fromEvent,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CJTEXJNZ.js";
import {
  Observable,
  distinctUntilChanged,
  finalize,
  map,
  share,
  shareReplay,
  startWith
} from "./chunk-PCN2CFEU.js";

// node_modules/@ng-web-apis/common/fesm2015/ng-web-apis-common.js
var WINDOW = new InjectionToken("An abstraction over global window object", {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error("Window is not available");
    }
    return defaultView;
  }
});
var ANIMATION_FRAME = new InjectionToken("Shared Observable based on `window.requestAnimationFrame`", {
  factory: () => {
    const { requestAnimationFrame, cancelAnimationFrame } = inject(WINDOW);
    const animationFrame$ = new Observable((subscriber) => {
      let id = NaN;
      const callback = (timestamp) => {
        subscriber.next(timestamp);
        id = requestAnimationFrame(callback);
      };
      id = requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(id);
      };
    });
    return animationFrame$.pipe(share());
  }
});
var CACHES = new InjectionToken("An abstraction over window.caches object", {
  factory: () => inject(WINDOW).caches
});
var CRYPTO = new InjectionToken("An abstraction over window.crypto object", {
  factory: () => inject(WINDOW).crypto
});
var CSS = new InjectionToken("An abstraction over window.CSS object", {
  factory: () => inject(WINDOW).CSS || {
    escape: (v) => v,
    supports: () => false
  }
});
var HISTORY = new InjectionToken("An abstraction over window.history object", {
  factory: () => inject(WINDOW).history
});
var LOCAL_STORAGE = new InjectionToken("An abstraction over window.localStorage object", {
  factory: () => inject(WINDOW).localStorage
});
var LOCATION = new InjectionToken("An abstraction over window.location object", {
  factory: () => inject(WINDOW).location
});
var NAVIGATOR = new InjectionToken("An abstraction over window.navigator object", {
  factory: () => inject(WINDOW).navigator
});
var MEDIA_DEVICES = new InjectionToken("An abstraction over window.navigator.mediaDevices object", {
  factory: () => inject(NAVIGATOR).mediaDevices
});
var NETWORK_INFORMATION = new InjectionToken("An abstraction over window.navigator.connection object", {
  // @ts-ignore
  factory: () => inject(NAVIGATOR).connection || null
});
var PAGE_VISIBILITY = new InjectionToken("Shared Observable based on `document visibility changed`", {
  factory: () => {
    const documentRef = inject(DOCUMENT);
    return fromEvent(documentRef, "visibilitychange").pipe(startWith(0), map(() => documentRef.visibilityState !== "hidden"), distinctUntilChanged(), shareReplay({ refCount: false, bufferSize: 1 }));
  }
});
var PERFORMANCE = new InjectionToken("An abstraction over window.performance object", {
  factory: () => inject(WINDOW).performance
});
var SCREEN = new InjectionToken("An abstraction over window.screen object", {
  factory: () => inject(WINDOW).screen
});
var SESSION_STORAGE = new InjectionToken("An abstraction over window.sessionStorage object", {
  factory: () => inject(WINDOW).sessionStorage
});
var SPEECH_RECOGNITION = new InjectionToken("An abstraction over SpeechRecognition class", {
  factory: () => {
    const windowRef = inject(WINDOW);
    return windowRef.speechRecognition || windowRef.webkitSpeechRecognition || null;
  }
});
var SPEECH_SYNTHESIS = new InjectionToken("An abstraction over window.speechSynthesis object", {
  factory: () => inject(WINDOW).speechSynthesis
});
var USER_AGENT = new InjectionToken("An abstraction over window.navigator.userAgent object", {
  factory: () => inject(NAVIGATOR).userAgent
});

// node_modules/@ng-web-apis/geolocation/fesm2015/ng-web-apis-geolocation.js
var GEOLOCATION = new InjectionToken("An abstraction over window.navigator.geolocation object", {
  factory: () => inject(NAVIGATOR).geolocation
});
var POSITION_OPTIONS = new InjectionToken("Token for an additional position options", {
  factory: () => ({})
});
var GEOLOCATION_SUPPORT = new InjectionToken("Is Geolocation API supported?", {
  factory: () => {
    return !!inject(GEOLOCATION);
  }
});
var GeolocationService = class extends Observable {
  constructor(geolocationRef, geolocationSupported, positionOptions) {
    let watchPositionId = 0;
    super((subscriber) => {
      if (!geolocationSupported) {
        subscriber.error("Geolocation is not supported in your browser");
      }
      watchPositionId = geolocationRef.watchPosition((position) => subscriber.next(position), (positionError) => subscriber.error(positionError), positionOptions);
    });
    return this.pipe(finalize(() => geolocationRef.clearWatch(watchPositionId)), shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
};
GeolocationService.ɵfac = function GeolocationService_Factory(t) {
  return new (t || GeolocationService)(ɵɵinject(GEOLOCATION), ɵɵinject(GEOLOCATION_SUPPORT), ɵɵinject(POSITION_OPTIONS));
};
GeolocationService.ɵprov = ɵɵdefineInjectable({
  token: GeolocationService,
  factory: GeolocationService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GeolocationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Geolocation,
      decorators: [{
        type: Inject,
        args: [GEOLOCATION]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [GEOLOCATION_SUPPORT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [POSITION_OPTIONS]
      }]
    }];
  }, null);
})();
export {
  GEOLOCATION,
  GEOLOCATION_SUPPORT,
  GeolocationService,
  POSITION_OPTIONS
};
//# sourceMappingURL=@ng-web-apis_geolocation.js.map
