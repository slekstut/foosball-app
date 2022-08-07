import { db } from "~/plugins/firebase.js";
import { doc, setDoc, getDocs, collection, Timestamp, deleteDoc } from "firebase/firestore";

export default {

    async addTeam(context, team) {
        const newTeamRef = doc(collection(db, "teams"));
        context.commit("setNewTeam", team);

        try {
            await setDoc(newTeamRef, team);
            console.log('Team added');
            context.commit('toggleModal');
            // this.newTeam.name = "";
            // this.newTeam.player1 = "";
            // this.newTeam.player2 = "";
            // this.newTeam.score = 0;
        } catch (e) {
            console.error(e);
        }
    },

}