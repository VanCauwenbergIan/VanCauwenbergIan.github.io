let root, index, pokemonName, category, headerTypes, mainImage, description, effectiveness, weakness, abilities, moves, typeButtons, evolutions, expand;
let barchartTitle, HPValue, HPPercentage, attackValue, attackPercentage, defenseValue, defensePercentage, sattackValue, sattackPercentage, sdefenseValue, sdefensePercentage, speedValue, speedPercentage;
let arrayPokemon;

function randomPokemon(json){
    arrayPokemon = json["results"];

    var randomPokemon = arrayPokemon[Math.floor(Math.random()*arrayPokemon.length)];

    console.log(`Chosen Pokemon: ${randomPokemon["name"]}`);

    getDetails(randomPokemon["url"]);
}

function refreshPokemon(array){
    var randomPokemon = array[Math.floor(Math.random()*arrayPokemon.length)];

    console.log(`Chosen Pokemon: ${randomPokemon["name"]}`);

    getDetails(randomPokemon["url"]);
}

function capitalizeFirstLetterString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function padIndex(index) {
    if (index < 10){
        return `#00${index}`;
    }
    else if (index < 100){
        return `#0${index}`;
    }
    else {
        return `#${index}`
    }
}

function sortDict(dict) {
    items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sortedDict={}
    items.forEach( function(v) {
        useKey = v[0];
        useValue = v[1];
        sortedDict[useKey] = useValue;
    })
    return(sortedDict);
} 

function colorsType(type) {
    let arrayColors = [];

    if (type == "grass"){
        arrayColors = ["#62B958","#82C37B","#9ACB95"];
    }
    else if (type == "fire"){
        arrayColors = ["#FD7E25","#F69754","#F0B083"];
    }
    else if (type == "water"){
        arrayColors = ["#4B91DA","#71A5DC","#96BADE"];
    }
    else if (type == "normal"){
        arrayColors = ["#878788","#9E9E9F","#AFAFB0"];
    }
    else if (type == "electric"){
        arrayColors = ["#E4B719","#E4C24B","#DED8AF"];
    }
    else if (type == "ice"){
        arrayColors = ["#5DB5AE","#7EC0BB","#97C9C5"];
    }
    else if (type == "fighting"){
        arrayColors = ["#D14164","#D56984","#DA91A3"];
    }
    else if (type == "poison"){
        arrayColors = ["#AA5CCF","#B87ED4","#C69FD9"];
    }
    else if (type == "ground"){
        arrayColors = ["#E0774A","#E19270","#E1AC96"];
    }
    else if (type == "flying"){
        arrayColors = ["#7490C9","#90A5CF","#ABB9D6"];
    }
    else if (type == "psychic"){
        arrayColors = ["#EB6366","#E98385","#E7A2A4"];
    }
    else if (type == "bug"){
        arrayColors = ["#8CB231","#A2BE5D","#B7CA89"];
    }
    else if (type == "rock"){
        arrayColors = ["#A7A190","#B6B1A5","#C5C2B9"];
    }
    else if (type == "ghost"){
        arrayColors = ["#576DAE","#7A8ABB","#9CA7C8"];
    }
    else if (type == "dragon"){
        arrayColors = ["#0F6AC0","#4488C9","#78A6D1"];
    }
    else if (type == "dark"){
        arrayColors = ["#5B5B5F","#7D7D80","#9E9EA0"];
    }
    else if (type == "steel"){
        arrayColors = ["#4B84A0","#719CB1","#96B3C1"];
    }
    else if (type == "fairy"){
        arrayColors = ["#EE6FC8","#EB8CCF","#E8A8D5"];
    }

    return arrayColors;
}

function checkForNull(p) {
    if (p == null){
        return "-";
    }
    else {
        return p;
    }
}

