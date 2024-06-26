const formEl = document.querySelector(".loginForm");
const userEmail = document.querySelector("#email");
const userPass = document.querySelector("#password");
console.log(formEl)
async function login(email, password) {
  try {
  const response = await fetch("/users/login", {
    method: "POST",
    body: JSON.stringify({email, password}),
    headers: {"Content-Type": "application/json"} 
  })
  console.log(response)
  // console.log(JSON.stringify({email, password}))
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    if(data !== null) {
      localStorage.setItem("token", data.token)

      window.setTimeout(() => {
      location.assign('/views/shortenUrl');
    }, 1000);
    } else {return new Error("error occured")} 

    

  } else {throw new Error(response.statusText)}
    
  } catch (err) {
console.log(err)
// console.log(err.response.json)
  }
}


formEl.addEventListener("submit", async (e)=> {
  e.preventDefault()
  const email = userEmail.value
  const password = userPass.value
  await login(email, password)
})