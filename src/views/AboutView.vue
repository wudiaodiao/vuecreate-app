<template>
  <div class="city">
    <span class="current_province">浙江省</span>
    <div
      class="platform_button"
      @click="enterClick"
    ></div>
    <div class="date_weather">
      <!-- <span class="date">{{ date | datefmt('yyyy/MM/DD HH:mm') }}</span>
      <span class="week">{{ date | datefmt('dddd') }}</span> -->
      <i :class="weather"></i>
      <span class="temperature">{{ weatherData.temp }}°</span>
    </div>
    <div
      :class="{ hangzhou_bg_enter: isNameEnter, hangzhou_bg: true }"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <span :class="{ name_enter: isNameEnter, name: true }">杭州市</span>
    </div>
    <transition name="fade">
      <div
        class="hospital_info"
        v-show="infoVisible"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      infoVisible: false,
      weather: 'weather qi-301',
      weatherData: {},
      isNameEnter: false,
    }
  },
  methods: {
    // async GetWeather() {
    //   const res = await this.$api.MMS.Weather.WeatherNow()
    //   if (res.ok) {
    //     this.weatherData = res.data
    //     this.weather = `weather qi-${this.weatherData.icon}`
    //   }
    // },
    enterClick() {
      window.location.href = '2d.html'
    },
    mouseEnter() {
      this.infoVisible = true
      this.isNameEnter = true
    },
    mouseLeave() {
      this.infoVisible = false
      this.isNameEnter = false
    },
  },
  mounted() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
    // this.GetWeather()
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.city {
  user-select: none;
  background-image: url(../assets/image/Hospital/city.png);
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .current_province {
    position: absolute;
    left: 14%;
    top: 16%;
    font-size: 15px;
    color: #fff;
  }
  .platform_button {
    cursor: pointer;
    position: absolute;
    width: 185px;
    height: 38px;
    right: 7.8%;
    top: 15%;
    background-image: url(../assets/image/Hospital/total_platform_button.png);
    background-size: 100% 100%;
  }
  .date_weather {
    font-size: 22px;
    position: absolute;
    right: 2%;
    top: 6.45%;
    .date {
    }
    .week {
      margin-left: 4rem;
    }
    .weather {
      margin-left: 3.5rem;
    }
    .temperature {
      margin-left: 1.5rem;
    }
  }
  .hangzhou_bg_enter {
    background-image: url(../assets/image/Hospital/hz_selected.png);
  }
  .hangzhou_bg {
    position: absolute;
    cursor: pointer;
    top: 25.3%;
    left: 35%;
    background-size: 100% 100%;
    width: 25.4%;
    height: 28.9%;
    z-index: 99;
    .name_enter {
      color: #fff !important;
    }
    .name {
      position: absolute;
      top: 42%;
      left: 40%;
      color: #92d2d0;
      z-index: 1;
    }
  }
  .hospital_info {
    background-image: url(../assets/image/Hospital/hospital_info.png);
    background-size: 100% 100%;
    position: absolute;
    left: 9.5%;
    top: 25%;
    width: 1658px;
    height: 562px;
  }
}
</style>