function showDetails(pokemon) {
    index.innerHTML = padIndex(pokemon.id);
    pokemonName.innerHTML = capitalizeFirstLetterString(pokemon.name);
    showCategory(pokemon);
    showTypes(pokemon);
    showMainImage(pokemon);
    showDescription(pokemon);
    showBaseStats(pokemon);
    showAbilities(pokemon);
    showMoves(pokemon);
    showEvolutions(pokemon);
}

const showEvolutions = async (pokemon) => {
    let evolutionChain = await getEvolutionChain(pokemon);
    let htmlString = '';
    let remaining = 0;

    let card = document.querySelector(".js-evolutions-card")
    card.innerHTML = `
    <div class="c-evolutionline__title">
        <h3 class="c-card__title">
            Evolution Line
        </h3>
    </div>
    <div class="c-evolutionline js-evolutions">
    </div>
    `
    evolutions = document.querySelector(".js-evolutions");

    if (evolutionChain.length > 1){
        for (let i = 0; i < evolutionChain.length; i++){
            remaining = evolutionChain.length - 1 - i;
            pokemon = evolutionChain[i];
            fulldataPokemon = await getPokemonFromUrl(pokemon.url);
    
            htmlString += `                                
                <div class="c-evolutionline--pokemon">
                    <div class="c-pokemon__container-image">
                        <img class="c-pokemon__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fulldataPokemon.id}.png" alt="official artwork of ${pokemon.name}">
                    </div>
                    <p class="c-pokemon__level u-mb-clear">
                        ${checkLevel(pokemon)}
                    </p>
                    <div class="c-pokemon__namegroup">
                        <p class="c-pokemon__namegroup--name u-mb-clear">
                            ${capitalizeFirstLetterString(pokemon.name)}
                        </p>
                        <p class="c-pokemon__namegroup--index u-mb-clear">
                            ${padIndex(fulldataPokemon.id)}
                        </p>
                    </div>
                    ${insertTypes(fulldataPokemon)}
                </div>`
            
            // if (remaining > 0){
            //     if (pokemon.multiple == true){
            //         htmlString += `
            //         <svg class="c-icon__next">
            //             <use xlink:href="#c-plus"/>
            //         </svg>
            //         `
            //     }
            //     else {
            //         htmlString += `
            //         <svg class="c-icon__next">
            //             <use xlink:href="#c-next"/>
            //         </svg>
            //         `
            //     }
            // }
        }

        evolutions.innerHTML = htmlString;
    }
    else {
        card.innerHTML = `
        <p>
        This Pokémon doesn't evolve!
        </p>
        `
    }

}

function checkLevel(pokemonEvolution) {
    if (pokemonEvolution.min_level != null){
        return `Level ${pokemonEvolution.min_level}`;
    }
    else if ((pokemonEvolution.trigger == "use-item" && pokemonEvolution.item != null) || (pokemonEvolution.trigger.name == "use-item" && pokemonEvolution.item != null)){
        return capitalizeFirstLetterString(`${pokemonEvolution.item}`)
    }
    else if (pokemonEvolution.trigger == "level-up" || pokemonEvolution.trigger.name == "level-up"){
        // there is no minimum level, but there is a certain requirement that will cause the pokémon to evolve at any level when satisfied
        return "Conditional";
    }
    else if (pokemonEvolution.trigger.length != undefined) {
        return capitalizeFirstLetterString(`${pokemonEvolution.trigger}`);
    }
    else {
        return capitalizeFirstLetterString(`${pokemonEvolution.trigger.name}`);
    }
}

function insertTypes(pokemon) {
    let htmlString = '<ul class="c-pokemon__types c-list-types o-list u-mb-clear">';
    
    for(type of pokemon.types){
        htmlString += `
        <li class="c-list-types__item--header">
            <button class="o-button-reset c-list-types__button c-list-types__button--header" style="background-color: ${colorsType(type.type.name)[0]}">
                <svg class="c-icon__type">
                    <use xlink:href="#c-${type.type.name}"/>
                </svg>
                    ${capitalizeFirstLetterString(type.type.name)}
            </button>
        </li>
        `
    }

    htmlString += `</ul>`;

    return htmlString;
}

