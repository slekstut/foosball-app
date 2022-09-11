<template>
    <div class="content">
        <div class="content__wrapper">
            <div class="content__header">
                <h5>Latest Matches</h5>
                <a href="#" @click="showLessMatches">
                    <span v-if="showLess">
                        View More
                    </span>
                    <span v-else>
                        View Less
                    </span>
                </a>
            </div>
            <div class="content__body" ref="scrollToMatches">
                <div class="items">
                    <div v-if="showLess">
                        <div class="item" v-for="match in sortedItems.slice(0, 5)" :key="match.id">
                            <div class="item__left">
                                <a href="#">
                                    <img :src="match.team1.teamLogoUrl" :alt="match.team1.teamName" loading="lazy">
                                    <span>{{ match.team1.teamName }}</span>
                                </a>
                                <span class="vs">vs</span>
                                <a href="#">
                                    <img :src="match.team1.teamLogoUrl" :alt="match.team1.teamName" loading="lazy">
                                    <span>{{ match.team2.teamName }}</span>
                                </a>
                            </div>
                            <div class="item__right">
                                <div class="game-time">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                stroke="#959FA8" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M12 6V12L16 14" stroke="#959FA8" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    <span>{{ match.date }}</span>
                                </div>
                                <a href="#">
                                    <span>View Details</span><span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19" stroke="#007330" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 5L19 12L12 19" stroke="#007330" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="item" v-for="match in sortedItems" :key="match.id">
                            <div class="item__left">
                                <a href="#">
                                    <img src="../assets/img/match-team-1.png" alt="match-team-1.png" loading="lazy">
                                    <span>{{ match.team1.teamName }}</span>
                                </a>
                                <span class="vs">vs</span>
                                <a href="#">
                                    <img src="../assets/img/match-team-2.png" alt="match-team-2.png" loading="lazy">
                                    <span>{{ match.team2.teamName }}</span>
                                </a>
                            </div>
                            <div class="item__right">
                                <div class="game-time">
                                    <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                stroke="#959FA8" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M12 6V12L16 14" stroke="#959FA8" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span><span>{{ match.date }}</span>
                                </div>
                                <a href="#">
                                    <span>View Details</span><span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19" stroke="#007330" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 5L19 12L12 19" stroke="#007330" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";


export default {
    // get matches collection from firestore
    data() {
        return {
            matches: [],
            showLess: true
        }
    },
    created() {
        this.getMatches();
        console.log(this.matches)
    },
    methods: {
        async getMatches() {
            const matchesRef = getDocs(collection(db, "matches"));
            try {
                (await matchesRef).forEach((doc) => {
                    const match = doc.data();
                    match.id = doc.id;
                    match.date = new Date(doc.data().match_date.seconds * 1000).toLocaleDateString();
                    this.matches.push(match);
                });
            } catch (e) {
                console.error(e);
            }
        },
        // at click showLess scroll to id scroll-to-matches
        showLessMatches() {
            this.showLess = !this.showLess;
            setTimeout(() => {
                var scrollDiv = this.$refs.scrollToMatches.offsetTop-80;
                window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
            }, 200);
        },
    },
    computed: {
        sortedItems: function () {
            this.matches.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            return this.matches;
        }
    }
}
</script>

<style scoped lang="scss">
.content {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 48px 0;
        font-size: 18px;
        font-weight: 500;
    }

    &__body {
        .item {
            padding: 28px;
            display: flex;
            justify-content: space-between;
            background-color: $secondary-500;
            border-radius: 5px;
            border: 1px solid $primary-300;
            margin-bottom: 24px;

            &__left,
            &__right {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
            }

            &__left {
                a {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 150px;
                    max-width: 150px;
                }

                .vs {
                    position: relative;
                    color: $primary-800;

                    &::before,
                    &::after {
                        content: '';
                        position: absolute;

                        left: 50%;
                        transform: translateX(-50%);
                        width: 1px;
                        height: 100%;
                        background-color: $primary-300;
                    }

                    &::before {
                        top: -25px;
                    }

                    &::after {
                        bottom: -25px;
                    }
                }
            }

            &__right {
                display: flex;
                gap: 48px;

                .game-time {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: row;
                    gap: 12px;

                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;

                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
}
</style>