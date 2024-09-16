# Music Player Web Application

A simple and interactive web-based music player application built with HTML, CSS, and JavaScript. This application allows users to play, pause, and navigate through a list of songs with a user-friendly interface.

## Features

- Play and pause songs
- Navigate to the next or previous song
- Display song details including cover photo and name
- Show and update the progress bar and timestamp
- Display the duration of each song
- Responsive design

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/music-player.git
    ```

2. Navigate to the project directory:

    ```bash
    cd music-player
    ```

3. Open `index.html` in your preferred web browser.

## Code Overview

### Variables

- `songIndex`: Keeps track of the current song index.
- `audioElement`: The audio element used to play songs.
- `masterPlay`, `gif`, `progressiveBar`, `songLists`, `songItemPlay`, `masterSongName`, `nextPlay`, `prevPlay`, `timestamp`: DOM elements used for various functionalities.

### Functions

- `formatTime(time)`: Formats time in `mm:ss` format.
- `makeAllPlays()`: Resets all play buttons to the play state.
- `makeAllSongsDuration()`: Updates the duration of each song in the list.

### Event Listeners

- `audioElement.addEventListener("timeupdate", ...)`: Updates the progress bar and timestamp as the song plays.
- `progressiveBar.addEventListener("change", ...)`: Seeks to a different part of the song when the progress bar is changed.
- `songItemPlay.forEach((element) => { ... })`: Handles the play/pause event for each song in the list.
- `masterPlay.addEventListener("click", ...)`: Handles the play/pause event for the master play button.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, please contact (mailto:piyushkumar17pk@gmail.com).
