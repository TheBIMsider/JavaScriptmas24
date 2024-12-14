/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from './data.js';

// Initialize state
let currentUserIndex = 0;
let currentPhotoIndex = 0;
let isLoading = true;
let completedUsers = new Set();
let isPaused = false;
let cycleTimer = null;
let isViewingLikes = false;

// Load likes from localStorage or initialize empty if none exist
let likedPhotos = new Set(
  JSON.parse(localStorage.getItem('northgramLikedPhotos')) || []
);
let likesCounts = JSON.parse(localStorage.getItem('northgramLikeCounts')) || {};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const feedAvatarsSection = document.querySelector('.feed-avatars');
  const feedImagesSection = document.querySelector('.feed-images');

  // Add heart click handler
  document.querySelector('.heart').addEventListener('click', showLikedPhotos);

  // Helper to generate unique photo ID
  function getPhotoId(userIndex, photoIndex) {
    return `${userIndex}-${photoIndex}`;
  }

  // Helper to check if user is completed
  function isUserCompleted(userIndex) {
    return userIndex < currentUserIndex || completedUsers.has(userIndex);
  }

  // Save likes to localStorage
  function saveLikesToStorage() {
    localStorage.setItem(
      'northgramLikedPhotos',
      JSON.stringify([...likedPhotos])
    );
    localStorage.setItem('northgramLikeCounts', JSON.stringify(likesCounts));
  }

  // Check if photo is liked
  function isPhotoLiked(userIndex, photoIndex) {
    return likedPhotos.has(getPhotoId(userIndex, photoIndex));
  }

  // Get like count for a photo
  function getLikeCount(userIndex, photoIndex) {
    const photoId = getPhotoId(userIndex, photoIndex);
    return likesCounts[photoId] || 0;
  }

  // Toggle like status
  function toggleLike(userIndex, photoIndex) {
    const photoId = getPhotoId(userIndex, photoIndex);
    if (likedPhotos.has(photoId)) {
      likedPhotos.delete(photoId);
      likesCounts[photoId]--;
    } else {
      likedPhotos.add(photoId);
      likesCounts[photoId] = (likesCounts[photoId] || 0) + 1;
    }
    saveLikesToStorage();
    showPhoto();
  }

  // Show liked photos collection
  function showLikedPhotos() {
    isViewingLikes = true;
    isPaused = true;
    clearTimeout(cycleTimer);

    const likedPhotosList = [];
    feedData.forEach((user, userIndex) => {
      user.features.forEach((photo, photoIndex) => {
        if (isPhotoLiked(userIndex, photoIndex)) {
          likedPhotosList.push({
            ...photo,
            handle: user.handle,
            userIndex,
            photoIndex,
            likeCount: getLikeCount(userIndex, photoIndex),
          });
        }
      });
    });

    if (likedPhotosList.length === 0) {
      feedImagesSection.innerHTML = `
               <div class="help-screen">
                   <h2>Liked Photos</h2>
                   <div class="help-content">
                       <p>No liked photos yet! ❤️</p>
                       <button class="back-button">Back to Feed</button>
                   </div>
               </div>
           `;
    } else {
      feedImagesSection.innerHTML = `
               <div class="liked-photos-container">
                   <h2>Liked Photos</h2>
                   <div class="liked-photos-grid">
                       ${likedPhotosList
                         .map(
                           (photo) => `
                           <div class="liked-photo">
                               <img src="images/${photo.imageUrl}" alt="${photo.alt}" class="liked-photo-img">
                               <div class="liked-photo-info">
                                   <span class="liked-photo-handle">${photo.handle}</span>
                                   <span class="liked-photo-likes">❤️ ${photo.likeCount}</span>
                               </div>
                           </div>
                       `
                         )
                         .join('')}
                   </div>
                   <button class="back-button">Back to Feed</button>
               </div>
           `;
    }

    const backButton = feedImagesSection.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', () => {
        isViewingLikes = false;
        isPaused = false;

        // Reset indices if we were in completion state
        if (currentUserIndex === -1) {
          currentUserIndex = 0;
          currentPhotoIndex = 0;
          completedUsers = new Set();
          isLoading = true;
        }

        showPhoto();
        cyclePhotos();
      });
    }
  }

  function renderAvatars() {
    feedAvatarsSection.innerHTML = feedData
      .map(
        (user, index) => `
          <img 
            src="images/${user.avatarUrl}" 
            alt="${user.handle}'s avatar" 
            class="avatar
              ${currentUserIndex === index && !isLoading ? 'highlight' : ''}
              ${isUserCompleted(index) ? 'completed' : ''}"
          >
        `
      )
      .join('');
  }

  // Navigation functions
  function nextPhoto() {
    if (currentPhotoIndex + 1 < feedData[currentUserIndex].features.length) {
      currentPhotoIndex++;
    } else if (currentUserIndex + 1 < feedData.length) {
      completedUsers.add(currentUserIndex); // Mark current user as completed
      currentUserIndex++;
      currentPhotoIndex = 0;
    } else {
      completedUsers.add(currentUserIndex); // Mark final user as completed
      showComplete();
      return;
    }
    showPhoto();
    renderAvatars();
  }

  function previousPhoto() {
    if (currentPhotoIndex > 0) {
      currentPhotoIndex--;
    } else if (currentUserIndex > 0) {
      completedUsers.delete(currentUserIndex - 1); // Remove completed status when going back
      currentUserIndex--;
      currentPhotoIndex = feedData[currentUserIndex].features.length - 1;
    }
    showPhoto();
    renderAvatars();
  }

  // Show loading state
  function showLoading() {
    feedImagesSection.innerHTML = `
           <div class="ux-loading" role="status">☃️☃️☃️</div>
       `;
  }

  // Show completion message
  function showComplete() {
    // Add final user to completed set
    completedUsers.add(currentUserIndex);
    currentUserIndex = -1;
    renderAvatars();

    feedImagesSection.innerHTML = `
           <p class="ux-message">Refresh to load latest images</p>
       `;
    clearTimeout(cycleTimer);
  }

  // Show help screen
  function showHelp() {
    feedImagesSection.innerHTML = `
           <div class="help-screen">
               <h2>Welcome to Northgram! 🎄</h2>
               <div class="help-content">
                   <p>A social media app for friends in Lapland! Here's how it works:</p>
                   <ul>
                       <li>Photos cycle automatically every 1.5 seconds</li>
                       <li>Click image to pause/resume</li>
                       <li>Use ❮ ❯ arrows to navigate manually</li>
                       <li>Click 🤍 to like photos</li>
                       <li>Click ❤️ in header to see all your liked photos</li>
                       <li>Circle avatars show who's pictures are showing</li>
                       <li>Red border shows current friend</li>
                       <li>Grey avatars show completed slideshows</li>
                   </ul>
                   <button class="back-button">Back to Photos</button>
               </div>
           </div>
       `;

    // Add click handler for back button
    const backButton = feedImagesSection.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      showPhoto();
      if (!isPaused) cyclePhotos();
    });

    // Pause the slideshow while help is shown
    clearTimeout(cycleTimer);
  }

  // Show current photo
  function showPhoto() {
    const currentUser = feedData[currentUserIndex];
    const currentPhoto = currentUser.features[currentPhotoIndex];
    const isLiked = isPhotoLiked(currentUserIndex, currentPhotoIndex);
    const likeCount = getLikeCount(currentUserIndex, currentPhotoIndex);

    feedImagesSection.innerHTML = `
           <div class="feature-container">
               <div class="help-button" aria-label="Show help">❔</div>
               <img 
                   src="images/${currentPhoto.imageUrl}" 
                   alt="${currentPhoto.alt}" 
                   class="feature-image"
               >
               <div class="feature-caption">
                   ${currentPhoto.alt}
               </div>
               <button class="nav-arrow nav-arrow-left" aria-label="Previous photo">❮</button>
               <button class="nav-arrow nav-arrow-right" aria-label="Next photo">❯</button>
               <button class="pause-button" aria-label="${
                 isPaused ? 'Resume' : 'Pause'
               }">${isPaused ? '▶' : '⏸'}</button>
               <div class="like-container">
                   <button class="like-button ${
                     isLiked ? 'liked' : ''
                   }" aria-label="${isLiked ? 'Unlike' : 'Like'} photo">
                       ${isLiked ? '❤️' : '🤍'}
                   </button>
                   <span class="like-count">${likeCount} ${
      likeCount === 1 ? 'like' : 'likes'
    }</span>
               </div>
           </div>
       `;

    // Add event listeners
    const container = feedImagesSection.querySelector('.feature-container');
    container
      .querySelector('.nav-arrow-left')
      .addEventListener('click', (e) => {
        e.stopPropagation();
        previousPhoto();
      });
    container
      .querySelector('.nav-arrow-right')
      .addEventListener('click', (e) => {
        e.stopPropagation();
        nextPhoto();
      });
    container.querySelector('.pause-button').addEventListener('click', (e) => {
      e.stopPropagation();
      togglePause();
    });
    container.querySelector('.like-button').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(currentUserIndex, currentPhotoIndex);
    });
    container.querySelector('.help-button').addEventListener('click', (e) => {
      e.stopPropagation();
      showHelp();
    });
    container.addEventListener('click', togglePause);
  }

  function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
      clearTimeout(cycleTimer);
    } else {
      cyclePhotos();
    }
    showPhoto();
  }

  // Main cycling function
  function cyclePhotos() {
    if (isLoading) {
      showLoading();
      setTimeout(() => {
        isLoading = false;
        renderAvatars();
        showPhoto();
        if (!isPaused) cyclePhotos();
      }, 2000);
      return;
    }

    if (!isPaused) {
      cycleTimer = setTimeout(() => {
        nextPhoto();
        if (!isPaused) cyclePhotos();
      }, 1500);
    }
  }

  // Add click handler for refresh
  feedImagesSection.addEventListener('click', (e) => {
    if (e.target.closest('.ux-message')) {
      currentUserIndex = 0;
      currentPhotoIndex = 0;
      isLoading = true;
      completedUsers = new Set();
      isPaused = false;
      likedPhotos.clear();
      likesCounts = {};
      localStorage.removeItem('northgramLikedPhotos');
      localStorage.removeItem('northgramLikeCounts');
      cyclePhotos();
    }
  });

  // Start the app
  cyclePhotos();
});
