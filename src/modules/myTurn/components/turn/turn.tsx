import Card from '@/components/atom/card';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import TurnBody from './body';
import TurnFooter from './footer';
import TurnHeader from './header';
import { turnDetailsData } from './turnDetails';
import type { TurnProps } from './turnType';

export const Turn: React.FC<TurnProps> = props => {
  const { status, doctorInfo, paymentStatus, turnDetails, location, feedbackUrl, prescription, centerType, patientInfo, centerInfo, id } =
    props;
  const { t } = useTranslation();

  const detailsData = useMemo(
    () =>
      turnDetailsData({
        data: turnDetails,
        centerType,
        status,
        paymentStatus,
        activePaymentStatus: centerInfo.activePaymentStatus,
        translate: t,
      }),
    [turnDetails, status, centerType],
  );

  return (
    <Card
      className="space-y-2 md:shadow-none !rounded-none md:!rounded-lg md:border border-solid border-slate-200 relative"
      data-testid="turn-card"
    >
      <TurnHeader
        id={id}
        doctorInfo={doctorInfo}
        centerType={centerType}
        centerId={centerInfo.centerId}
        trackingCode={turnDetails.trackingCode}
        nationalCode={patientInfo.nationalCode}
        doctorName={`${doctorInfo.firstName} ${doctorInfo.lastName}`}
        expertise={doctorInfo.expertise ?? 'سایر'}
        phoneNumber={patientInfo.cell}
        status={status}
      />

      <TurnBody
        id={id}
        doctorInfo={doctorInfo}
        centerId={centerInfo.centerId}
        centerType={centerType}
        detailsData={detailsData}
        location={location}
        feedbackUrl={feedbackUrl}
        status={status}
      />

      <TurnFooter
        id={id}
        centerType={centerType}
        centerId={centerInfo.centerId}
        trackingCode={turnDetails.trackingCode}
        nationalCode={patientInfo.nationalCode}
        doctorName={`${doctorInfo.firstName} ${doctorInfo.lastName}`}
        expertise={doctorInfo.expertise ?? 'سایر'}
        phoneNumber={patientInfo.cell}
        pdfLink={prescription?.pdf}
        slug={doctorInfo.slug}
        status={status}
        hasPaging={centerInfo.hasPaging}
        bookTime={turnDetails.bookTime}
        onlineVisitChannels={doctorInfo.onlineVisitChannels}
      />
    </Card>
  );
};

export default Turn;
