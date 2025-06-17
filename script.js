const form = document.getElementById('premortemForm')
const output = document.getElementById('output')
const results = document.getElementById('results')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  output.textContent = 'Simulating...'
  results.classList.remove('hidden')

  const data = new FormData(form)
  const prompt = `
You are a startup failure simulator. A founder gives you details about their startup. 
You will generate 10 realistic and painful ways this startup could fail. 
Each should be 2–3 sentences and include a root cause label.

Startup Details:
Problem: ${data.get('problem')}
Solution: ${data.get('solution')}
Target Users: ${data.get('users')}
Monetization: ${data.get('monetization')}
Tech Stack: ${data.get('tech')}
Team: ${data.get('team')}

Generate failure scenarios:
`

  try {
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.8
      })
    })

    const json = await res.json()
    output.textContent = json.choices[0].text.trim()
  } catch (err) {
    output.textContent = "Error: " + err.message
  }
})
