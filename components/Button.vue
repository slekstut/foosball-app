<template>
    <button class="btn" type="submit">
        <slot></slot>
    </button>
</template>

<style lang="scss">
.btn {
    align-items: center;
    border: 1px solid $primary-800;
    background-color: transparent;
    border-radius: 16px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    font-size: 18px;
    justify-content: center;
    line-height: 28px;
    max-width: 100%;
    padding: 14px 22px;
    text-decoration: none;
    transition: all .125s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;

    @media (min-width: $sm-max) {
        font-size: 16px;
        padding: 14px 16px;
    }

    &:active,
    &:hover {
        outline: 0;
    }

    &:hover {
        color: $compliment-500;
        background-color: $secondary-500;
        border: 1px solid $compliment-500;
    }
}
</style>