// GLOBAL VARIABLES
const baseUrl = 'https://pokeapi.co/api/v2/';

fetch(baseUrl + 'pokemon?limit=151')
  .then((response) => response.json())
  .then((result) => displayCard(result.results))
  .catch((error) => console.log('error', error));

function displayCard(data) {
  $(data).each(function (index, pokemon) {
    const pokeId = index + 1;
    const newCard = $('<div>')
      .addClass('rounded-lg bg-white border border-gray-600 overflow-hidden')
      .data('key', index + 1);
    const cardTitle = $('<div>')
      .addClass(
        'bg-red-600 text-white uppercase p-2 border-b-4 border-black flex justify-between'
      )
      .appendTo(newCard);
    $('<h1>').text(pokemon.name).appendTo(cardTitle);
    $('<span>')
      .text('#' + pokeId.toString().padStart(3, 0))
      .appendTo(cardTitle);

    fetch(baseUrl + 'pokemon/' + pokeId)
      .then((response) => response.json())
      .then((result) => {
        $('<img>')
          .attr('src', result.sprites.front_default)
          .addClass('mx-auto')
          .appendTo(newCard);
      });

    // $.get(baseUrl + '/pokemon/' + pokeId)
    $('main').append(newCard);
  });
}
