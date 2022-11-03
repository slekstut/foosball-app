import { db } from "~/plugins/firebase.js";
import { doc, docs, setDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import toastr from "toastr";
import moment from 'moment'

export default {

    async addTeam(context, team) {
        const newTeamRef = doc(collection(db, "teams"));
        context.commit("setNewTeam", team);

        try {
            await setDoc(newTeamRef, team);
            context.commit('toggleModal');
        } catch (e) {
            console.error(e);
        }
    },
    // add players to db collection
    async addPlayers(context, newPlayer) {
        const newPlayersRef = doc(collection(db, "players"));
        context.commit('setNewPlayers', newPlayer);

        try {
            await setDoc(newPlayersRef, { newPlayer, createdAt: new Date() });
        } catch (error) {
            console.log('error', error)
        }
    },
    // addMatch implementation
    async addMatch(context, match) {
        const newMatchRef = doc(collection(db, "matches"));
        // get teams from db
        context.commit("setNewMatch", match);
        try {
            await setDoc(newMatchRef, match);
            context.commit('toggleGameModal');
            toastr.success('Match successfully added');

        } catch (e) {
            console.error(e);
        }
    },
    // update player after match
    async updatePlayer(context, playerData) {
        try {
            const playersRef = collection(db, "players");
            const playersSnapshot = await getDocs(playersRef);
            const playerDocId = playersSnapshot.docs.find(doc => doc.data().newPlayer.playerId === playerData.id).id;
            const playerRef = doc(db, "players", playerDocId);

            // get player score from db
            const playerScore = await getDocs(query(playersRef, where("newPlayer.playerId", "==", playerData.id)));
            const playerScoreData = playerScore.docs.map(doc => doc.data().newPlayer.playerScore);

            await updateDoc(playerRef, {
                'newPlayer.playerScore': parseInt(playerScoreData) + parseInt(playerData.goals)
            });

        } catch (error) {
            console.log('error', error)
        }

    },
    // update team after match
    async updateTeam(context, teamData) {
        try {
            const teamsRef = collection(db, "teams");
            const teamsSnapshot = await getDocs(teamsRef);
            const team1Id = teamData.team1.id;
            const team2Id = teamData.team2.id;

            // find matching team ids
            const team1DocId = teamsSnapshot.docs.find(doc => doc.data().teamId === team1Id).id;
            const team2DocId = teamsSnapshot.docs.find(doc => doc.data().teamId === team2Id).id;

            // find team1Id in team1DocId and update player score
            const team1Ref = doc(db, "teams", team1DocId);
            const team2Ref = doc(db, "teams", team2DocId);

            // add teamData.team1.player1.score and teamData.team1.player2.score to team1DocId
            const team1Score = await getDocs(query(teamsRef, where("teamId", "==", team1Id)));
            const team1ScoreData = team1Score.docs.find(doc => doc.data().teamId === team1Id).data();
            // select team1ScoreData player1.score and player2.score
            const team1Player1Score = team1ScoreData.player1.score;
            const team1Player2Score = team1ScoreData.player2.score;

            // add teamData.team2.player1.score and teamData.team2.player2.score to team2DocId
            const team2Score = await getDocs(query(teamsRef, where("teamId", "==", team2Id)));
            const team2ScoreData = team2Score.docs.find(doc => doc.data().teamId === team2Id).data();
            // select team2ScoreData player1.score and player2.score
            const team2Player1Score = team2ScoreData.player1.score;
            const team2Player2Score = team2ScoreData.player2.score;

            // update team1 score
            await updateDoc(team1Ref, {
                'player1.score': parseInt(team1Player1Score) + parseInt(teamData.team1.player1.score),
                'player2.score': parseInt(team1Player2Score) + parseInt(teamData.team1.player2.score)
            });

            // update team2 score
            await updateDoc(team2Ref, {
                'player1.score': parseInt(team2Player1Score) + parseInt(teamData.team2.player1.score),
                'player2.score': parseInt(team2Player2Score) + parseInt(teamData.team2.player2.score)
            });

        } catch (error) {
            console.log('error', error)
        }
    },
    // getMatces implementation
    async getMatches(context) {
        const matchesRef = collection(db, "matches");
        const matchesSnapshot = await getDocs(matchesRef);
        const matches = matchesSnapshot.docs.map(doc => doc.data());

        //add match date
        matches.forEach(match => {
            match.match_date = moment(new Date(match.match_date.seconds * 1000)).format('YYYY-MM-DD');
        });

        matches.sort(function (a, b) {
            a = a.match_date.split('-').join('');
            b = b.match_date.split('-').join('');
            return a > b ? -1 : a < b ? 1 : 0;
        })

        context.commit("setMatches", matches);
        // console.log('matches : ', matches);
    },
    // get trending player name and score from teams db collection
    async getTrendingPlayer(context) {
        const teamsRef = collection(db, "teams");
        const teamsSnapshot = await getDocs(teamsRef);
        const teams = teamsSnapshot.docs.map(doc => doc.data());

        // console.log('teams from trending player: ', teams);

        // loop through teams and get the player with the highest score
        let trendingPlayer = {
            name: '',
            score: 0
        };

        teams.forEach(team => {
            for (const [key, value] of Object.entries(team)) {
                // console.log(`key: ${key}: value: ${value}`);
                if (key === 'playerScore1' || key === 'playerScore2') {
                    console.log('value: ', value);
                    console.log('key: ', key);
                    if (value.score > trendingPlayer.score) {
                        trendingPlayer.name = value.name;
                        trendingPlayer.score = value.score;
                    }
                }
            }



            // console.log('trending player: ', trendingPlayer);
        });

        // console.log('trendingPlayer', trendingPlayer)

        context.commit("getTrendingPlayer", trendingPlayer);


    }

}