<!-- // create input component -->
<template>
    <div class="input__wrapper">
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="id" v-model="value">
    </div>


</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            value: ''
        }
    }
}

</script>

<style lang="scss">
.input__wrapper {
    margin-bottom: 16px;
    label {
        display: block;
        margin-bottom: 8px;
    }
    input {
        width: 100%;
        padding: 8px;
        border: 1px solid $primary-300;
        border-radius: 5px;
        background-color: $secondary-500;
        color: $primary-300;
    }
}

</style>