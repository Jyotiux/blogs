
# Blog Like Button with Firebase Realtime Database

This project adds a Like button functionality to blog posts using Firebase Realtime Database. It allows users to like or unlike individual blog posts, tracks the total number of likes in real-time, and persists the user’s like status locally.

## Features

- Real-time like count synced with Firebase Realtime Database
- Like/unlike toggle button with visual feedback (heart icon color)
- Persists user's like status locally using `localStorage`
- Automatically derives unique post ID from the blog page filename
- Easy integration with any static blog page

## How It Works

- The script extracts the blog post ID from the current page URL.
- It listens to the Firebase Realtime Database path `likes/blog-<postId>` to get live like count updates.
- The like button toggles the like status and updates the count in Firebase.
- User’s like status is saved in `localStorage` to maintain button state between sessions.
- The heart icon fills red if liked, and resets if unliked.

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database** for your project.
3. Use the provided Firebase config in the script or replace it with your own Firebase project config.
4. Set your Realtime Database rules to allow read/write for testing:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
````

> **Note:** For production, configure secure rules based on authentication.

## Usage

1. Add this JavaScript snippet to your blog pages, ideally before the closing `</body>` tag.

2. Add the following HTML elements where you want the like button:

```html
<button id="likeBtn">
  <svg id="heartIcon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
  <span id="likeCount">0</span>
</button>
```

3. Make sure to include Firebase SDK scripts before this script in your HTML:

```html
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>
```

## Code Explanation

* **Firebase Initialization:** The Firebase app initializes with your project config.
* **Post ID:** Extracted from the current page’s filename, e.g., `blog-post1.html` becomes `blog-post1`.
* **Realtime Listener:** Subscribes to changes in the like count in the database.
* **Local Storage:** Tracks whether the user has liked the post to maintain UI state.
* **Like Button Click:** Toggles like status, updates count in Firebase, and updates the UI.

## Dependencies

* Firebase JavaScript SDK (v8.x used in example)
* Modern browsers supporting `async/await` and `localStorage`

