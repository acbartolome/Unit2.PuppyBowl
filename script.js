// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2402-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

// creating an object array to hold the puppies
const state = {
  playerList: [],
};

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
// adryan
const fetchAllPlayers = async () => {
  try {
    // create response to fetch the API
    const response = await fetch(API_URL);
    const data = await response.json();
    state.playerList = data.data.players;
    return state.playerList;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const playerURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`;
    const response = await fetch(playerURL);
    const data = await response.json();
    return data.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  const { name, breed, imageUrl, status } = playerObj;
  try {
    // TODO
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, breed, status, imageUrl }),
    });
    const data = await response.json();
    return data;
    location.reload();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(API_URL + `/${playerId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  // create a for loop to loop through the object arrays
  // for (let i = 0; i < state.playerList.length; i++) {
  //   // creating object to represent the index of i
  //   const currentPlayer = state.playerList[i];
  //   // creating a new div
  //   const newDiv = document.createElement("div");
  //   // adding a class name to the div so we can style with CSS
  //   newDiv.classList.add("playerListCard");
  //   // adding the info the div with image, name and player ID
  //   newDiv.innerHTML = `
  //   <img src=${currentPlayer.imageUrl} alt=${currentPlayer.name}>
  //   <h1>${currentPlayer.name}</h1>
  //   <p>${currentPlayer.id}</p>
  //   <button class="playerDetails">See details</button>
  //   <button class="deletePlayer">Remove from roster</button>
  //   `;
  //   playersList.appendChild(newDiv);
  //   // add event listener for buttons to see player details and delete player
  //   // see details event listener

  //   // delete player event listener
  //   const deleteButton = document.querySelector(".deletePlayer");
  //   deleteButton.addEventListener('click', () => removePlayer(currentPlayer.id));
  // }
  const main = document.querySelector("main");
  for (let i = 0; i < state.playerList.length; i++) {
    const currentPlayer = state.playerList[i];
    const newDiv = document.createElement("div");
    newDiv.classList.add("playerListCard");

    const playerImg = document.createElement("img");
    playerImg.src = currentPlayer.imageUrl;
    playerImg.alt = `Image of ${currentPlayer.name}`;

    const playerName = document.createElement("h1");
    playerName.innerHTML = currentPlayer.name;
    //  playerName.classList.add() possibly add class

    const playerId = document.createElement("p");
    playerId.innerHTML = `ID: ${currentPlayer.id}`;
    // playerId.classList.add()

    const detailsButton = document.createElement("button");
    detailsButton.classList.add("playerDetails");
    detailsButton.textContent = "See details";
    detailsButton.addEventListener("click", () => renderSinglePlayer(currentPlayer));

    const removeButton = document.createElement("button");
    removeButton.classList.add("deletePlayer");
    removeButton.textContent = "Remove from roster";

    removeButton.addEventListener("click", () => {
      removePlayer(currentPlayer.id);
      alert(`You have removed ${currentPlayer.name}`);
      location.reload();
    });

    newDiv.appendChild(playerImg);
    newDiv.appendChild(playerName);
    newDiv.appendChild(playerId);
    newDiv.appendChild(detailsButton);
    newDiv.appendChild(removeButton);
    main.appendChild(newDiv);
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  const main = document.querySelector("main");
  main.innerHTML = "";

  const newDiv = document.createElement("div");
  newDiv.classList.add("playerListCard");

  const playerImg = document.createElement("img");
  playerImg.src = player.imageUrl;
  playerImg.alt = `Image of ${player.name}`;

  const playerName = document.createElement("h1");
  playerName.innerHTML = player.name;
  //  playerName.classList.add() possibly add class

  const playerId = document.createElement("p");
  playerId.innerHTML = `ID: ${player.id}`;

  const playerBreed = document.createElement("p");
  playerBreed.innerHTML = `Breed: ${player.breed}`;

  const playerTeam = document.createElement("p");
  playerTeam.innerHTML = `Team: ${player.teamId || 'Unassigned'}`;

  const backToMain = document.createElement("button");
  backToMain.classList.add('returnToMain');
  backToMain.textContent = 'Return to main'
  backToMain.addEventListener('click', () => {
    location.reload();
  })

  newDiv.appendChild(playerImg);
  newDiv.appendChild(playerName);
  newDiv.appendChild(playerId);
  newDiv.appendChild(playerBreed);
  newDiv.appendChild(playerTeam);
  newDiv.appendChild(backToMain)
  main.appendChild(newDiv);
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    const form = document.querySelector("#new-player-form");
    const inputName = document.createElement("input");
    const inputBreed = document.createElement("input");
    const inputStatus = document.createElement("input");
    const inputImageUrl = document.createElement("input");
    const inputSubmit = document.createElement("button");

    inputName.attributes.name = "name";
    inputBreed.attributes.name = "breed";
    inputStatus.attributes.name = "status";
    inputImageUrl.attributes.name = "imageUrl";
    inputSubmit.attributes.id = "submit";

    inputName.type = 'text';
    inputBreed.type = 'text';
    inputStatus.type = 'text';
    inputImageUrl.type = 'text';
    inputSubmit.type = 'submit';

    const inputNameLabel = document.createElement("label");
    const inputBreedLabel = document.createElement("label");
    const inputStatusLabel = document.createElement("label");
    const inputImageUrlLabel = document.createElement("label");

    inputNameLabel.textContent = "Name";
    inputBreedLabel.textContent = "Breed";
    inputStatusLabel.textContent = "Status";
    inputImageUrlLabel.textContent = "ImageUrl";
    inputSubmit.innerHTML = "Submit";


    const arrayInput = [
      inputNameLabel,
      inputName,
      inputBreedLabel,
      inputBreed,
      inputStatusLabel,
      inputStatus,
      inputImageUrlLabel,
      inputImageUrl,
      inputSubmit,
    ];

    for (const array of arrayInput) {
      form.appendChild(array);
    }

    inputSubmit.addEventListener("click", (event) => {
      event.preventDefault();

      const name = inputName.value;
      const breed = inputBreed.value;
      const status = inputStatus.value;
      const imageUrl = inputImageUrl.value;

      addNewPlayer({ name, breed, status, imageUrl });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
