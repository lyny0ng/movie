<template>
  <div class="movie-card">
    <img :src="movie.poster_path" alt="Movie Poster" class="movie-poster" />
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object  // 부모에서 전달받을 영화 객체
  }
};
</script>

<style scoped>
.movie-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.movie-poster {
  width: 100%;
  border-radius: 4px;
}

h2 {
  font-size: 1.2rem;
  margin-top: 10px;
}

p {
  font-size: 0.9rem;
  color: #555;
}
</style>
