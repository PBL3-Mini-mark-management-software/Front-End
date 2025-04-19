<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartRef = ref(null);
let myChart = null;

// Dữ liệu doanh thu tuần trước và tuần này (đơn vị: triệu VND)
const revenueData = {
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
  datasets: [
    {
      label: "Tuần trước",
      data: [12, 15, 10, 20, 18, 25, 30],
      backgroundColor: "rgba(255, 99, 132, 0.6)", // Màu đỏ nhạt
    },
    {
      label: "Tuần này",
      data: [14, 18, 13, 22, 20, 28, 35],
      backgroundColor: "rgba(54, 162, 235, 0.6)", // Màu xanh nhạt
    },
  ],
};

onMounted(() => {
  if (chartRef.value) {
    myChart = new Chart(chartRef.value, {
      type: "bar",
      data: revenueData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: "Doanh Thu Siêu Thị Mini - So Sánh Tuần Này & Tuần Trước",
            font: { size: 16, weight: "bold" },
          },
        },
        scales: {
          x: { ticks: { color: "#000" } },
          y: {
            beginAtZero: true,
            ticks: { color: "#000", callback: (value) => `${value} triệu` },
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
  max-width: 800px;
  margin: auto;
}
</style>
