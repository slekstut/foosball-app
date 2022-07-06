import { db } from "~/plugins/firebase.js";
import { doc, setDoc, getDocs, collection, Timestamp } from "firebase/firestore";

export default {

    async addTeam(context) {
        const newTeamRef = doc(collection(db, "teams"));
        context.commit("setNewTeam", newTeam);

        try {
            await setDoc(newTeamRef, newTeam);
            context.commit('toggleModal');
            this.newTeam.name = "";
            this.newTeam.player1 = "";
            this.newTeam.player2 = "";
            this.newTeam.score = 0;
        } catch (e) {
            console.error(e);
        }
    },
}