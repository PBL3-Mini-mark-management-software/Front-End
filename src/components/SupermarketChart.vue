<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartRef = ref(null);
let myChart = null;

const supermarketData = {
  labels: [
    "Gạo ST25", "Sữa Vinamilk 1L", "Mì Hảo Hảo", "Dầu ăn Simply 1L",
    "Đường Biên Hòa 1kg", "Bánh Oreo 133g", "Coca-Cola 1.5L",
    "Nước mắm Nam Ngư 500ml", "Bột giặt OMO 3kg", "Trứng gà CP (10 quả)"
  ],
  datasets: [
    {
      label: "Số lượng bán ra (đơn vị: sản phẩm)",
      data: [3500, 2800, 2700, 2500, 2200, 2000, 1850, 1700, 1500, 1400],
      backgroundColor: [
        "#4CAF50", "#FF0000", "#FFD700", "#FFA500", "#008080",
        "#800000", "#00CED1", "#C0C0C0", "#A52A2A", "#FF69B4"
      ],
      borderRadius: 5,
    },
  ],
};

onMounted(() => {
  if (chartRef.value) {
    myChart = new Chart(chartRef.value, {
      type: "bar",
      data: supermarketData,
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "",
            font: { size: 16, weight: "bold" },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { color: "#000" },
          },
          y: {
            ticks: { color: "#000" },
          },
        },
      },
    });
  }
});

// Hủy biểu đồ khi component bị unmounted
onUnmounted(() => {
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 700px;
  margin: auto;
}
</style>
