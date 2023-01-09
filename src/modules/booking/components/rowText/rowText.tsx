import Text from '@/common/components/atom/text/text';
import clsx from 'clsx';

interface RowTextProps {
  title: string;
  value: string | any;
  className?: string;
  titleFontWeight: 'bold' | 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'extraBold' | 'black';
  titleFontSize: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  valueFontWeight: 'bold' | 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'extraBold' | 'black';
  valueFontSize: 'base' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}

export const RowText = (props: RowTextProps) => {
  const { title, value, className, titleFontWeight, titleFontSize, valueFontWeight, valueFontSize } = props;

  return (
    <div className={clsx('flex items-center justify-between space-s-3', className)}>
      <Text className="whitespace-nowrap" fontWeight={titleFontWeight} fontSize={titleFontSize}>
        {title}
      </Text>
      <Text fontWeight={valueFontWeight} fontSize={valueFontSize} className="text-end">
        {value}
      </Text>
    </div>
  );
};

export default RowText;
