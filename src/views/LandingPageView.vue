<template>
<div class="info-section fadeIn">
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
</template>

<script>

export default {
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
