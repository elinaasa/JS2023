"use strict";

async function handleRequest(method, url, data = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const nonExistentGetUrl = "https://reqres.in/api/unknown/23";
handleRequest("GET", nonExistentGetUrl);

const nonExistentPostUrl = "https://reqres.in/api/unknown/23";
const postData = { name: "John Doe", job: "Web Developer" };
handleRequest("POST", nonExistentPostUrl, postData);
