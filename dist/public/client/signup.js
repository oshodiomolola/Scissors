const formEl = document.querySelector(".signupForm");
const userEl = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPass = document.querySelector("#password");
const userconfirm = document.querySelector("#confirmPassword")


console.log(formEl)
async function signup(username, email, password, confirmPassword) {
  try {
  const response = await fetch("/users/signup", {
    method: "POST",
    body: JSON.stringify({email, username, password, confirmPassword}),
    headers: {"Content-Type": "application/json"} 
  })
  console.log(response)
  // console.log(JSON.stringify({email, username, password}))
  if (response.ok) {
    const data = await response.json()
    console.log(data)

    window.setTimeout(() => {
      location.assign('/views/login');
    }, 1000);

  } else {console.log("error")}
    
  } catch (err) {
console.log(err)
// console.log(err.response.json)
  }

}

formEl.addEventListener("submit", async (e)=> {
  e.preventDefault()
  const username = userEl.value
  const email = userEmail.value
  const password = userPass.value
  const confirmPassword = userconfirm.value
  await signup( username, email, password, confirmPassword)
})

