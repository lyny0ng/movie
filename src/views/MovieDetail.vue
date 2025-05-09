<template>
  <div class="movie-detail">
    <button @click="goBack" class="back-button">
      <i class="fas fa-arrow-left"></i>
    </button>

    <div v-if="movie">
      <img
        class="poster"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <div class="detail-box">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <p class="rating">⭐ 평점: {{ movie.vote_average.toFixed(1) }}</p>
        <p class="overview">{{ movie.overview }}</p>
        <p class="release"><strong>개봉일:</strong> {{ movie.release_date }}</p>

        <div class="providers">
            <h3>이 영화는 여기서 볼 수 있어요:</h3>
            <div v-if="providers.length" class="provider-logos">
            <img
                v-for="provider in providers"
                :key="provider.provider_id"
                :src="'https://image.tmdb.org/t/p/w45' + provider.logo_path"
                :alt="provider.provider_name"
            />
            </div>
            <p v-else class="no-providers">현재 제공 중인 OTT가 없어요 😢</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>영화 정보를 불러오는 중입니다...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie: null,
      providers: [],
    };
  },
  methods: {
    async fetchMovie() {
      const id = this.$route.params.id;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=989a8077609cbbb245a270345b0cb0c7&language=ko`
      );
      this.movie = response.data;
    },
    async fetchWatchProviders() {
      const id = this.$route.params.id;
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=989a8077609cbbb245a270345b0cb0c7`
      );
      const data = res.data.results?.KR;
      if (data?.flatrate) {
        this.providers = data.flatrate.filter(
            (provider, index, self) =>
            index === self.findIndex(p => p.provider_id === provider.provider_id)
        );
    }

    },
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
  const id = this.$route.params.id;
  if (!id) {
    this.$router.replace('/');  // or show error page
    return;
  }
  this.fetchMovie();
  this.fetchWatchProviders();
},

};
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #ff6b6b;
  position: absolute;
  left: 0px;
  top: -20px;
  padding: 0;
}

.poster {
  width: 100%;
  border-radius: 12px;
  margin: 0 auto 20px;
}

.detail-box {
    background: #fff;
    padding: 15px;
    margin-top: 0px;
    border-radius: 10px;
    text-align: left;
}

.movie-title {
  font-size: 1.5rem;
  margin-top: 10px;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ff6b6b;
  font-weight: bold;
}

.rating {
  font-size: 1rem;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #ff6b6b;
}

.overview {
  margin-top: 15px;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
}

.release {
  margin: 15px 0;
  color: #666;
  margin-bottom: 0;
}

.providers {
  margin-top: 20px;
  border-top: 1px solid #ff6b6b;
  padding-top: 20px;
}

.providers h3 {
    font-size: 1.2rem;
}

.provider-logos {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-top: 10px;
}

.provider-logos img {
  width: 40px;
  height: auto;
  border-radius: 5px;
}

.no-providers {
  font-size: 0.95rem;
  color: #999;
  margin-top: 10px;
}
</style>
