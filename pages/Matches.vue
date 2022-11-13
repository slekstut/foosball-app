<template>
    <div>
        <section class="container">
            <Nav></Nav>
            <h1>Matches page</h1>
            <!-- create table for matches -->
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Match ID</th>
                        <th scope="col">Team 1</th>
                        <th scope="col">Team 2</th>
                        <th scope="col">Winner</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="match in matches" :key="match.id">
                        <th scope="row">{{ match.id }}</th>
                        <td>{{ match.team1.name }}</td>
                        <td>{{ match.team2.name }}</td>
                        <td>{{ match.winner }}</td>
                        <td>{{ match.match_date }}</td>
                        <td>
                            <button class="btn btn-primary" @click="editMatch(match.id)">Edit</button>
                            <button class="btn btn-danger" @click="deleteMatch(match.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import moment from 'moment'

export default {
    name: "Matches",
    data() {
        return {
            matches: [],
        };
    },
    methods: {
        async fetchMatches() {
            const matchesRef = getDocs(collection(db, "matches"));
            try {
                (await matchesRef).forEach((doc) => {
                    const match = doc.data();
                    match.id = doc.id;
                    this.matches.push(match);
                    match.match_date = moment(new Date(match.match_date.seconds * 1000)).format('YYYY-MM-DD');
                });
               
            } catch (e) {
                console.error(e);
            }
        },
        async deleteMatch(id) {
            try {
                await deleteDoc(doc(db, "matches", id));

                this.matches = this.matches.filter(match => match.id !== id);
            } catch (e) {
                console.error(e);
            }
        },
        editMatch(id) {
            this.$router.push(`/matches/${id}`);
        },
    },
    async mounted() {
        await this.fetchMatches();
        console.log("matches", this.matches);
    },
};

</script>

<style scoped lang="scss">
// set table styles
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid $primary-450;
    thead {
        tr {
            th {
                vertical-align: bottom;
                border-bottom: 2px solid $primary-450;
            }
        }
    }
    tbody {
        tr {
            td {
                vertical-align: top;
                border-top: 1px solid $primary-450;
            }
        }
    }
    th,
    td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid $primary-450;
    }
    thead {
        th {
            vertical-align: bottom;
            border-bottom: 2px solid $primary-450;
        }
    }
    tbody + tbody {
        border-top: 2px solid $primary-450;
    }
    .table {
        background-color: $secondary-500;
    }
}
</style>