function addProfileButton(user) {
  const profileButtonHTML = `
    <li>
      <a href="/profile.html" class="btn-profile d-flex align-items-center">
        <img src="/assets/img/avatar2.svg" alt="Profile" class="rounded-circle" style="width: 30px; height: 30px; margin-right: 8px;">
        <span>${user.displayName || "User"}</span>
      </a>
    </li>
  `;
  const navMenu = document.querySelector("#navbar ul");
  if (navMenu && !document.querySelector(".btn-profile")) {
    navMenu.insertAdjacentHTML("beforeend", profileButtonHTML);
  }
}
