<template>
    <div class="container">
        <Nav></Nav>
        <h1>Register</h1>

        <div>
            <!-- import input component -->
            <!-- <Input label="Email" type="email" id="email" value="email"></Input> -->
            <!-- <Input label="Password" type="password" id="password" value="password"></Input> -->
            <input type="email" v-model="email" placeholder="email">
            <input type="password" v-model="password" placeholder="passowrd">
            <!-- add Button component -->
            <button @click="createUser">Register</button>

        </div>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        // add register method
        async createUser() {
            
            alert('clicked')
            console.log('create started')
            try {
                await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password);
                console.log('create success')
                this.$router.push('/login');
            } catch (e) {
                console.error(e);
            }
        }
    }
    
}
</script>