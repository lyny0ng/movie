<template>
  <div class="movie-card" @click="$emit('click', movie)">
    <img
      v-if="movie.poster_path"
      :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
      alt="Movie Poster"
      class="movie-poster"
    />
    <h2 v-if="movie.title">{{ movie.title }}</h2>
    <p v-if="movie.overview">{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
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
  cursor: pointer;
  transition: transform 0.3s ease;
}
.movie-card:hover {
  transform: scale(1.02);
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
