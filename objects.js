var playlist = { LilDurk: "Chiraqimony" }

function updatePlaylist(playlist, artistName, songTitle) {
  return Object.assign(playlist, { [artistName]: songTitle})
}

function removeFromPlaylist(playlist, artistName) {
  delete playlist.LilDurk
  return playlist
}
