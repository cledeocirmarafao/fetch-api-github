const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = ` 
                    <div class="info">
                    <img src="${
                      user.avatarUrl
                    }" alt="Imagem do perfil do usuário" />
                    <div class="data">
                    <h1>${user.name ?? "Usuário não cadastrado 😥"}</h1>
                    <p>${user.bio ?? "Bio não cadastrada 😥"}</p>
                    <div class="user-stats">
        <span class="followers-stats">👥 Seguidores: ${user.followers}</span>
        <span class="following-stats">👣 Seguindo: ${user.following}</span>
    </div>
                    </div>
                    </div>`;
                    
    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li>
                                    <a href="${repo.html_url}">${repo.name}</a>
                                    <div class="repos-stats">
                <p class="event" alt="forks">🍴 ${repo.forks}</p>
                <p class="event">⭐ ${repo.stargazers_count}</p>
                <p  class="event">👀 ${repo.watchers}</p>
                <p class="event">👨‍💻 ${repo.language ?? '-'}</p>
              </div>
                              </li>`)
    );
    
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories">
                            <h2>Repositórios</h2>
                            <ul>${repositoriesItens}</ul>
                    </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado 😥</h3>";
  },
};

export { screen };