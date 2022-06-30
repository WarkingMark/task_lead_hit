<template>
  <template v-if="!errors">
    <div class="graphic" ref="graphic"></div>
  </template>
  <template v-else>
    <p class="notice"><b class="red">Произошла ошибка при создании графика:</b> {{errors}}</p>
  </template>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";

export default defineComponent({
  name: "Line Graphic",
  props: {
    data : {
      type: Array,
      required: true
    },
    delayBeforeDisplay: {
      type: Number,
      default: 100
    },
    cursor: {
      type: Object,
      default: {  lineX: false, lineY: false  }
    },
    graphicDisplaySettings: {
      type: Object,
      required: true,
      default: {
        x: {categoryField: 'fieldX', value: 'valueX'},
        y: {categoryField: 'fieldY', value: 'valueY'}
      }
    },
    tooltip: {
      type: Object,
      default: {
        tooltipContent: {
          labelText: '{valueY}, {valueX}',
          dy:-10
        },
        tooltipAnother: {
          fill: 0x0a70fa,
          stroke: 0x0a70fa
        }
      }
    },
    bullets: {
      type: Object,
      default: {
        fill: 0x0a70fa,
        radius: 8,
        templateField: 'bulletSettings',
      }
    },
    fills: {
      type: Object,
      default: {
        visible: true,
        fillOpacity: 0.4,
        templateField: 'fillSettings',
      }
    },
    strokes: {
      type: Object,
      default: {
        templateField: 'strokeSettings',
        strokeWidth: 3,
        fill: 0x0a70fa,
      }
    },
  },
  setup (props) {
    const graphic = ref(null);
    const errors = ref(false);

    onMounted(() => {
      try {
        // Создание root элемента
        const root = am5.Root.new(graphic.value);

        // Установка темы
        root.setThemes([
          am5themes_Animated.new(root)
        ]);

        // Создание графика
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          pinchZoomX:true
        }));

        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "none",
        }));

        cursor.lineY.set("visible", props.cursor.lineY);
        cursor.lineX.set("visible", props.cursor.lineX);

        // Данные графика
        const xRenderer = am5xy.AxisRendererX.new(root, {});

        xRenderer.grid.template.set("location", 0.5);

        xRenderer.labels.template.setAll({
          location: 0.5,
          multiLocation: 0.5
        });

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: props.graphicDisplaySettings.x.categoryField,
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(props.data);

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          maxPrecision: 0,
          renderer: am5xy.AxisRendererY.new(root, {})
        }));

        const series = chart.series.push(am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: props.graphicDisplaySettings.y.categoryField,
          valueXField: props.graphicDisplaySettings.x.categoryField,
          categoryXField: props.graphicDisplaySettings.x.categoryField,
          tooltip: am5.Tooltip.new(root, {
            ...props.tooltip.tooltipContent
          }),
          ...props.tooltip.tooltipAnother
        }));

        series.strokes.template.setAll({
          ...props.strokes,
          fill: am5.color(props.strokes.fill),
        });

        series.fills.template.setAll({
          ...props.fills,
        });

        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              ...props.bullets,
              fill: am5.color(props.bullets.fill)
            })
          });
        });

        series.data.setAll(props.data);
        series.appear(1000);

        chart.appear(1000, props.delayBeforeDisplay);

      } catch (err) {
        errors.value = err
      }
    })


    return {
      graphic,
      errors
    }
  }
})
</script>

<style src="./lineGraphic.css" scoped>

</style>
