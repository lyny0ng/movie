<template>
  <div class="home">
    <!-- 검색창 -->
    <input
      type="text"
      v-model="searchQuery"
      class="search-input"
      placeholder="영화명을 검색하세요"
      @input="searchMovies"
    />

    <!-- 장르 버튼들 -->
    <div class="genre-list mt-4">
      <button
        v-for="genre in genres"
        :key="genre.id"
        :class="['genre-button', { active: selectedGenre === genre.id }]"
        @click="selectGenre(genre.id)"
      >
        {{ genre.name }}
      </button>
    </div>

    <!-- 로딩 바 -->
    <div v-if="isLoading" class="loading-overlay">
        <img class="logo" src="@/assets/images/popcorn.png" alt="popcorn">
    </div>

    <!-- 영화 카드 -->
    <div class="movie-container">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-card"
        @click="$router.push(`/movie/${movie.id}`)"
      >
        <div class="movie-card-inner">
          <img
            v-if="movie.poster_path"
            class="movie-poster"
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="movie-rating pb-0 mb-0 text-end d-flex" style="justify-content: space-between;">
              <span class="text-start">{{ movie.release_date }}</span>
              <span class="text-end"> ⭐ 평점: {{ movie.vote_average }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      selectedGenre: null,
      searchQuery: '',
      genres: [],
      movies: [],
      isLoading: true,  // 페이지 로딩시 바로 로딩 화면이 보이게 설정
    };
  },
  computed: {
    filteredMovies() {
      let filtered = this.movies;

      // 장르 필터
      if (this.selectedGenre) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(this.selectedGenre)
        );
      }

      // 검색어 필터
      if (this.searchQuery) {
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },
  methods: {
    async fetchGenres() {
      const apiKey = '989a8077609cbbb245a270345b0cb0c7';
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ko-KR`
      );
      this.genres = [{ id: null, name: '전체' }, ...response.data.genres];
    },
    async fetchMovies() {
      const apiKey = '989a8077609cbbb245a270345b0cb0c7';
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&sort_by=popularity.desc&page=1`;

      if (this.selectedGenre) {
        url += `&with_genres=${this.selectedGenre}`;
      }

      const response = await axios.get(url);

      // ✅ 중복 제거
      this.movies = Array.from(
        new Map(response.data.results.map(movie => [movie.id, movie])).values()
      );

      // 2초 후에 로딩 화면 숨기기
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);  // 2초 동안 로딩 화면을 유지
    },
    selectGenre(genreId) {
      this.selectedGenre = genreId;
      this.fetchMovies();
    },
    searchMovies() {
      // 호출하지 않아도 filteredMovies가 반응형으로 자동 갱신되므로 비워도 됩니다
    },
  },

  mounted() {
    this.fetchGenres();
    this.fetchMovies();
  },
};
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 10px;
}

.search-input {
  padding: 12px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ff6b6b;
  background: #fff;
  color: #333;
}

.search-input::placeholder {
  font-size: 0.8rem;
}

.genre-list {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.genre-list::-webkit-scrollbar {
  display: none;
}

.genre-button {
  padding: 0.3rem 0.6rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
  font-size: 0.85rem;
}
.genre-button.active {
  background-color: #ff6b6b;
}
.genre-button:hover {
  background-color: #ff6b6b;
  color: white;
}

.movie-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.movie-card {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  padding: 10px;
  background-image: repeating-linear-gradient(
    45deg,
    #ff6b6b,
    #ff6b6b 10px,
    #fff 10px,
    #fff 20px
  );
  background-size: cover;
}

.movie-card:hover {
  transform: perspective(1000px) scale(1.02);
  transition: all .5s;
}

.movie-poster {
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.1);
}

.movie-info {
  padding: 15px;
  background: #000;
  color: #fff;
  font-family: 'Pretendard', sans-serif;
  text-align: left;
}

.movie-info h3 {
  font-size: 1.1rem;
  margin-top: 5px;
}

.movie-title {
  font-weight: bold;
}

.movie-overview {
  font-size: 14px;
  color: #555;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  animation: bounce 1s ease-in-out infinite;
}

/* 통통 튀는 애니메이션 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