const showMoves = async (pokemon) => {
    let arrayMoves = [];
    let arrayLevels = [];
    let htmlString = '';
    let counter = 0;

    for (m of pokemon.moves){
        v = m.version_group_details[m.version_group_details.length - 1]

        if (v.move_learn_method.name == "level-up"){
            arrayMoves.push(m.move.name);
            arrayLevels.push(v.level_learned_at);
        }
    }

    if (arrayMoves.length > 0){
        let keys = arrayLevels;
        let values = arrayMoves;
        let dictMoves = {}
        keys.forEach((key, i) => dictMoves[key] = values[i]);

        sortedDictMoves = sortDict(dictMoves);

        for (m of Object.values(sortedDictMoves)){
            let json = await getMove(Object.values(sortedDictMoves)[counter]);
            htmlString += `
            <tr>
            <td colspan="2">${Object.keys(sortedDictMoves)[counter]}</td>
            <td colspan="6">${capitalizeFirstLetterString(json.name)}</td>
            <td colspan="5">
                <button class="o-button-reset  c-list-types__button c-list-types__button--lg" style="background-color: ${colorsType(json.type.name)[0]}">
                    <svg class="c-icon__type">
                        <use xlink:href="#c-${json.type.name}"/>
                    </svg>
                    ${capitalizeFirstLetterString(json.type.name)}
                </button>
                <button class="o-button-reset  c-list-types__button c-list-types__button--sm" style="background-color: ${colorsType(json.type.name)[0]}">
                    <svg class="c-icon__type">
                        <use xlink:href="#c-${json.type.name}"/>
                    </svg>
                </button>
            </td>
            <td colspan="3">
                <svg class="c-icon__category">
                    <use xlink:href="#c-${json.damage_class.name}"/>
                </svg>
            </td>
            <td colspan="3">${checkForNull(json.power)}</td>
            <td colspan="3">${checkForNull(json.accuracy)}</td>
            </tr>
            `
            counter++;
        }
    }
    else {
        htmlString += `
        <tr>
            <td colspan="22">Sadly we don't have access to this data (unlike the other generations, there's no available ROMs for gen 8)</td>
        </tr>  
        `
    }

    expand.addEventListener("click", ExpandClicked);

    moves.innerHTML = htmlString;
}

const showBaseStats = async (pokemon) => {
    HPValue.innerHTML = pokemon.stats[0].base_stat;
    attackValue.innerHTML = pokemon.stats[1].base_stat;
    defenseValue.innerHTML = pokemon.stats[2].base_stat;
    sattackValue.innerHTML = pokemon.stats[3].base_stat;
    sdefenseValue.innerHTML = pokemon.stats[4].base_stat;
    speedValue.innerHTML = pokemon.stats[5].base_stat;

    // highest HP is 255, highest attack 190, highest defense 250, highest special attack 194, highest special defense 250, highest speed 200
    // so I took HP as a baseline so they all have the same scale
    // this is regarding base stats (which can be further increased with EV training and leveling up) as of generation VIII
    // and untill they add a new legendary that is even more overpowered than Eternatus #890
    HPPercentage.style.width = (HPValue.innerHTML / 255)*100 + '%';
    attackPercentage.style.width = (attackValue.innerHTML / 255)*100 + '%';
    defensePercentage.style.width = (defenseValue.innerHTML / 255)*100 + '%';
    sattackPercentage.style.width = (sattackValue.innerHTML / 255)*100 + '%';
    sdefensePercentage.style.width = (sdefenseValue.innerHTML / 255)*100 + '%';
    speedPercentage.style.width = (speedValue.innerHTML / 255)*100 + '%';

    const json = await getEvolutionChain(pokemon);
    
}

