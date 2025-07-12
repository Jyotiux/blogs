document.addEventListener("DOMContentLoaded", () => {
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBXI5sz9Tbn268zRK2M357GzVS03SLjPlI",
    authDomain: "blog-fb6ea.firebaseapp.com",
    projectId: "blog-fb6ea",
    storageBucket: "blog-fb6ea.appspot.com",
    messagingSenderId: "768157840978",
    appId: "1:768157840978:web:bc367c475eea4298b9518b",
    measurementId: "G-QVVGKSLB11",
    databaseURL: "https://blog-fb6ea-default-rtdb.firebaseio.com"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Derive blog ID from filename
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");
  const postId = `blog-${filename}`;

  const likeRef = db.ref("likes/" + postId);
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const heartIcon = document.getElementById("heartIcon");

  const localKey = `liked-${postId}`;
  let liked = localStorage.getItem(localKey) === "true";

  function updateStyle(count) {
    likeCount.textContent = count;
    heartIcon.setAttribute("fill", liked ? "#e11d48" : "currentColor");
  }

  // Sync live count
  likeRef.on("value", (snapshot) => {
    const count = snapshot.val() || 0;
    updateStyle(count);
  });

  likeBtn.onclick = async () => {
    const snap = await likeRef.get();
    let count = snap.exists() ? snap.val() : 0;

    if (liked) {
      count = Math.max(0, count - 1);
      await likeRef.set(count);
      localStorage.setItem(localKey, "false");
      liked = false;
    } else {
      count += 1;
      await likeRef.set(count);
      localStorage.setItem(localKey, "true");
      liked = true;
    }

    updateStyle(count);
  };
});
