<template>
  <section class="container">
    <Nav></Nav>
    <div class="home">
      <LeftSidebar></LeftSidebar>
      <div class="main__content">
        <Banner></Banner>
        <LatestMatches></LatestMatches>
      </div>
    </div>
  </section>
</template>
<script>
import LeftSidebar from '../components/LeftSidebar.vue';
import LatestMatches from '../components/LatestMatches.vue';

export default {
  components: { LeftSidebar, LatestMatches },
  methods: {}
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 0;

  .home {
    display: flex;
    gap: 48px;

    .main__content {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
