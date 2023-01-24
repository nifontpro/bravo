import { VerticalBarChartProps } from './VerticalBarChart.props';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const VerticalBarChart = ({
  objNominees,
  objAwards,
  className,
  ...props
}: VerticalBarChartProps): JSX.Element => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        align: 'start',
        labels: {
          display: true,
          lineWidth: 100,
          color: 'rgba(16, 16, 16, 0.5)',
          font: {
            size: 22,
          },
          usePointStyle: true,
          pointStyleWidth: 32,
        },
      },
    },
  };

  const labels = Object.keys(objAwards)

  const data = {
    labels,
    datasets: [
      {
        label: 'Медали',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: Object.values(objAwards),
        backgroundColor: '#E5F23B',
      },
      {
        label: 'Номинации',
        data: Object.values(objNominees),
        backgroundColor: '#101010',
      },
    ],
  };

  return (
    <div className={className} {...props}>
      <Bar  data={data} />
    </div>
  );
};
export default VerticalBarChart;
