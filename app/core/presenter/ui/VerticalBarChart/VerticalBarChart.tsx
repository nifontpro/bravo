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
          usePointStyle: true,
          pointStyleWidth: 16,
          useBorderRadius: true,
          borderRadius: 16
        },
      },
    },
  };

  const labels = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Медали',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor: '#E5F23B',
      },
      {
        label: 'Номинации',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        backgroundColor: '#101010',
      },
    ],
  };

  return (
    <div className={className} {...props}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default VerticalBarChart;
