<template>
    <div>
        <!-- live matches -->
        <div class="content" id="trending-now">
            <div class="content__title">
                <h3>Trending Now</h3>
                <div class="content__button">
                    <a href="#">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.70833 6.5H10.2917" stroke="#A0A8B1" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6.5 2.70833L10.2917 6.5L6.5 10.2917" stroke="#A0A8B1" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="content__body">
                <a href="#">
                    <img class="profile__img" src="../assets/img/trending-img.png" alt="trending-img.png"
                        loading="lazy">
                </a>
                <a class="profile__name" href="#">{{ trendingPlayer.name }}</a>
                <div class="profile__goals">
                    <span>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.2917 1.58333L2.375 11.0833H9.5L8.70833 17.4167L16.625 7.91667H9.5L10.2917 1.58333Z"
                                stroke="#FFA600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span>{{ trendingPlayer.score }}</span>
                </div>
                <div class="profile__review">
                    <Button>View Profile</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
    name: "TrendingPlayer",
    data() {
        return {
            trendingPlayer: {
                name: '',
                score: ''
            }
        }
    },
    methods: {
        // getTrendingPlayer from db
        async getTrendingPlayer(context) {
            const playersRef = collection(db, "players");
            const playersSnapshot = await getDocs(playersRef);
            const players = playersSnapshot.docs.map(doc => doc.data());

            // sort players by score
            players.sort(function (a, b) {
                a = a.newPlayer.playerScore;
                b = b.newPlayer.playerScore;
                return a > b ? -1 : a < b ? 1 : 0;
            })

            //get only top 1 player
            const trendingPlayer = players.slice(0, 1);
            //get only name and score
            const trendingPlayerData = trendingPlayer.map(player => {
                return {
                    name: player.newPlayer.playerName,
                    score: player.newPlayer.playerScore
                }
            })

            this.trendingPlayer.name = trendingPlayerData[0].name;
            this.trendingPlayer.score = trendingPlayerData[0].score;
        }
    },
    mounted() {
        this.getTrendingPlayer()
    },
}
</script>

<style type="scoped" lang="scss">
.content__title {
    display: flex;
    justify-content: space-between;
    align-content: center;
}

#trending-now {
    .content__body {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .profile {
            &__img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-bottom: 16px;
            }

            &__name {
                font-size: 24px;
                font-weight: bold;
                color: $primary-800;
                margin-bottom: 8px;
            }

            &__goals {
                display: flex;
                gap: 4px;
                margin-bottom: 12px;

                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            &__review {
                .btn {
                    padding: 8px 16px;
                    min-width: 100%;
                    background-color: $secondary-500;
                    color: $compliment-600;
                    border: 1px solid $primary-300;

                    &:hover {
                        background-color: $compliment-600;
                        color: $secondary-500;
                    }
                }
            }
        }

    }
}
</style>