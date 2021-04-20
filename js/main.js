//Example fetch using pokemonapi.co
// dom object
document.querySelector("button").addEventListener("click", pokeHandler);


//let pokeID

async function pokeHandler() {
 // run reset for evolutions
 
  const pokeContainer = document.querySelector('#pokeContainer')
  pokeContainer.innerHTML= ''

  async function getFetch(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async function getPokeInfo(pokemon) {
    const pokeData = await getFetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemon
    );
    return pokeData;
  }

  // this adds html elements for the pokemon name and pokemon image
  //suggestions? - create 2 functions 1 for second evolution one for third evolution
  // multiple paramaters for base/second evo/third evo
  async function postPokeSprite(pokemonData) {
    const pokeHTML = `
      <p class='pokeEvolotion'>${pokemonData.name}</p>
      <img class='pokeEvolution' src=${pokemonData.sprites.front_default} />
    `;
    const pokeDestination = document.getElementById("pokeContainer");

    pokeDestination.insertAdjacentHTML("beforeend", pokeHTML);
  }

  try {
    // when the function is called it will step outside its syncrronous structure
    const choice = document.querySelector("input").value;

    const pokeData = await getPokeInfo(choice);

    // console.log(pokeData);

    document.querySelector("span").innerHTML = pokeData.types[0].type.name;
    document.querySelector("#moves").innerHTML = pokeData.moves[0].move.name;
    document.querySelector("#moves2").innerHTML = pokeData.moves[1].move.name;
    document.querySelector("#moves3").innerHTML = pokeData.moves[2].move.name;
    document.querySelector("#img1").src = pokeData.sprites.front_default;
    document.querySelector("#img").src = pokeData.sprites.back_default;

    pokeID = pokeData.species.url;
    const speciesData = await getFetch(pokeID);

    // console.log(speciesData);

    const evoChainUrl = speciesData.evolution_chain.url;
    const evoChainData = await getFetch(evoChainUrl);

    console.log(evoChainData);


    const basePokemon = evoChainData.chain.species.name;
    postPokeSprite(await getPokeInfo(basePokemon));
    if (evoChainData.chain.evolves_to.length > 0 && evoChainData.chain.evolves_to !== []) {
      for(let i= 0;i <evoChainData.chain.evolves_to.length;i++) {
        console.log('second evolution of pokemon')
        postPokeSprite(await getPokeInfo(evoChainData.chain.evolves_to[i].species.name))
        
      }
      if(evoChainData.chain.evolves_to[0].evolves_to.length > 0 && evoChainData.chain.evolves_to.evolves_to !== []) {
        for(let j= 0;j <evoChainData.chain.evolves_to[0].evolves_to.length;j++) {
          console.log('third evolution pokemon')
          console.log([j])
          postPokeSprite(await getPokeInfo(evoChainData.chain.evolves_to[0].evolves_to[j].species.name))
        }
      }
      if(evoChainData.chain.evolves_to[1].evolves_to.length > 0 && evoChainData.chain.evolves_to.evolves_to !== []) {
        for(let j= 0;j <evoChainData.chain.evolves_to[1].evolves_to.length;j++) {
          console.log('third evolution pokemon')
          console.log([j])
          postPokeSprite(await getPokeInfo(evoChainData.chain.evolves_to[1].evolves_to[j].species.name))
        }
      }
    }

    // const basePokemon = evoChainData.chain.species.name;
    // postPokeSprite(await getPokeInfo(basePokemon));

    // const secondPokemon = evoChainData.chain.evolves_to[0].species.name;
    // const thirdPokemon = evoChainData.chain.evolves_to[0].evolves_to[0].species.name;

    // postPokeSprite(await getPokeInfo(secondPokemon));
    // postPokeSprite(await getPokeInfo(thirdPokemon));


  } catch (err) {
    console.log(`err ${err}`);
  }
}

/*for()
// this will generate these evolutions 
//I will have to plug them into a loop
//it will require a for of and an if statement
first evo = data.chain.species.name
second evo = data.chain.evolves_to[0].species.name
third evo = data.chain.evolves_to[0].evolves_to.species*/
