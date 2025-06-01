const prompt = require("prompt-sync")({ sigint: true });
const username = prompt("Enter your github username : ").toLowerCase();
const baseUrl = `https://api.github.com/users/${username}/events/public`;

async function getData() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Response.status: ${response.status}`);
    } 

    const data = await response.json();
    console.log(`Raw event count: ${data.length}`);

    if (!data.length) {
      throw new Error("No events found for this user.");
    }

    data.forEach(event => {
      console.log(`ID: ${event.id}`);
      console.log(`Type: ${event.type}`);
      console.log(`Activity: ${event.repo.name}`);
      console.log('----------------------------');
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

getData();