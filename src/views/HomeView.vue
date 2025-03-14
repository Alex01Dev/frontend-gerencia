<template>
  <div class="home">
    <Menu />
    <div class="slider-container">
      <div class="slider">
        <div 
          class="slide" 
          v-for="(slide, index) in slides" 
          :key="index" 
          :style="{ transform: `translateX(${-currentIndex * 100}%)` }">
          <img :src="slide.image" :alt="slide.title" />
        </div>
      </div>
      <div class="blur-overlay"></div>
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>

    <!-- Mission, Vision, and About Us cards -->
    <div class="info-cards">
      <div class="mission-vision">
        <div class="card mission">
          <h3>Misión</h3>
          <p>Brindar un espacio motivador e inclusivo donde nuestros miembros alcancen sus metas de salud y bienestar, optimizando servicios y recursos para una experiencia excepcional.</p>
        </div>
        <div class="card vision">
          <h3>Visión</h3>
          <p>Ser un gimnasio líder, reconocido por calidad, innovación y enfoque integral en la salud, promoviendo un estilo de vida activo en nuestra comunidad.</p>
        </div>
      </div>
      <div class="about-us">
        <div class="card">
          <h3>Sobre Nosotros</h3>
          <p>En Gym Bulls, la gerencia coordina y optimiza las operaciones para garantizar un servicio de excelencia. Nuestro equipo está comprometido con la mejora continua, creando un ambiente donde entrenadores y miembros alcancen su máximo potencial.</p>
        </div>
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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
}

/* Carrusel */
.slider-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%; /* Ajustado para darle más espacio */
}

.slider {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que cubra el contenedor */
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.5);
}

.prev {
  left: 0;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Degradado en la parte inferior */
.blur-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(53, 31, 31, 0.76) 100%);
}

/* Cards de Misión, Visión y Sobre Nosotros */
.info-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}

.mission-vision {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
}

.card {
  background: linear-gradient(to top, rgba(38, 11, 100, 0.6) 0%, rgba(65, 2, 2, 0.473) 100%);
  border: 2px solid #ccc;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 6px 18px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.mission,
.vision {
  width: 45%; /* Un poco más anchas para las cards de Misión y Visión */
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}

.card h3 {
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 600;
}

.card p {
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.6;
}

.about-us {
  display: flex;
  justify-content: center;
  width: 80%;
}

.about-us .card {
  width: 100%; /* Ocupa el ancho completo */
}
</style>
