var playlist = { LilDurk: "Chiraqimony" }

function updatePlaylist(obj, key, value) {
  return Object.assign({playlist}, obj, { [key]: value})
}
