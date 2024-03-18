const formEl = document.querySelector(".signupForm");
const userEl = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPass = document.querySelector("#password");
console.log(formEl)
async function signup(username, email, password) {
  try {
  const response = await fetch("http://localhost:8000/users/signup", {
    method: "POST",
    body: JSON.stringify({email, username, password}),
    headers: {"Content-Type": "application/json"} 
  })
  console.log(response)
  // console.log(JSON.stringify({email, username, password}))
  if (response.ok) {
    const data = await response.json()
    console.log(data)
  } else {throw new Error(response.statusText)}
    
  } catch (err) {
console.log(err)
console.log(err.response.json)
  }
}


formEl.addEventListener("submit", async (e)=> {
  e.preventDefault()
  const username = userEl.value
  const email = userEmail.value
  const password = userPass.value
  await signup( username, email, password)
})

