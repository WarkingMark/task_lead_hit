<template>
  <div class="container">
    <h1 class="section-title">Анатилитка</h1>
    <h2 class="h2-title">Аналитика по визитам</h2>
    <LineGraphic
      :data="readyGraphicData"
      :cursor="{lineX: false, lineY: false}"
      :graphicDisplaySettings="{
        x: {categoryField: 'date', value: 'data'},
        y: {categoryField: 'visits', value: 'visits'}
      }"
      :tooltip="{
          tooltipContent: {
            labelText: '{valueY}, {valueX}',
            dy:-10
          },
          tooltipAnother: {
            fill: 0x0a70fa,
            stroke: 0x0a70fa
          }
      }"
      :bullets="{
        fill: 0x0a70fa,
        radius: 8,
        templateField: 'bulletSettings',
      }"
      :fills="{
        visible: true,
        fillOpacity: 0.4,
        templateField: 'fillSettings',
      }"
      :strokes="{
        templateField: 'strokeSettings',
        strokeWidth: 3,
        fill: 0x0a70fa,
      }"
      :delayBeforeDisplay="500"
    />
    <button
        class="button red"
        @click="exit"
    >Выйти</button>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
// Store

import {useStore} from "vuex";
// График
import * as am5 from '@amcharts/amcharts5';
// Компоненты
import LineGraphic from "@/components/lineGraphic/LineGraphic";
export default defineComponent({
  name: "Analysis Layout",
  components: {LineGraphic},
  setup () {
    const Store = useStore();

    const graphicData = computed(() => Store.getters["analysisModuleStore/analysisData"]);

    const readyGraphicData = [...graphicData.value].map((data) => {
      let currentDate = new Date (data.date).toLocaleString('ru', {
        month: 'long',
        day: 'numeric'
      });

      return {
        visits: data.visits,
        date: currentDate,
        strokeSettings: {
          stroke: am5.color(0x0a70fa)
        },
        fillSettings: {
          fill: am5.color(0x0a70fa),
        },
        bulletSettings: {
          fill: am5.color(0x0a70fa)
        }}
    })

    function exit () {
      Store.dispatch('authModuleStore/exit');
    }
    return {
      exit,
      graphicData,
      readyGraphicData,
    }
  }
})
</script>

<style scoped></style>
