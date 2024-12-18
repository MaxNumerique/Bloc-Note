module.exports = {
  content: [
    "./views/**/*.{html,ejs,js}",  // Parcours tous les fichiers .ejs et .html dans le dossier views
    "./node_modules/flowbite/**/*.js"  // Inclut Flowbite pour l'analyse des classes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')  // Si vous utilisez Flowbite
  ],
};
