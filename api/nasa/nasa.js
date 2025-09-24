// /api/nasa.js
const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const apiKey = process.env.NASA_API_KEY || "KANKNjQmUpKYnuayvv9I27xllUMAPcUMvL5BOi1d";

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    if (!res.ok) {
      context.log.error(`NASA API error: ${res.statusText}`);
      context.res = {
        status: res.status,
        body: { error: res.statusText }
      };
      return;
    }

    const data = await res.json();
    context.res = {
      status: 200,
      body: data
    };
  } catch (err) {
    context.log.error("Fetch error:", err);
    context.res = {
      status: 500,
      body: { error: "Failed to fetch NASA APOD", details: err.message }
    };
  }
};
