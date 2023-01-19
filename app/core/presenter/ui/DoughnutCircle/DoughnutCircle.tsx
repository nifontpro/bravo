import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DoughnutCircleProps } from './DoughnutCircle.props';

const DoughnutCircle = ({
  dataOne,
  dataTwo,
  colorOne,
  colorTwo,
  className,
  ...props
}: DoughnutCircleProps): JSX.Element => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    plugins: {
      legend: {}
    },
  };

  const data = {
    datasets: [
      {
        data: [dataOne, dataTwo],
        backgroundColor: [`${colorOne}`, `${colorTwo}`],
        borderColor: [`${colorOne}`, `${colorTwo}`],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={className} {...props}>
      <Doughnut options={options} data={data} />
    </div>
  );
};
export default DoughnutCircle;
