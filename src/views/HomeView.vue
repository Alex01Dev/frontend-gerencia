<template>
  <div class="home">
    <Menu />
    
    <!-- Slider en la parte superior -->
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
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>

    <!-- Sección con imagen, degradado y texto alineado a la izquierda -->
    <div class="info-section">
      <div class="info-content">
        <h2>Gestión de Gimnasio Eficiente</h2>
        <p>Optimiza la administración de tu gimnasio con herramientas avanzadas de seguimiento, control de membresías y reportes en tiempo real.</p>
        <button class="cta-button">Descubre más</button>
      </div>
      <div class="info-image">
        <img src="../assets/Fondo_login.jpeg" alt="Gimnasio" />
      </div>
    </div>

    <!-- Sección de imágenes complementarias -->
    <div class="gallery">
      <img v-for="(image, index) in galleryImages" :key="index" :src="image" class="gallery-image" />
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
      galleryImages: [
        'https://images.pexels.com/photos/1.jpg',
        'https://images.pexels.com/photos/2.jpg',
        'https://images.pexels.com/photos/3.jpg'
      ]
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
  color: white;
  padding: 20px;
  overflow-x: hidden;
  min-height: 100vh; /* Permite el scroll vertical */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px; 
}

.slider-container {
  width: 50%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide img {
  width: 100%;
  object-fit: cover;
}

.prev, .next {
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev { left: 0; }
.next { right: 0; }

.info-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; /* Permite ajuste en pantallas pequeñas */
  padding: 20px;
  text-align: left;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
}

.info-content {
  width: 50%;
}

.info-image {
  width: 50%;
  display: flex;
  justify-content: center;
}

.info-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
}

.cta-button {
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.gallery {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.gallery-image {
  width: 30%;
  height: auto;
  border-radius: 10px;
}
</style>
