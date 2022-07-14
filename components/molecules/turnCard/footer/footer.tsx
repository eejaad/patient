// import Modal from "@paziresh24/shared/ui/modal";
import { Button } from "../../../atoms/button/button";
import { useState } from "react";
import ChatIcon from "@/components/icons/chat";
import MegaphoneIcon from "@/components/icons/megaphone";
import Queue from "../../queue";
import { BookStatus } from "@/types/bookStatus";
import { CenterType } from "@/types/centerType";
import { isToday } from "@/utils/isToday";
import Modal from "@/components/atoms/modal";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface TurnFooterProps {
  id: string;
  slug: string;
  status: BookStatus;
  pdfLink?: string;
  centerType: CenterType;
  hasPaging: boolean;
  bookTime: number;
  whatsapp?: string;
}

export const TurnFooter: React.FC<TurnFooterProps> = (props) => {
  const { id, slug, status, pdfLink, centerType, hasPaging, bookTime, whatsapp } = props;
  const [queueModal, setQueueModal] = useState(false);

  const isBookForToday = isToday(new Date(bookTime));

  const showPrescription = () => {
    window.open(`${publicRuntimeConfig.PRESCRIPTION_API}/pdfs/${pdfLink}`);
  };

  const reBook = () => {
    window.open(`${publicRuntimeConfig.CLINIC_BASE_URL}/dr/${slug}`);
  };

  const ClinicPrimaryButton = hasPaging && (
    <Button
      variant="secondary"
      size="sm"
      block={true}
      onClick={() => setQueueModal(true)}
      icon={<MegaphoneIcon color="#0077DB" />}
      data-testid="footer__queue_button"
    >
      دریافت شماره نوبت
    </Button>
  );

  const CunsultPrimaryButton = (
    <Button
      variant="secondary"
      size="sm"
      block={true}
      onClick={() => window.open(`https://wa.me/98${whatsapp}`)}
      icon={<ChatIcon color="#0077DB" />}
    >
      گفتگو با پزشک
    </Button>
  );

  return (
    <>
      {status === BookStatus.notVisited &&
        (centerType === CenterType.consult ? CunsultPrimaryButton : ClinicPrimaryButton)}

      {(status === BookStatus.expired ||
        status === BookStatus.visited ||
        status === BookStatus.deleted ||
        status === BookStatus.rejected) && (
        <div className="flex gap-2">
          {isBookForToday && ClinicPrimaryButton}
          <Button variant="secondary" size="sm" block={true} onClick={reBook}>
            دریافت نوبت مجدد
          </Button>
          {pdfLink && (
            <Button variant="secondary" size="sm" block={true} onClick={showPrescription}>
              مشاهده نسخه
            </Button>
          )}
        </div>
      )}

      <Modal onClose={setQueueModal} isOpen={queueModal} bodyClassName="p-0" noHeader>
        <Queue bookId={id} />
      </Modal>
    </>
  );
};

export default TurnFooter;
