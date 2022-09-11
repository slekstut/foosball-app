import { db } from "~/plugins/firebase.js";
import { doc, setDoc, collection, getDocs, writeBatch } from "firebase/firestore";
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
    // addMatch implementation
    async addMatch(context, match) {
        const newMatchRef = doc(collection(db, "matches"));
        context.commit("setNewMatch", match);

        try {
            await setDoc(newMatchRef, match);
            context.commit('toggleGameModal');
            toastr.success('Match successfully added');

        } catch (e) {
            console.error(e);
        }
    },
    // getMatces implementation
    async getMatches(context) {
        const matchesRef = collection(db, "matches");
        const matchesSnapshot = await getDocs(matchesRef);
        const matches = matchesSnapshot.docs.map(doc => doc.data());
       
        //add match date
        matches.forEach(match => {
            console.log(match.match_date)
            match.match_date = moment(new Date(match.match_date.seconds * 1000)).format('MMMM Do YYYY, h:mm:ss a');
        });
        context.commit("setMatches", matches);
    }
}