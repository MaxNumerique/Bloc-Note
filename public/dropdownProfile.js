//Function to create a new note

async function createNote() {
    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').value.trim();

    if (!titre || !description) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    try {
        const response = await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titre, description, tags })  
        });
        
        if (!response.ok) throw Error('Error creating note');

        const newNote = await response.json();

        // Ajout dynamique de la nouvelle note dans le Feed
        appendNoteToView(newNote);

        // Réinitialiser les champs du formulaire
        document.getElementById('titre').value = '';
        document.getElementById('description').value = '';
        document.getElementById('tags').value = '';

        const closeModalButton = document.querySelector('[data-modal-hide="note-modal"]');
        if (closeModalButton) {
            closeModalButton.click(); // Simuler un clic sur le bouton de fermeture de la modale
        }
    }
    catch (error) {
        console.log(error);
    }
}




//Function to add a new note to the view

function appendNoteToView(note) {
    const main = document.querySelector('main');

    // Vérifier s'il existe déjà une note, et retirer la marge de la dernière note
    const lastNote = main.lastElementChild;
    if (lastNote) {
        lastNote.style.removeProperty('margin-bottom');
    }
    const noteDiv = document.createElement('div');
    noteDiv.classList.add(
        'w-full',
        'mt-8',
        'max-w-xl',
        'bg-white',
        'border',
        'border-gray-200',
        'rounded-lg',
        'shadow',
        'dark:bg-gray-800',
        'dark:border-gray-700',
        'relative'
    );

    noteDiv.innerHTML = `
    <div class="flex justify-between px-4 pt-4">
      <div class="flex flex-wrap gap-1 items-center">
        ${
          note.tags
            ? note.tags
                .split(' ')
                .map(tag => `<a href="#" class="px-2 py-1 text-xs font-medium text-white bg-[#374151] rounded-lg hover:bg-[#374151] dark:bg-[#374151]">#${tag.trim()}</a>`)
                .join('')
            : '<span class="text-xs font-medium text-gray-500">No tags available</span>'
        }
      </div>
       <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span class="sr-only">Open dropdown</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Afficher</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Modifier</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Supprimer</a
                >
              </li>
            </ul>
          </div>
        </div>
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ${note.title} <span class="text-xs text-gray-500 dark:text-gray-400">${note.author}</span>
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">${note.created_at}</span>
      </div>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${note.content}</p>
      <div class="flex justify-end mt-4">
        <a
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Favoris
        </a>
        <a
          href="#"
          class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Like
        </a>
      </div>
    </div>
  `;

    noteDiv.style.marginBottom = '7rem';

    //Comportement des dropdowns après l'ajout d'une nouvelle note
    function setupDropdowns() {
        // Ajout d'écouteurs sur tous les boutons
        document.querySelectorAll('[data-dropdown-toggle]').forEach((dropdownToggle) => {
            // Exclure le bouton du profil
            if (dropdownToggle.id === 'dropdownProfileButton') return;
    
            dropdownToggle.removeEventListener('click', handleDropdownToggle); // Supprime les anciens écouteurs
            dropdownToggle.addEventListener('click', handleDropdownToggle);   // Ajoute un nouvel écouteur
        });
    
        // Ajout d'un écouteur global pour fermer les menus au clic à l'extérieur
        document.body.removeEventListener('click', closeAllDropdowns); // Supprime l'ancien écouteur global
        document.body.addEventListener('click', closeAllDropdowns);    // Ajoute un nouvel écouteur global
    
        // Positionnement du menu pour qu'il n'interfère pas avec son container ni le bouton associé
        const dropdownMenus = document.querySelectorAll('[data-dropdown-toggle] + .z-10');
        dropdownMenus.forEach((dropdownMenu) => {
            // Exclure le menu du profil
            if (dropdownMenu.id === 'dropdownProfile') return;
    
            const dropdownButton = dropdownMenu.previousElementSibling; // Trouve le bouton associé
            if (dropdownButton) {
                const buttonRect = dropdownButton.getBoundingClientRect(); // Obtenez la position du bouton
                dropdownMenu.style.position = 'absolute';
                dropdownMenu.style.top = `${buttonRect.height + 15}px`; // Ajouter un décalage plus important
                dropdownMenu.style.right = '-3rem'; // S'assurer que le menu est bien aligné à droite
                dropdownMenu.style.zIndex = '100';
                dropdownMenu.style.marginTop = '0.5rem';
            }
        });
    
        // Positionnement du bouton pour qu'il n'interfère pas avec son menu
        const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
        dropdownToggles.forEach(button => {
            // Exclure le bouton du profil
            if (button.id === 'dropdownProfileButton') return;
    
            button.style.position = 'relative';
            button.style.zIndex = '10';
        });
    }
    
    
    
    function handleDropdownToggle(event) {
        event.stopPropagation(); // Empêche la propagation de l'événement pour fermer le menu actuel
        const dropdownMenu = this.nextElementSibling; // Trouve le menu associé
        if (dropdownMenu && dropdownMenu.id !== 'dropdownProfile') {
            // Cache tous les autres menus
            document.querySelectorAll('[data-dropdown-toggle] + .z-10').forEach(menu => {
                if (menu !== dropdownMenu) menu.classList.add('hidden');
            });
            // Bascule la visibilité du menu actuel
            dropdownMenu.classList.toggle('hidden');
        }
    }
    
    function closeAllDropdowns() {
        // Ferme tous les menus déroulants
        document.querySelectorAll('[data-dropdown-toggle] + .z-10').forEach(menu => {
            if (menu.id !== 'dropdownProfile') menu.classList.add('hidden');
        });
    }
    
    
    
    main.appendChild(noteDiv);

    setupDropdowns();
}

