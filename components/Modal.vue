<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <div class="modal__wrapper">
                    <header class="modal-header" id="modalTitle">
                        <slot name="header">
                        </slot>
                        <button type="button" class="btn-close" aria-label="Close modal" @click="closeModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </header>
                    <section class="modal-body" id="modalDescription">
                        <slot name="body">
                        </slot>
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    methods: {
        closeModal() {
            console.log('close btn')
            this.$store.commit('closeModal');
        },
    },
}
</script>

<style scoped lang="scss">
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.modal {
    box-shadow: 0 10px 20px rgba($primary-800, 0.2);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-width: 400px;
    background-color: $secondary-500;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 50%;
    margin: 0 auto;
    min-width: 400px;
    padding: 16px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    &__wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;

        .modal-body,
        .modal-header {
            width: 100%;
        }
    }
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid $soft-gray;
    color: $primary-800;
    justify-content: space-between;
    align-items: center;
}

.modal-footer {
    border-top: 1px solid $soft-gray;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    border: none;
    padding: 10px;
    margin-right: -10px;
    cursor: pointer;
    font-weight: bold;
    color: $compliment-500;
    background: transparent;
}

.btn-green {
    color: white;
    background: $compliment-500;
    border: 1px solid $compliment-500;
    border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease
}
</style>