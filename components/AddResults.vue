<template>
    <Modal v-if="showGameModal">
        <template #header>
            <h2>
                Add A Game Results
            </h2>
        </template>

        <template #body>
            <form>
                <div class="form__block">
                    <label for="choose-team1">Select Team</label>
                    <select v-model="selectedTeam1" name="choose-team1" id="game-results">
                        <option value="" disavled>Choose A Team 1</option>
                        <option v-for="selectableTeam in selectableTeams" :key="selectableTeam.id"
                            :value="selectableTeam">
                            {{ selectableTeam.name }}
                        </option>
                    </select>
                    <div class="selected-team">
                        <div>
                            {{ selectedTeam1.player1 }}
                        </div>
                        <div>
                            {{ selectedTeam1.player2 }}
                        </div>
                    </div>
                </div>
                <div class="form__block">
                    <label for="choose-team2">Select Team</label>
                    <select v-model="selectedTeam2" :disabled="!selectedTeam1" name="choose-team2" id="game-results">
                        <option value="" disavled>Choose A Team 2</option>
                        <option v-for="selectableTeam in selectableTeams.filter(team => team.id !== selectedTeam1.id)"
                            :key="selectableTeam.id" :value="selectableTeam">
                            {{ selectableTeam.name }}
                        </option>
                    </select>
                    <div class="selected-team">
                        <div>
                            {{ selectedTeam2.player1 }}
                        </div>
                        <div>
                            {{ selectedTeam2.player2 }}
                        </div>
                    </div>
                </div>
                <Button class="submit-team">Submit</Button>
            </form>
        </template>
    </Modal>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            selectableTeams: [],
            selectableTeam: 'Choose team',
            selectedTeam1: '',
            selectedTeam2: '',
        }
    },
    methods: {
        async fetch() {
            const querySnapshot = await getDocs(collection(db, "teams"));
            querySnapshot.forEach((doc) => {
                const selectableTeam = doc.data();
                const selectableTeamId = doc.id;
                const selectableTeamWithId = {
                    ...selectableTeam,
                    id: selectableTeamId,
                }
                this.selectableTeams.push(selectableTeamWithId);
            });
        },
         toggleGameModal() {
            this.$store.commit('toggleGameModal');
        },
    },
     computed: {
        showGameModal() {
            return this.$store.state.showGameModal;
        }
    },
}
</script>

