console.log('hey')
const baseUrl = "http://localhost:7878"
let typrddtring = ''

const res = await fetch(baseUrl, {        
  method: "GET",        
  mode: "cors",      
});      
const txt = await res.text();
console.log(txt)

const downHandler = async (event) => {
  localStorage.setItem('key', event.key)
  console.log(event.key)
  const key = event.key
  const putBody = JSON.stringify({ text_typed: event.key })
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
