import { db } from "~/plugins/firebase.js";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

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
        console.log('clicked')
        const newMatchRef = doc(collection(db, "matches"));
        context.commit("setNewGame", match);

        try {
            await setDoc(newMatchRef, match);
            context.commit('toggleGameModal');
        } catch (e) {
            console.error(e);
        }
    },





    // async getMatches() {
    //     const matchesRef = getDocs(collection(db, "matches"));
    //     try {
    //         (await matchesRef).forEach((doc) => {
    //             const match = doc.data();
    //             match.id = doc.id;
    //             match.date = new Date(doc.data().match_date.seconds * 1000).toLocaleDateString();
    //             this.matches.push(match);
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },

}