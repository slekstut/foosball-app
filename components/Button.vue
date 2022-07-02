<template>
    <div>
        <button class="btn" type="submit">
            <slot></slot>
        </button>
    </div>
</template>

<style scoped lang="scss">
.btn {
    align-items: center;
    background-color: $green;
    border: 1px solid $green;
    border-radius: 16px;
    box-sizing: border-box;
    color: $white;
    cursor: pointer;
    display: flex;
    font-size: 18px;
    justify-content: center;
    line-height: 28px;
    max-width: 100%;
    padding: 14px 22px;
    text-decoration: none;
    transition: all .2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;

    @media (min-width: $sm-max) {
        font-size: 20px;
        min-width: 200px;
        padding: 14px 16px;
}

    &:active,
    &:hover {
        outline: 0;
    }

    &:hover {
    color: $green;
    background-color: $white;
    border: 1px solid $green;
}
}

</style>