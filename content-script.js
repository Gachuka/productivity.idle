console.log('Content Script Running')
const baseUrl = "http://localhost:7878"
const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const timerLength = 10000

let typedString = ''
let typedStringThisSave = ''
let characterCount = 0
let characterCountThisSave = 0
let dataLoaded = false
let addPerInput = 1

// FETCH GET FUNCTION
const fetchGET = async (event) => {

  // GET REQUEST
  const res = await fetch(baseUrl, {
    method: "GET",
    mode: "cors",
  });
  const txt = await res.text();

  return txt
}

// SET DATA FROM SAVE FILE
const setData = async () => {

  console.log("Data Loaded")
  const data = await fetchGET()

  // STORE DATA TO LOCALSTORAGE
  localStorage.setItem('typed_string', JSON.parse(data).text_typed);
  localStorage.setItem('typed_string_this_save', '');
  localStorage.setItem('character_count', JSON.parse(data).character_count);
  localStorage.setItem('character_count_this_save', 0);
  typedString = JSON.parse(data).text_typed;
  characterCount = JSON.parse(data).character_count
  dataLoaded = true
  addPerInput = JSON.parse(data).add_per_input
  console.log(JSON.parse(data).add_per_input)
}

// FETCH PUT FUNCTION
const fetchPUT = async (typedString, characterCount) => {

  // CREATE PUT BODY
  const putBody = JSON.stringify({ 
    text_typed: typedString,
    character_count: Number(characterCount)
  });

  // PUT REQUEST
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
  typedString = localStorage.getItem('typed_string') + event.key;
  typedStringThisSave = localStorage.getItem('typed_string_this_save') + event.key
  characterCount = Number(localStorage.getItem('character_count')) + addPerInput
  characterCountThisSave = Number(localStorage.getItem('character_count_this_save')) + addPerInput

  // LOG DYNAMICALLY AS USER TYPE
  localStorage.setItem('key', event.key);
  localStorage.setItem('typed_string', typedString);
  localStorage.setItem('typed_string_this_save', typedStringThisSave);
  localStorage.setItem('character_count', characterCount);
  localStorage.setItem('character_count_this_save', characterCountThisSave);

  // LOGGING TO CONSOLE FOR VISIBILITY
  console.log(event.key);
}

// SAVE ON INTERVAL
const savePeriod = async () => {

  const currentTimestamp = Date.now()
  const getData = await fetchGET()

  // GRAB MOST RECET DATA AND FETCH PUT REQUEST
  const textTypedBody = JSON.parse(getData).text_typed + localStorage.getItem('typed_string_this_save');
  const characterCountBody = JSON.parse(getData).character_count + Number(localStorage.getItem('character_count_this_save'));
  console.log(textTypedBody)
  localStorage.setItem('typed_string', textTypedBody);
  await fetchPUT(textTypedBody, characterCountBody);
  console.log('Game Saved');

  // CONSOLE.LOG CURRENT SAVE COUNTER AND RESET
  console.log(typedStringThisSave)
  console.log(characterCountThisSave)
  typedStringThisSave = ''
  characterCountThisSave = 0
  localStorage.setItem('typed_string_this_save', typedStringThisSave);
  localStorage.setItem('character_count', JSON.parse(getData).character_count);
  localStorage.setItem('character_count_this_save', characterCountThisSave);

}

// ON MOUNT
// ADD EVENTLISTENER FOR KEY PRESS
window.addEventListener("keydown", downHandler);
window.onfocus = setData

// EXECUTE INITIAL FUNCTIONALITY
setData();
setInterval(savePeriod, timerLength);
