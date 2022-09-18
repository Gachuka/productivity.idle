console.log('hey')
const baseUrl = "http://localhost:7878"
const timerLength = 30000
let typedString = ''
let characterCount = 0
let characterCountThisSave = 0
let dataLoaded = false

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]

// FETCH GET FUNCTION
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

// FETCH PUT FUNCTION
const fetchPUT = async (typedString, characterCount) => {
  const putBody = JSON.stringify({ 
    text_typed: typedString,
    character_count: Number(characterCount)
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

// EVENT HANDLER ON KEY PRESS
const downHandler = (event) => {

  // CHECK FOR NON CHARACTER KEYS AND REJECTS THEM FROM COUNTER
  if (notLogged.some(string => event.key === string)) {
    console.log("Not Logged");
    return;
  };

  // ADD CHARACTER OR COUNT TO VARIABLES
  typedString = typedString+event.key;
  characterCount += 1
  characterCountThisSave += 1

  // LOG DYNAMICALLY AS USER TYPE
  localStorage.setItem('key', event.key);
  localStorage.setItem('typed_string', typedString.slice(-110));
  localStorage.setItem('character_count', characterCount);
  localStorage.setItem('character_count_this_save', characterCountThisSave);

  // LOGGING TO CONSOLE FOR VISIBILITY
  console.log(event.key);
}

const savePeriod = () => {

  // LOG CURRENT SAVE COUNTER
  console.log(characterCountThisSave)
  characterCountThisSave = 0
  localStorage.setItem('character_count_this_save', characterCountThisSave);

  const textTypedBody = localStorage.getItem('typed_string');
  const characterCountBody = localStorage.getItem('character_count');
  fetchPUT(textTypedBody, characterCountBody);
  console.log('Game Saved');
  setTimeout(() => {savePeriod()}, timerLength);
}

// ON MOUNT
// ADD EVENTLISTENER FOR KEY PRESS
window.addEventListener("keydown", downHandler);

// EXECUTE INITIAL FUNCTIONALITY
fetchData();
setTimeout(savePeriod, timerLength);
