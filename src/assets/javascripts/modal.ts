document.addEventListener("DOMContentLoaded", () => {

  for (const element of document.querySelectorAll
    ('.modal-close, .modal-open, .modal-background') as NodeListOf<HTMLElement>) {

    element.addEventListener('click', () => {

      const modalId = element.dataset.target;

      const modal = document.getElementById(modalId);

      const modalPreview = modal.querySelector('.modal-preview');

      if (element.className === 'modal-open') {

        const modalPreviewImage = element.querySelector('.modal-thumbnail').getAttribute('src');

        modalPreview.setAttribute('src', modalPreviewImage);

      };

      modal.classList.toggle('is-active');

    });

  };

});
