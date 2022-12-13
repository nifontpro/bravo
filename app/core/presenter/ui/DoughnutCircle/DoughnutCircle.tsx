import styles from './DoughnutCircle.module.scss';
import cn from 'classnames';
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

  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        // label: '# of Votes',
        data: [dataOne, dataTwo],
        backgroundColor: [
          `${colorOne}`,
          `${colorTwo}`,
        ],
        borderColor: [
          `${colorOne}`,
          `${colorTwo}`,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={className} {...props}>
      <Doughnut data={data} />
    </div>
  );
};
export default DoughnutCircle;
