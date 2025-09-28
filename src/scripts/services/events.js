import { baseUrl } from "../variables.js";

async function getEvents(userName) {
  const response = await fetch(`${baseUrl}/${userName}/events`);
  return await response.json();
}

async function filterEvents(userName) {
  try {
    const events = await getEvents(userName);

    const eventPush = await events.filter(
      (event) => event.type === "PushEvent"
    );
    const eventCreate = await events.filter(
      (event) => event.type === "CreateEvent"
    );

    try {
  
    if (eventPush.length === 0 && eventCreate.length === 0) {
      document.querySelector(".profile-data").innerHTML += "";
      return;
    }
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
  }

    const pushData = eventPush.map((event) => {
      return {
        repo: event.repo?.name ?? 'Repositório Desconhecido',
        commits: event.payload.commits.map((commit) => commit.message),
      };
    });

    const createData = eventCreate.map((event) => {
      return {
        repo: event.repo.name,
      };
    });

    let pushHtml = `
  <div class="events">
    <div class="push-create">
      <h3 class="tittle">Push Events</h3>
      <ul class="list">
`;

    pushData.slice(0, 10).forEach((item) => {
      pushHtml += `
    <li><span>Nome do repositório:</span> ${item.repo}</li>
    <li><span>Commit:</span> ${item.commits
      .map((message) => message)
      .join(", ")}</li>
  `;
    });

    pushHtml += `
      </ul>
    </div>
  </div>
`;

    let createHtml = `
  <div class="events">
    <div class="push-create">
      <h3 class="tittle">Create Events</h3>
      <ul class="list">
`;

    createData.slice(0, 10).forEach((item) => {
      createHtml += `
    <li><span>Nome do repositório:</span> ${item.repo}</li>
    <li><span>Commit:</span> Sem mensagem de commit</li>
  `;
    });

    createHtml += `
      </ul>
    </div>
  </div>
`;

    document.querySelector(".profile-data").innerHTML += `
  <div class="events">
    ${pushHtml + createHtml}
  </div>
`;
  } catch (error) {
    console.error("Erro ao buscar eventos:", err);
  }
}

export { getEvents, filterEvents };