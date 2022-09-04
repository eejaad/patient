import { memo } from 'react';

interface Props extends React.SVGAttributes<SVGElement> {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}
// eslint-disable-next-line react/display-name
export const UserCircle = memo(({ color = '#3f3f79', width = '24', height = '24', className = '', ...rest }: Props) => {
  return (
    <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...rest}>
      <title>icon</title>
      <path
        d="M9.70227 15.75H14.2977V14.25H9.70227V15.75ZM14.2977 15.75C15.9282 15.75 17.25 17.0718 17.25 18.7023H18.75C18.75 16.2433 16.7567 14.25 14.2977 14.25V15.75ZM9.70227 14.25C7.24335 14.25 5.25 16.2433 5.25 18.7023H6.75C6.75 17.0718 8.07178 15.75 9.70227 15.75V14.25ZM14.25 9C14.25 10.2426 13.2426 11.25 12 11.25V12.75C14.0711 12.75 15.75 11.0711 15.75 9H14.25ZM12 11.25C10.7574 11.25 9.75 10.2426 9.75 9H8.25C8.25 11.0711 9.92893 12.75 12 12.75V11.25ZM9.75 9C9.75 7.75736 10.7574 6.75 12 6.75V5.25C9.92893 5.25 8.25 6.92893 8.25 9H9.75ZM12 6.75C13.2426 6.75 14.25 7.75736 14.25 9H15.75C15.75 6.92893 14.0711 5.25 12 5.25V6.75ZM20.25 12C20.25 16.5563 16.5563 20.25 12 20.25V21.75C17.3848 21.75 21.75 17.3848 21.75 12H20.25ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM3.75 12C3.75 7.44365 7.44365 3.75 12 3.75V2.25C6.61522 2.25 2.25 6.61522 2.25 12H3.75ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75Z"
        fill={color}
      ></path>
    </svg>
  );
});

export default memo(UserCircle);
