<template>
    <div class="sidebar">
        <!-- live matches -->
        <div class="content">
            <div class="content__title">
                <h3>Live Matches</h3>
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
                <div class="left__block">
                    <a href="#"><img src="../assets/img/match-team-1.png" alt="match-team-1.png" loading="lazy">
                    </a>
                    <span>3</span>
                </div>
                <div class="middle__block">
                    :
                </div>
                <div class="right__block">
                    <span>2</span>
                    <a href="#"><img src="../assets/img/match-team-2.png" alt="match-team-2.png" loading="lazy">
                    </a>
                </div>
            </div>
        </div>
        <!-- teams -->
        <div class="content" id="teams">
            <div class="content__title">
                <h3>Teams</h3>
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
                <div class="left__block">
                    <a href="#">
                        <img src="../assets/img/tigers4.png" alt="tigers4.png" loading="lazy">
                    </a>
                    <span>Tigers VI</span>
                </div>
                <div class="right__block teams__action">
                    <span>See Profile</span>
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
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    padding: 32px;
    width: 100%;
    max-width: 320px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;

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
        }

        &__body {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left__block,
            .right__block {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .middle__block {
                margin: 0 16px;
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
            }
        }
    }
}
</style>