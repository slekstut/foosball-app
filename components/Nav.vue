<template>
    <div class="container">
        <div class="nav">
            <div class="logo">
                <img src="" alt="foosball">
            </div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#" @click="toggleModal">Add a team</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Nav',
  methods: {
    toggleModal() {
        this.$store.commit('toggleModal');
        },
  },
};
</script>

<style scroped lang="scss">
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    nav {
        display: flex;
        align-items: center;

        ul {
            display: flex;
            align-items: center;
            list-style: none;

            li {
                margin-left: 20px;

                a {
                    color: $green;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 500;
                    transition: all .2s;
                    display: inline-block;
                    position: relative;

                    &:after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        transform: scaleX(0);
                        height: 2px;
                        bottom: 0;
                        left: 0;
                        background-color: $green;
                        transform-origin: bottom right;
                        transition: transform 0.25s ease-out;
                    }



                    &:hover {
                        &::after {
                            transform: scaleX(1);
                            transform-origin: bottom left;
                        }

                    }
                }
            }
        }
    }

}
</style>