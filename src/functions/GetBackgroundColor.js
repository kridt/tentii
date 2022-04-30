export default function ProductPage() {
  const getColor = ["#8E936D", "#FF9900", "#293B66"];

  return getColor[Math.floor(Math.random() * getColor.length + 1)];
}
