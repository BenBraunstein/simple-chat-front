document.addEventListener("DOMContentLoaded", function(e) {
  let user = prompt("Please enter your name")
  document.querySelector("#sender").value = user
  grabMessages()
  const refreshInterval = setInterval(function() {
    grabMessages()
  }, 150)
  const form = document.querySelector("#chatForm")
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    postMessage(e.target)
  })
})

function grabMessages() {
  fetch("http://localhost:3000/messages")
    .then(resp => resp.json())
    .then(function(messages) {
      renderMessages(messages)
    })
}

function postMessage(form) {
  fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sender: form.sender.value,
      message: form.message.value
    })
  })
    .then(resp => resp.json())
    .then(function(json) {
      grabMessages()
      form.reset()
    })
}

function renderMessages(messages) {
  const length = messages.length
  const mostRecent = messages.slice(length - 50)
  const list = document.querySelector("#message-list")
  list.innerHTML = ""
  let newList = ""
  mostRecent.forEach(message => {
    newList += makeLi(message)
  })
  list.innerHTML = newList
}

function makeLi(message) {
  return `
    <li data-id='${message.id}'>${message.sender}: ${message.message}</li>
    `
}
