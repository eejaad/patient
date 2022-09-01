import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import Text from '../text';

interface TimerProps {
  target: number;
  className?: string;
  defaultTime: string;
  ended?: (isEnded: boolean) => void;
  start?: (fn: any) => void;
}

const getTimeRemaining = (deadline: Date) => {
  const total = Date.parse(deadline.toString()) - Date.parse(new Date().toString());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  return {
    total,
    hours,
    minutes,
    seconds,
  };
};

export const Timer: React.FC<TimerProps> = props => {
  const { target, className, defaultTime, ended, start } = props;
  const Ref = useRef<any>(null);
  const [timer, setTimer] = useState('00:00:00');

  const startTimer = (deadline: Date) => {
    let { total, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
      return;
    }
    clearInterval(Ref.current);
    ended && ended(true);
  };

  const clearTimer = (deadline: Date) => {
    setTimer(defaultTime);

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + target);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <Text fontWeight="bold" className={clsx('text-secondary', className)}>
      {timer}
    </Text>
  );
};

export default memo(Timer);
