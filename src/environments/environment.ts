// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  firebase: {
    apiKey: "AIzaSyCnRI5jbCyUQmyallwu-SdKkNYjvVHG1hI",
    authDomain: "dbrealtime-7beaf.firebaseapp.com",
    databaseURL: "https://dbrealtime-7beaf-default-rtdb.firebaseio.com",
    projectId: "dbrealtime-7beaf",
    storageBucket: "dbrealtime-7beaf.appspot.com",
    messagingSenderId: "104938442756",
    appId: "1:104938442756:web:f8dd1a7ba0218f69a02551",
    measurementId: "G-133Z3PEHS1"
  },
  production: false
};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