const showAbilities = async (pokemon) => {
    let htmlString = '';
    let arrayEntries = [];

    for(a of pokemon.abilities){
        const json = await getAbility(a.ability.name);

        for(let f of json.flavor_text_entries){
            if(f.language.name == "en"){
                arrayEntries.push(f.flavor_text)
            }
        }

        htmlString += `
        <h4 class="c-ability--title u-mb-clear">
        ${capitalizeFirstLetterString(json.name)}
        </h4>
        <p class="c-ability--description u-mb-clear">
        ${arrayEntries[arrayEntries.length - 1]}
        </p>
        `
    }

    abilities.innerHTML = htmlString;
}

const showDescription = async (pokemon) => {
    arrayFlavorEntries = [];
    let json = await getSpecies(pokemon);

    for(let f of json.flavor_text_entries){
        if(f.language.name == "en"){
            arrayFlavorEntries.push(f.flavor_text);
        }
    }

    // will get the pokedex entry for the most recent game (so sword & shield)
    description.innerHTML = arrayFlavorEntries[arrayFlavorEntries.length - 1];
}

function showMainImage(pokemon) {
    mainImage.innerHTML = `
    <img class="c-pokemondata__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="official artwork of ${pokemon.name}"/>
    `
}

const showTypes = async (pokemon) => {
    let htmlString = '';
    let counter = 0;

    // types header
    for(let t of pokemon.types){
        counter++;
        htmlString += `
        <li class="c-list-types__item--header">
        <button class="o-button-reset c-list-types__button c-list-types__button--header u-mb-clear" style="background-color: ${colorsType(t.type.name)[0]}">
            <svg class="c-icon__type">
                <use xlink:href="#c-${t.type.name}"/>
            </svg>
            ${capitalizeFirstLetterString(t.type.name)}
        </button>
        </li>
        `

        if (counter == 1){
            root.style.setProperty("--global-color-alpha-dark", colorsType(t.type.name)[0]);
            root.style.setProperty("--global-color-alpha", colorsType(t.type.name)[1]);
            root.style.setProperty("--global-color-alpha-light", colorsType(t.type.name)[2]);
        }
         
    }

    headerTypes.innerHTML = htmlString;

    // types effectiveness & weakness
    counter = 0;
    arrayEffectiveType1 = [];
    arrayWeakType1 = [];
    arrayEffectiveType2 = [];
    arrayWeakType2 = [];
    arrayEffectiveTotal = [];
    arrayWeakTotal = [];

    for(let t of pokemon.types){
        counter++;
        const json = await getType(t.type.name);

        for(let d of json.damage_relations.double_damage_from){
            if (counter == 1){
                arrayWeakType1.push(d.name);
            }
            else {
                arrayWeakType2.push(d.name);
            }
        }
        for(let d of json.damage_relations.half_damage_from){
            if (counter == 1){
                arrayEffectiveType1.push(d.name);
            }
            else {
                arrayEffectiveType2.push(d.name);
            }
        }
        for(let d of json.damage_relations.no_damage_from){
            if (counter == 1){
                arrayEffectiveType1.push(d.name);
            }
            else {
                arrayEffectiveType2.push(d.name);
            }
        }
    }

    if (counter > 1){
        for(let t of arrayEffectiveType1){
            if (arrayWeakType2.includes(t) == false && arrayEffectiveTotal.includes(t) == false){
                arrayEffectiveTotal.push(t);
            }
        }
        for(let t of arrayEffectiveType2){
            if (arrayWeakType1.includes(t) == false && arrayEffectiveTotal.includes(t) == false){
                arrayEffectiveTotal.push(t);
            }
        }
        for(let t of arrayWeakType1){
            if(arrayEffectiveType2.includes(t) == false && arrayWeakTotal.includes(t) == false){
                arrayWeakTotal.push(t);
            }
        }
        for(let t of arrayWeakType2){
            if(arrayEffectiveType1.includes(t) == false && arrayWeakTotal.includes(t) == false){
                arrayWeakTotal.push(t);
            }
        }
    }
    else {
        arrayWeakTotal = arrayWeakType1;
        arrayEffectiveTotal = arrayEffectiveType1;
    }

    htmlString = '';

    for(let t of arrayEffectiveTotal){
        const json = await getType(t);

        htmlString += `
        <li class="c-list-types__item">
        <button class="o-button-reset c-list-types__button js-list-types__button collapse" style="background-color: ${colorsType(t)[0]}">
            <svg class="c-icon__type">
                <use xlink:href="#c-${t}"/>
            </svg>
            ${capitalizeFirstLetterString(t)}
            <svg class="c-icon__expand">
                <use xlink:href="#c-expand"/>
            </svg>
        </button>
        `

        if (pokemon.types.length == 1){
            let attack = searchAttackValue(json, pokemon.types[0]);
            let defense = searchDefenseValue(json, pokemon.types[0]);

            htmlString += `
            <div class="c-list-types__item--info" style="background-color: ${colorsType(t)[1]}">
            <h4 class="c-info--header">
                ${capitalizeFirstLetterString(pokemon.types[0].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack}
                    </p>
                </div>
            </div>
            </li>
            `
        }
        else {
            let attack1 = searchAttackValue(json, pokemon.types[0]);
            let defense1 = searchDefenseValue(json, pokemon.types[0]);
            let attack2 = searchAttackValue(json, pokemon.types[1]);
            let defense2 = searchDefenseValue(json, pokemon.types[1]);

            htmlString += `        
            <div class="c-list-types__item--info" style="background-color: ${colorsType(t)[1]}">
            <h4 class="c-info--header">
                ${capitalizeFirstLetterString(pokemon.types[0].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense1}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack1}
                    </p>
                </div>
            </div>
            <h4 class="c-info--header">
            ${capitalizeFirstLetterString(pokemon.types[1].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense2}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack2}
                    </p>
                </div>
            </div>
            </div>
            </li>`
        }
    }

    effectiveness.innerHTML = htmlString;
    htmlString = '';

    for(let t of arrayWeakTotal){
        const json = await getType(t);

        htmlString += `
        <li class="c-list-types__item">
        <button class="o-button-reset c-list-types__button js-list-types__button collapse" style="background-color: ${colorsType(t)[0]}">
            <svg class="c-icon__type">
                <use xlink:href="#c-${t}"/>
            </svg>
            ${capitalizeFirstLetterString(t)}
            <svg class="c-icon__expand">
                <use xlink:href="#c-expand"/>
            </svg>
        </button>
        `

        if (pokemon.types.length == 1){
            let attack = searchAttackValue(json, pokemon.types[0]);
            let defense = searchDefenseValue(json, pokemon.types[0]);

            htmlString += `
            <div class="c-list-types__item--info" style="background-color: ${colorsType(t)[1]}">
            <h4 class="c-info--header">
                ${capitalizeFirstLetterString(pokemon.types[0].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack}
                    </p>
                </div>
            </div>
            </li>
            `
        }
        else {
            let attack1 = searchAttackValue(json, pokemon.types[0]);
            let defense1 = searchDefenseValue(json, pokemon.types[0]);
            let attack2 = searchAttackValue(json, pokemon.types[1]);
            let defense2 = searchDefenseValue(json, pokemon.types[1]);

            htmlString += `        
            <div class="c-list-types__item--info" style="background-color: ${colorsType(t)[1]}">
            <h4 class="c-info--header">
            ${capitalizeFirstLetterString(pokemon.types[0].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense1}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack1}
                    </p>
                </div>
            </div>
            <h4 class="c-info--header">
            ${capitalizeFirstLetterString(pokemon.types[1].type.name)} to ${capitalizeFirstLetterString(t)}:
            </h4>
            <div class="c-info--modifiers">
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-shield"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${defense2}
                    </p>
                </div>
                <div class="c-info--modifiers__defense">
                    <svg class="c-icon__info">
                        <use xlink:href="#c-sword"/>
                    </svg>
                    <p class="c-icon__info--text u-mb-clear">
                        ${attack2}
                    </p>
                </div>
            </div>
            </div>
            </li>`
        }
    }

    weakness.innerHTML = htmlString;

    typeButtons = document.querySelectorAll(".js-list-types__button");
    for (i = 0; i < typeButtons.length; i++) {
        typeButtons[i].addEventListener("click", ExpandClicked);
    }
}

