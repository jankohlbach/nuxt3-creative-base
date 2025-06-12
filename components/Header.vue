<template>
  <header>
    <div class="container">
      <NuxtLink to="/">Nuxt3 Creative Base</NuxtLink>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/page-2">Page 2</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding-block: to-rem(20);
}

.container {
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

ul {
  display: flex;
  gap: to-rem(20);
  list-style: none;
}
</style>
