var playlist = { key: "value" }

function updatePlaylist(obj, key, value) {
  return Object.assign({playlist}, obj, { [key]: value})
}
