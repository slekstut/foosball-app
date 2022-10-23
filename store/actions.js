import { db } from "~/plugins/firebase.js";
import { doc, setDoc, collection, getDocs, writeBatch, updateDoc } from "firebase/firestore";
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
            await setDoc(newPlayersRef, newPlayer);
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
    // update db teams collection with sum of match scores
    // async updateTeamPlayersScore(context, { teamName, player, score }) {
    //     // const teamRef = doc(db, "teams", team.id);

    //     // why team is not defined? 



        


    //     context.commit("updateTeamPlayersScore", { teamName, player, score });
    //     try {
    //         await updateDoc(teamRef, {
    //             [player]: {
    //                 name: teamName[player].name,
    //                 score: teamName[player].score
    //             }
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },


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
            return  a > b ? -1 : a < b ? 1 : 0;
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