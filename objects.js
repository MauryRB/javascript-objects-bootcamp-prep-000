var playlist = { LilDurk: "Chiraqimony" }

function updatePlaylist(playlist, artistName, songTitle) {
  return Object.assign({}, playlist, { [artistName]: songTitle})
}
