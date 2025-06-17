export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1000,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].text.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
