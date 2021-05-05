document.addEventListener("DOMContentLoaded", () => {

  for (const burder of document.getElementsByClassName('navbar-burger') as HTMLCollectionOf<HTMLElement>) {

    burder.addEventListener('click', () => {

      const menuId = burder.dataset.target;

      const menu = document.getElementById(menuId);

      burder.classList.toggle('is-active');

      menu.classList.toggle('is-active');

    });

  };

});
