const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const apiKey = process.env.NASA_API_KEY || "KANKNjQmUpKYnuayvv9I27xllUMAPcUMvL5BOi1d";

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    const data = await res.json();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: "Failed to fetch NASA APOD" }
    };
  }
};
