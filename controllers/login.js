const express = require('express')
const https = require('https');
const db = require('../auth/db_config.js')
const user = require('../Database/user.js');
const chat = require('../Database/messages.js');
const games = require('../Database/gamesTable.js');
const rank = require('../Database/ranking.js');
const test = require('../scripts/db_test.js');
const bodyParser = require("body-parser")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('1032027183995-9ejqlmjsu33kjhhh1rdhcl085kklrlrc.apps.googleusercontent.com');

//create a router for url request
const router = express.Router()

//to parse Json on receiven or request
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/login', (request, response) => {
    var token = request.body.idtoken
    console.log("the id token is " + token)
        //    verify(id_token)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1032027183995-9ejqlmjsu33kjhhh1rdhcl085kklrlrc.apps.googleusercontent.com',
        })

        const payload = ticket.getPayload()
        const user_id = payload['sub']
        const email = payload['email']

        if (user.userExists(user_id)) {
            console.log("User exists")
            response.send(user_id)
        } else {
            console.log("User does not exists")
            user.createUser(user_id, email)
            response.send(user_id)
        }
    }
    verify().catch(console.error);
});

//sends a JSON with the availbale games to join.
//Empty JSON if there are no available games
router.get('/pending', (request, response) => {
    games.fetchAvailableGames(function(err, result) {
        if (err) {
            console.log("There was an error retrieving available games: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(JSON.stringify(result));
        }
    });
});

//sends a JSON with ongoing games.
//Empty JSON if there are no ongoing games
router.get('/active', (request, response) => {
    games.fetchOngoingGames(function(err, result) {
        if (err) {
            console.log("There was an error retrieving available games: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(JSON.stringify(result));
        }
    });
});

//accepts a request that has an username. Sends a JSON with all the user games.
router.get('/userGames', (request, response) => {
    console.log(request.query.username);
    games.fetchUserGames(request.query.username, function(err, result) {
        if (err) {
            console.log("Cannot retrieve user games: " + err);
            response.send(err);
        } else {
            console.log("Succesfully retrieved user games.");
            response.send(result);
        }
    });
});

router.post('/create', (request, response) => {
    games.createNewGame(request.body.user_id, function(err, result) {
        if (err) {
            console.log("Cannot create game: " + err);
            response.send("Cannot create new game");
        } else {
            console.log("New game created");
            response.send(result);
        }
    });
});

//player2 joins the game
router.put('/join', (request, response) => {
    games.joinGame(request.body.game_id, request.body.user_id, function(err, result) {
        if (err) {
            console.log("Cannot join: " + err);
            response.sendStatus(500);
        } else {
            console.log("Joined game")
            response.send(result);
        }
    });
});

router.get('/players', (request, response) => {
    console.log(request.query.game_id);
    games.getPlayers(request.query.game_id, function(err, result) {
        if (err) {
            console.log("There was an error retrieving available games: " + err);
            response.sendStatus(500);
        } else {
            const user = result.map((row) => {
                return { player_1: row.player_one_id, player_2: row.player_two_id }
            })
            response.send(user);
        }
    });
});

router.put('/top', (request, response) => {
    rank.getTopPlayers(function(err, result) {
        if (err) {
            console.log("Cannot get top players: " + err);
            response.sendStatus(500);
            return;
        } else {
            console.log("Success in getting top players");
            response.send(result);
        }
    });
});

router.get('/chatid', (request, response) => {
    const player_1 = request.body.player_1;
    const player_2 = request.body.player_2;
    const queryString = "SELECT game_id FROM games WHERE player_one_id = ? AND player_two_id = ?"
    db.query(queryString, [player_1, player_2], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err);
            response.sendStatus(500);
            return;
        }
        response.send(rows);
    })

});

router.post('/chatStore', (request, response) => {
    chat.storeMessage(request.body);
});

//sends a JSON with all the messages for a given chat_id
router.get('/chatHistory', (request, response) => {
    chat.getMessages(request.body.chat_id, function(err, result) {
        if (err) {
            console.log("Error getting messages: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(result);
        }
    });
});

//sends a JSON with all moves made in a game with the given game_id
router.get('/gameMoves', (request, response) => {
    games.getGameMoves(request.body.game_id, function(err, result) {
        if (err) {
            console.log("Failed to get moves: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(result);
        }
    });
});

//sends a JSON with the board state
router.get('/fen', (request, response) => {
    games.getFEN(request.query.game_id, function(err, result) {
        if (err) {
            console.log("Failed to get moves: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(result);
        }
    });
});

//get user_displayName by user_id.
router.get('/getUser', (request, response) => {
    console.log("user" + request.query.user_id);
    user.getUserName(request.query.user_id, function(err, result) {
        if (err) {
            console.log("Error retriving display_name: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(result);
        }
    });
});

//this route is used to indicate that a game is complete
router.put('/gameComplete', (request, response) => {
    games.gameComplete(request.body.game_id, request.body.user1, request.body.user2, request.body.won, function(err, result) {
        if (err) {
            console.log("Error completing game: " + err);
            response.sendStatus(500);
            return;
        } else {
            response.send(result);
        }
    });
});

module.exports = router;