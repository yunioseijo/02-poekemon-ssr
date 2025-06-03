const TOTAL_POKEMONS = 100; // Adjust this number based on the total pokemons you want to include
const TOTAL_PAGES = 10; // Adjust this number based on the total pages you want to include

( async () => {
  console.log('Generating routes for prerendering...');
  const fs = require( 'fs' );
  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonsIds.map(id => `/pokemon/${id}`).join('\n');

  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  fileContent += '\n' + pages.map(page => `/pokemons/page/${page}`).join('\n');
  //Otra forma de hacerlo con un ciclo for
  // for (let i = 1; i <= TOTAL_POKEMONS; i++) {
  //   fileContent += `\n/pokemons/page/${i}`;

  //POr nombres de pokemons
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}` )
  .then(res => res.json() );
  fileContent += '\n';
  fileContent += pokemonNameList.results.map(pokemon => `/pokemon/${pokemon.name}`).join('\n');
  fs.writeFileSync('routes.txt', fileContent);
  console.log('Routes file created with:', pokemonsIds.length, ' pokemons routes');


})();
