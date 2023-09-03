"use strict";
async function postData() {
  try {
    const url = "https://reqres.in/api/users";
    const userData = {
      name: "John Doe",
      job: "Web Developer",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error in request: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

postData();
