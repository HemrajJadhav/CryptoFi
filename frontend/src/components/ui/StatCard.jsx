import NeoCard from "../common/NeoCard";

const StatCard = ({ title, value, color }) => (
  <NeoCard className={`border-t-5 ${color} `} padding="p-4">
    <h3 className="text-sm font-medium text-gray-500 mb-1 ">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </NeoCard>
);

export default StatCard;
