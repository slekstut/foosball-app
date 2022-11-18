<template>
    <div class="sidebar">
        <TrendingPlayer />
        <!-- teams -->
        <div class="content" id="teams">
            <div class="content__title">
                <h3>Teams</h3>
                <div class="content__button">
                    <NuxtLink to="/teams">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.70833 6.5H10.2917" stroke="#A0A8B1" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6.5 2.70833L10.2917 6.5L6.5 10.2917" stroke="#A0A8B1" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
            <div class="content__body">

                <div class="item" v-for="team in teams.slice(0, 5)" :key="team.id">
                    <div class="left__block">
                        <a href="#">
                            <img class="item__img" :src="team.teamLogoUrl" :alt="team.teamName" loading="lazy">
                            <span class="item__title">{{ team.teamName }}</span>
                        </a>
                    </div>
                    <div class="right__block teams__action">
                        <div class="more-details show-hover">
                            <a href="#">
                                <span>See Profile</span>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.70833 6.5H10.2917" stroke="#A0A8B1" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M6.5 2.70833L10.2917 6.5L6.5 10.2917" stroke="#A0A8B1"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        </div>
                        <a class="statistics-icon" href="#">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 16.6667V8.33334" stroke="#FFA600" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M10 16.6667V3.33334" stroke="#FFA600" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M5 16.6667V11.6667" stroke="#FFA600" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <BestPlayers />
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import TrendingPlayer from "./TrendingPlayer.vue";


export default {
    data() {
        return {
            teams: [],
            loading: true,
        };
    },
    created() {
        this.fetchTeams();
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
            }
            catch (e) {
                console.error(e);
            }
        },
    },
    mounted() {
    },
    components: { TrendingPlayer }
}
</script>

<style lang="scss">
.sidebar {
    padding: 32px;
    width: 100%;
    max-width: 320px;
    border: 1px solid $primary-300;
    border-radius: 5px;
    background-color: $secondary-500;

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 48px;

        &__title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            color: $primary-800;
        }

        &__body {
            width: 100%;

            .item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;

                .left__block {
                    flex: 1 70%;
                    justify-content: flex-start;

                    a {
                        display: flex;
                        align-items: center;
                        margin-right: 12px;

                        img {
                            max-width: 45px;
                        }
                    }
                }

                .right__block {
                    flex: 1 30%;

                    justify-content: flex-end;

                }

                .middle__block {
                    margin: 0 16px;
                }

                &__img {
                    margin-right: 8px;
                    max-width: 64px;
                }

                &__title {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                }
            }
        }

        &#teams {
            .teams__action {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                gap: 16px;

                span {
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 15px;
                    color: $compliment-500;
                }

                svg path {
                    stroke: $compliment-500;
                }

                .more-details {
                    display: none;

                    a {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        flex-wrap: nowrap;
                        gap: 8px;


                    }
                }

                &:hover {
                    .more-details {
                        display: flex;

                    }

                    .statistics-icon {
                        display: none;
                    }
                }
            }
        }
    }

}

#top-players {
    .content__body {
        .item {
            .right__block {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }

            .left__block {
                img {
                    max-width: 48px;
                }
            }

            &__title {
                display: flex;
                flex-wrap: nowrap;
            }
        }
    }
}
</style>