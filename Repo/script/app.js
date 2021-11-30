function getRandom(json){
    var arrayPokemon = json["results"];

    console.log(arrayPokemon);

    var randomPokemon = arrayPokemon[Math.floor(Math.random()*arrayPokemon.length)];

    console.log(`Chosen Pokemon: ${randomPokemon["name"]}`);

    getDetails(randomPokemon["url"]);
}

const getDetails = async (url) => {
    const response = await get(url);

    console.log("Pokemon loaded: %O", response);
}

const get = (url) => fetch(url).then((r) => r.json());

const getAPI = async () => {
    // by default we only receive 20 pokemon in a request, but we know there are 1118 total results, luckily the API has a limit parameter built-in 
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=1200`;
    const response = await get(endpoint);

    console.log(`API loaded`);

    getRandom(response);
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOMContent loaded");

    getAPI();
})