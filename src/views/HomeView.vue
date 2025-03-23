<template>
  <div class="home">
    <Menu />

    <div class="info-section fadeIn">
      <div class="info-content">
        <h2 >Gestión de Gimnasio Eficiente</h2>
        <p >Accede a reportes detallados, administra tus finanzas y controla múltiples sucursales.</p>

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

    <div class="options-section fadeIn">
      <h2>¿Qué deseas hacer hoy?</h2>
      <div class="options-container">
        <router-link to="/dashboard" class="option fadeIn">
          <img src="@/assets/diagrama.png" class="icon" alt="Reportes" />
          <h3>Ver transacciones y reportes</h3>
        </router-link>
        <router-link to="/sucursales" class="option fadeIn">
          <img src="@/assets/edificio.png" class="icon" alt="Sucursales" />
          <h3>Administrar sucursales</h3>
        </router-link>
      </div>
    </div>
    <div class="parallax fadeIn">
      <h1 class="fadeIn">GYM BULLS</h1>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/MainMenu.vue';
import Footer from '@/components/FooterComponent.vue';


export default {
  components: {
    Menu,Footer
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.home {
  color: white;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 940px;
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

.options-section {
  width: 100%;
  text-align: center;
  margin-bottom: 64px;
  margin-top: 20px;

}

.options-section h2 {
  margin-bottom: 32px;
  font-size: 34px;
  color: white;
  z-index: 1;
}

.options-container {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.option {
  background: rgba(0, 0, 0, 0.322);
  backdrop-filter: blur(12px);
  color: white;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.644);
  transition: transform 0.3s;
}

.option:hover {
  transform: scale(1.05);
  border: 0.5px solid white;
}

.icon {
  width: 50px;
  height: 50px;
  margin-top: 16px;
}

h3 {
  margin-top: 1px;
  color: white;
}
.parallax {
  position: relative;
  width: 100vw;
  min-height: 440px;
  background-image: url('@/assets/parallax.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

/* Capa de color rojo tenue */
.parallax::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.055); 
}

.parallax h1 {
  position: relative;
  z-index: 1;
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

  .options-container {
    flex-direction: column;
    align-items: center;
  }


}
</style>
