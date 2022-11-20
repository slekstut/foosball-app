<template>
    <div class="container">
        <Nav></Nav>
        <h1>Register</h1>

        <form action="">
            <!-- import input component -->
            <Input label="Email" type="email" id="email"></Input>
            <Input label="Password" type="password" id="password"></Input>

            <!-- add Button component -->
            <Button>Login</Button>

        </form>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import Input from "~/components/Input.vue";
export default {
    
}
</script>