<template>
    <div>
        <section class="container">
            <Nav></Nav>
            <h1>Teams page</h1>
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" @click="toggleModal">Add Team</button>
                </div>
                <div class="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Team Name</th>
                                <th scope="col">Team City</th>
                                <th scope="col">Team State</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(team, index) in teams" :key="team.id">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ team.name }}</td>
                                <td>{{ team.city }}</td>
                                <td>{{ team.state }}</td>
                                <td>
                                    <button class="btn btn-primary" @click="editTeam(team.id)">Edit</button>
                                    <button class="btn btn-danger" @click="deleteTeam(team.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teams: [],
        };
    },
    methods: {
        async fetchTeams() {
            const teamsRef = getDocs(collection(db, "teams"));
            try {
                (await teamsRef).forEach((doc) => {
                    const team = doc.data();
                    team.id = doc.id;
                    this.teams.push(team);
                });
            } catch (e) {
                console.error(e);
            }
        },
        async deleteTeam(id) {
            try {
                await deleteDoc(doc(db, "teams", id));

                this.teams = this.teams.filter(team => team.id !== id);
            } catch (e) {
                console.error(e);
            }
        },
        // implement edit method 
        async editTeam(id) {
            console.log("edit team");
            //modal to edit
             this.$store.commit('toggleModal');
             // preset modal input values existing team values
                this.$store.commit('setModalInputs', this.teams.find(team => team.id === id));

            const cityRef = doc(db, 'teams', id);
            setDoc(cityRef, { capital: true }, { merge: true });
}
    }
}
</script>