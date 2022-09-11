<template>
    <div class="banner">
        <div class="banner__wrapper">
            <div class="banner__left">
                <div class="banner__img">
                    <img src="../assets/img/banner-img.png" alt="banner-img.png">
                </div>
            </div>
            <div class="banner__right">
                <h2 class="banner__title">
                    Weekly Foosball Challenge
                </h2>
                <div class="banner__cta">
                    <Button>
                        Create A Game
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#172C41" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="#172C41" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.banner {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 335px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/img/banner-background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 5px;
    overflow: hidden;

    &__wrapper {
        width: 100%;
        height: 100%;
        min-height: 335px;
        padding: 48px 48px 0 275px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 48px;
    }

    &__img {
        position: absolute;
        bottom: 0;
        left: 48px;
        max-height: 300px;
    }

    &__right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        padding-bottom: 24px;

    }

    &__title {
        width: 100%;
        font-size: 48px;
        font-weight: bold;
        color: $secondary-500;
        margin-bottom: 16px;
    }

    &__cta {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;

        .btn {
            background-color: $secondary-500;
            color: $primary-800;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 30px;
            padding: 14px 28px;

            &:hover {
                background-color: $compliment-600;
                color: $secondary-500;

                svg {
                    path {
                        stroke: $secondary-500;
                    }
                }
            }

            span {
                margin-left: 8px;
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>