function searchAttackValue(json, counterType) {
    attack = "x1";

    for(let d of json.damage_relations.double_damage_from){
        if (d.name == counterType.type.name){
            attack = "x2"; 
            break;
        }
    }
    for(let d of json.damage_relations.half_damage_from){
        if (d.name == counterType.type.name){
            attack = "x1/2"; 
            break;
        }
    }
    for(let d of json.damage_relations.no_damage_from){
        if (d.name == counterType.type.name){
            attack = "x0"; 
            break;
        }
    }

    return attack;
}

function searchDefenseValue(json, counterType) {
    defense = "x1";

    for(let d of json.damage_relations.double_damage_to){
        if (d.name == counterType.type.name){
            defense = "x2"; 
            break;
        }
    }
    for(let d of json.damage_relations.half_damage_to){
        if (d.name == counterType.type.name){
            defense = "x1/2"; 
            break;
        }
    }
    for(let d of json.damage_relations.no_damage_to){
        if (d.name == counterType.type.name){
            defense = "x0";
            break;
        }
    }

    return defense;
}

function ExpandClicked() {
    if (this.classList.contains("collapse")){
        this.classList.remove("collapse");
    }
    else {
        this.classList.add("collapse");
    }
}

const showCategory = async (pokemon) => {
    const json = await getSpecies(pokemon);

    for(let g of json.genera){
        if (g.language.name == "en"){
            category.innerHTML = `The ${g.genus}`;
        }
    }
}

