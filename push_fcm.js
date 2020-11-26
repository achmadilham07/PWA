< !--The core Firebase JS SDK is always required and must be listed first-- >
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>

<!--TODO: Add SDKs for Firebase products that you want to use
https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>

<script>
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBTOkeAd1RwCI2bTOd7SgzS9dk1QnyOByw",
    authDomain: "pwa-for-dicoding.firebaseapp.com",
    databaseURL: "https://pwa-for-dicoding.firebaseio.com",
    projectId: "pwa-for-dicoding",
    storageBucket: "pwa-for-dicoding.appspot.com",
    messagingSenderId: "256531626146",
    appId: "1:256531626146:web:a1fcc570b21002cdea3ffb",
    measurementId: "G-961VL373WM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>