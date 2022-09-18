console.log('hey')
const baseUrl = "http://localhost:7878"
let typedString = ''

const savePeriod = () => {
  const newTypedString = typedString.slice(-110)
  localStorage.setItem('typed_string', newTypedString)
  fetchPUT(newTypedString)
  console.log('Game Saved')
  setTimeout(() => {savePeriod()}, 5000)
}

const downHandler = (event) => {
  typedString = typedString+event.key
  localStorage.setItem('key', event.key)
  localStorage.setItem('typed_string', typedString.slice(-110))
  console.log(event.key)
  const key = event.key  
}

const fetchData = async (event) => {
  console.log(event)
  const res = await fetch(baseUrl, {        
    method: "GET",        
    mode: "cors",      
  });      
  const txt = await res.text();
  console.log(txt)
  localStorage.setItem('typed_string', JSON.parse(txt))
  typedString = JSON.parse(txt)
}

const fetchPUT = async (typedString) => {
  const putBody = JSON.stringify({ 
    text_typed: typedString,
    character_count: 1
  })
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

window.addEventListener("keydown", downHandler)
fetchData()
savePeriod()