const getMove = async (move) => {
    const endpoint = `https://pokeapi.co/api/v2/move/${move}`
    const response = await get(endpoint);

    console.log("get Move: %O", response)

    return response;
}

const getAbility = async (ability) => {
    const endpoint = `https://pokeapi.co/api/v2/ability/${ability}`;
    const response = await get(endpoint);

    console.log("get Ability: %O", response);

    return response;
}

const getEvolutionChain = async (pokemon) => {
    const json = await getSpecies(pokemon);
    const endpoint = json.evolution_chain.url;
    const response = await get(endpoint);

    console.log("get Evolutions: %O", response);

    let evolutionChain = [];
    let evolutionData = response.chain;

    // an evoltion chain in the api is nested in a sort of family tree way, each evolution is nested in the pokemon that comes before it. Sometimes a pokemon's tree can branch into multiple evolutions at the same time (like Eevee #133)
    while (evolutionData != undefined && evolutionData.hasOwnProperty("evolves_to")){
        let evolutionCount = evolutionData.evolves_to.length;

        if (evolutionData.evolution_details.length > 0){
            if (evolutionData.evolution_details[0].item != null){
                evolutionChain.push({
                    "name": evolutionData.species.name,
                    "min_level": evolutionData.evolution_details[0].min_level,
                    "trigger": evolutionData.evolution_details[0].trigger.name,
                    "item": evolutionData.evolution_details[0].item.name,
                    "multiple": false,
                    "url": evolutionData.species.url
                })
            }
            else {
                evolutionChain.push({
                    "name": evolutionData.species.name,
                    "min_level": evolutionData.evolution_details[0].min_level,
                    "trigger": evolutionData.evolution_details[0].trigger.name,
                    "item": evolutionData.evolution_details[0].item,
                    "multiple": false,
                    "url": evolutionData.species.url
                })
            }
        }
        else {
            evolutionChain.push({
                "name": evolutionData.species.name,
                "min_level": 1,
                "trigger": null,
                "item": null,
                "multiple": false,
                "url": evolutionData.species.url
            })
        }

        if (evolutionCount > 1){
            for (let i = 1; i < evolutionCount; i++){
                if (evolutionData.evolves_to[i].evolution_details[0].item != null){
                    evolutionChain.push({
                        "name": evolutionData.evolves_to[i].species.name,
                        "min_level": evolutionData.evolves_to[i].evolution_details[0].min_level,
                        "trigger": evolutionData.evolves_to[i].evolution_details[0].trigger.name,
                        "item": evolutionData.evolves_to[i].evolution_details[0].item.name,
                        "multiple": true,
                        "url": evolutionData.evolves_to[i].species.url
                    })
                }
                else {
                    evolutionChain.push({
                        "name": evolutionData.evolves_to[i].species.name,
                        "min_level": evolutionData.evolves_to[i].evolution_details[0].min_level,
                        "trigger": evolutionData.evolves_to[i].evolution_details[0].trigger,
                        "item": evolutionData.evolves_to[i].evolution_details[0].item,
                        "multiple": true,
                        "url": evolutionData.evolves_to[i].species.url
                    })
                }
            }
        }

        evolutionData = evolutionData.evolves_to[0]
    }

    console.log("Reshaped evolutionChain: %O", evolutionChain);

    return evolutionChain;
}

