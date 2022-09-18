console.log('hey')
const baseUrl = "http://localhost:7878"
let typedString = ''
let characterCount = 0
let dataLoaded = false

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]

const fetchData = async (event) => {
  const res = await fetch(baseUrl, {        
    method: "GET",        
    mode: "cors",      
  });      
  const txt = await res.text();
  console.log(JSON.parse(txt));
  localStorage.setItem('typed_string', JSON.parse(txt).text_typed);
  localStorage.setItem('character_count', JSON.parse(txt).character_count);
  typedString = JSON.parse(txt).text_typed;
  characterCount = JSON.parse(txt).character_count
  dataLoaded = true
}

const fetchPUT = async (typedString) => {
  const putBody = JSON.stringify({ 
    text_typed: typedString,
    character_count: characterCount
  });
  const res = await fetch(baseUrl, {        
    method: "PUT",        
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: putBody 
  }).then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  }).catch((error) => {
    console.error('Error:', error);
  }); 
}

const downHandler = (event) => {

  if (notLogged.some(string => event.key === string)) {
    console.log("Not Logged");
    return;
  };

  typedString = typedString+event.key;
  localStorage.setItem('key', event.key);
  localStorage.setItem('typed_string', typedString.slice(-110));
  console.log(event.key);
  const key = event.key;
}

const savePeriod = () => {
  const newTypedString = typedString.slice(-110);
  localStorage.setItem('typed_string', newTypedString);
  fetchPUT(newTypedString);
  console.log('Game Saved');
  setTimeout(() => {savePeriod()}, 30000);
}

window.addEventListener("keydown", downHandler);
fetchData();

setTimeout(savePeriod, 30000);
