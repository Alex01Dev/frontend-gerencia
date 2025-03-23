<template>
  <div class="home">
    <Menu />

    <div class="info-section">
      <div class="info-content">
        <h2>Gestión de Gimnasio Eficiente</h2>
        <p>Accede a reportes detallados, administra tus finanzas y controla múltiples sucursales, todo en un solo lugar.</p>
      </div>
      <div class="info-image slider-container">
        <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="slide" v-for="(slide, index) in slides" :key="index">
            <img :src="slide.image" :alt="slide.title" />
          </div>
        </div>
        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';

export default {
  components: {
    Menu,
  },
  data() {
    return {
      currentIndex: 0,
      slides: [
        { image: require('@/assets/Imagen1.jpg'), title: 'Slide 1' },
        { image: require('@/assets/Imagen2.jpg'), title: 'Slide 2' },
        { image: require('@/assets/Imagen3.jpg'), title: 'Slide 3' },
      ],
    };
  },
  mounted() {
    setInterval(this.nextSlide, 3000); 
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
};
</script>

<style scoped>
.home {
  color: white;
  padding: 20px;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 180px;
}

.info-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 12px 80px;
  text-align: left;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
  min-height: 360px;
}

.info-content {
  width: 30%;
}

.slider-container {
  width: 70%;
  max-width: 800px;
  height: 360px;
  overflow: hidden;
  position: relative;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  width: 100%;
  flex: 0 0 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.041);
  color: rgba(255, 255, 255, 0.226);
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 768px) {
  .info-section {
    flex-direction: column;
    text-align: center;
    padding: 30px;
    min-height: 500px;
  }
  .info-content,
  .slider-container {
    width: 100%;
  }
}
</style>