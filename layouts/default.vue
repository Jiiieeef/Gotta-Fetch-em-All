<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/logo.png" alt="Logo"> Gotta Fetch 'Em All
        </a>
      </div>
    </nav>

    <section class="main-content">
      <div class="container ">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .navbar-item {
    img {
      margin-right: 5px;
    }
  }
</style>
