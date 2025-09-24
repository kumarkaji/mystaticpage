const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const apiKey = process.env.NASA_API_KEY || "KANKNjQmUpKYnuayvv9I27xllUMAPcUMvL5BOi1d";

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    if (!res.ok) {
      context.log.error(`NASA API responded with status: ${res.status} ${res.statusText}`);
      context.res = {
        status: res.status,
        body: {
          error: `NASA API returned an error: ${res.statusText}`
        }
      };
      return;
    }

    const data = await res.json();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data
    };
  } catch (error) {
    context.log.error("Error fetching data from NASA API:", error);
    context.res = {
      status: 500,
      body: {
        error: "Failed to fetch NASA APOD",
        details: error.message
      }
    };
  }
};