const getType = async(type) => {
    const endpoint = `https://pokeapi.co/api/v2/type/${type}`;
    const response = await get(endpoint);

    console.log("get type: %O", response);

    return response;
}

const getSpecies = async(pokemon) => {
    const endpoint = pokemon.species.url;
    const response = await get(endpoint);

    console.log("get Species: %O", response);

    return response;
}

const getDetails = async (url) => {
    const response = await get(url);

    console.log("Pokemon loaded: %O", response);
    showDetails(response);
}

const getPokemonFromUrl = async(url) => {
    const response = await get(url);
    const result = await get(`https://pokeapi.co/api/v2/pokemon/${response.id}`);

    return result;
}

const get = (url) => fetch(url).then((r) => r.json());

const getAPI = async () => {
    // by default we only receive 20 pokemon in a request, but we know there are 1118 total results (of which 899 are actual pokemon, with the others being variants), luckily the API has a limit parameter built-in 
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=898`;
    const response = await get(endpoint);

    console.log(`API loaded`);

    randomPokemon(response);
}

function refreshPage() {
    // get a new pokemon without making a new api call
    refreshPokemon(arrayPokemon);
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOMContent loaded");

    root = document.documentElement;
    index = document.querySelector(".js-header-index");
    pokemonName = document.querySelector(".js-header-name");
    category = document.querySelector(".js-header-category");
    headerTypes = document.querySelector(".js-header-types");
    mainImage = document.querySelector(".js-main-image");
    description = document.querySelector(".js-description");
    effectiveness = document.querySelector(".js-effectiveness");
    weakness = document.querySelector(".js-weakness");
    abilities = document.querySelector(".js-abilities");
    moves = document.querySelector(".js-table-moves");
    expand = document.querySelector(".js-expand-moves");
    buttonNewPokemon = document.querySelector(".js-newpokemon")

    buttonNewPokemon.addEventListener("click", refreshPage)

    barchartTitle = document.querySelector(".js-barchart-title");
    HPValue = document.querySelector(".js-barchart-value-hp");
    HPPercentage = document.querySelector(".js-barchart-percentage-hp");
    attackValue = document.querySelector(".js-barchart-value-attack");
    attackPercentage = document.querySelector(".js-barchart-percentage-attack");
    defenseValue = document.querySelector(".js-barchart-value-defense");
    defensePercentage = document.querySelector(".js-barchart-percentage-defense");
    sattackValue = document.querySelector(".js-barchart-value-sattack");
    sattackPercentage = document.querySelector(".js-barchart-percentage-sattack");
    sdefenseValue = document.querySelector(".js-barchart-value-sdefense");
    sdefensePercentage = document.querySelector(".js-barchart-percentage-sdefense");
    speedValue = document.querySelector(".js-barchart-value-speed");
    speedPercentage = document.querySelector(".js-barchart-percentage-speed");

    getAPI();
})