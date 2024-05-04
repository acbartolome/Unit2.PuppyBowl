const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe('fetchSinglePlayer', () => {
  let player;
  beforeAll(async () => {
    player = await fetchSinglePlayer(4509);
  });

  test('returns a player ID', async () => {
    expect(player.id).toEqual(4509);
  })
})
// TODO: Tests for `addNewPlayer`
describe('addNewPlayer', () => {

  test('Test if you get a success when adding player', async () => {
    const newPlayer = await addNewPlayer({
      name: 'Dog',
      breed: 'Corgi',
      status: 'bench',
      imageUrl: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/2560x3839/australian-shepherd.jpg?resize=980:*'
    })
    expect(newPlayer.success).toBe(true)
  })
})

// (Optional) TODO: Tests for `removePlayer`
// test is a one time since it deletes the player
describe('removePlayer', () => {
  test('Check if player is removed successfully', async () => {
    const deletePlayer = await removePlayer(4496);
    expect(deletePlayer.success).toBe(true)
  })
})
