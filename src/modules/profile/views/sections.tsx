import Skeleton from '@/common/components/atom/skeleton/skeleton';
import Text from '@/common/components/atom/text/text';
import AddIcon from '@/common/components/icons/add';
import SuccessIcon from '@/common/components/icons/success';
import { convertLongToCompactNumber } from '@/common/utils/convertLongToCompactNumber';
import config from 'next/config';
import dynamic from 'next/dynamic';

const { publicRuntimeConfig } = config();

const AwardIcon = dynamic(() => import('@/common/components/icons/award'));
const ChatIcon = dynamic(() => import('@/common/components/icons/chat'));
const EditButton = dynamic(() => import('../components/viewAs/editButton'));
const Activity = dynamic(() => import('./activity'), {
  loading(loadingProps) {
    return <Skeleton w="100%" h="8rem" rounded="lg" />;
  },
});
const Biography = dynamic(() => import('./biography'), {
  loading(loadingProps) {
    return <Skeleton w="100%" h="16rem" rounded="lg" />;
  },
});
const OwnPage = dynamic(() => import('./ownPage'), {
  loading(loadingProps) {
    return <Skeleton w="100%" h="8rem" rounded="lg" />;
  },
});
const Gallery = dynamic(() => import('./gallery'), {
  loading(loadingProps) {
    return <Skeleton w="100%" h="8rem" rounded="lg" />;
  },
});
const RateReview = dynamic(() => import('./rateReview'), {
  loading(loadingProps) {
    return <Skeleton w="100%" h="30rem" rounded="lg" />;
  },
});
const ProfileSeoBox = dynamic(() => import('./seoBox'));

export const sections = ({
  information,
  centers,
  expertises,
  feedbacks,
  media,
  history,
  symptomes,
  similarLinks,
  isBulk,
  customize,
  editable,
  handleViewAs,
  seo,
}: any) =>
  [
    // Own Page
    {
      isShow: isBulk && !customize?.partnerKey,
      function: () => {
        return {
          fullname: information.display_name,
        };
      },
      children: (props: any) => <OwnPage {...props} />,
    },
    // About
    {
      title: 'درباره من',
      id: 'about-me',
      ActionButton: editable && information.biography && <EditButton onClick={() => handleViewAs('biography')} />,
      isShow: information.biography,
      isShowFallback: !information.biography && editable,
      function: () => {
        const { biography } = information;
        return {
          content: biography,
        };
      },
      children: (props: any) => <Biography className="bg-white md:rounded-lg" {...props} />,
      fallback: (props: any) => (
        <div
          onClick={() => handleViewAs('biography')}
          className="flex items-center justify-center p-5 mx-4 transition-all border-2 border-dashed rounded-lg cursor-pointer md:mx-0 hover:bg-slate-200/30 space-s-2 text-slate-400 border-slate-200"
        >
          <AddIcon className="w-5 h-5" />
          <Text fontWeight="medium">نوشتن بیوگرافی</Text>
        </div>
      ),
    },
    // Video
    {
      isShow: media.aparat && media.aparat !== '0',
      children: (props: any) => <div className="overflow-hidden md:rounded-lg" dangerouslySetInnerHTML={{ __html: media.aparat }} />,
    },
    // Gallery
    {
      title: 'گالری',
      ActionButton: editable && information.biography && <EditButton onClick={() => handleViewAs('gallery')} />,
      isShow: customize.showGalleryProfile && media.gallery.length > 0,
      isShowFallback: editable,
      function: () => {
        const items = media.gallery;
        const reformattedItems = items?.map((item: any) => publicRuntimeConfig.CLINIC_BASE_URL + item.image) ?? [];
        return {
          items: reformattedItems,
        };
      },
      children: (props: any) => <Gallery className="bg-white md:rounded-lg" {...props} />,
      fallback: (props: any) => (
        <div
          onClick={() => handleViewAs('gallery')}
          className="flex items-center justify-center p-5 mx-4 transition-all border-2 border-dashed rounded-lg cursor-pointer md:mx-0 hover:bg-slate-200/30 space-s-2 text-slate-400 border-slate-200"
        >
          <AddIcon className="w-5 h-5" />
          <Text fontWeight="medium">افزودن تصویر</Text>
        </div>
      ),
    },
    // Activity
    {
      title: `فعالیت ها`,
      isShow: customize.showActivityProfile,
      function: () => {
        return {
          items: [
            history.count_of_consult_books && {
              icon: <ChatIcon className="min-w-fit w-max" />,
              text: `<b>${history.count_of_consult_books}</b> مشاوره فعال`,
            },
            history.deleted_books_rate && {
              icon: <SuccessIcon className="min-w-fit w-6 h-6" />,
              text: `<b>${history.deleted_books_rate}</b> ویزیت آنلاین موفق`,
              hint: 'این شاخص براساس تعداد ویزیت آنلاینی که پس از زمان نوبت با موفقیت انجام شده‌اند و حذف نشده‌اند محاسبه می‌شود.',
            },
            {
              icon: <AwardIcon className="min-w-fit w-max" />,
              text: `پذیرش24 بیش از ${history.insert_at_age} افتخار میزبانی از صفحه اختصاصی ${information.display_name} را داشته است.`,
            },
          ].filter(Boolean),
        };
      },
      children: (props: any) => <Activity className="bg-white md:rounded-lg" {...props} />,
    },
    // Reviews
    {
      id: 'reviews',
      title: `نظرات در مورد ${information.display_name}`,
      isShow: customize.showRateAndReviews,
      function: () => {
        const doctorInfo = {
          center: centers
            .filter((center: any) => center.id !== '5532')
            .map((center: any) => center && { id: center.id, name: center.name }),
          id: information.id,
          name: information.display_name,
          image: information.image,
          group_expertises: expertises.group_expertises[0].name ?? 'سایر',
          group_expertises_slug: expertises.group_expertises[0].en_slug ?? 'other',
          expertise: expertises?.expertises?.[0]?.alias_title,
          slug: seo.slug,
          city: centers.map((center: any) => center.city),
          server_id: information.server_id,
        };

        const rateDetails = {
          satisfaction: feedbacks.details?.satisfaction,
          count: feedbacks.details.number_of_feedbacks,
          information: [
            {
              id: 1,
              title: 'برخورد مناسب پزشک',
              satisfaction: feedbacks.details.doctor_encounter * 20,
              avg_star: feedbacks.details.doctor_encounter,
            },
            {
              id: 2,
              title: 'توضیح پزشک در هنگام ویزیت',
              satisfaction: feedbacks.details.explanation_of_issue * 20,
              avg_star: feedbacks.details.explanation_of_issue,
            },
            {
              id: 3,
              title: 'مهارت و تخصص پزشک',
              satisfaction: feedbacks.details.quality_of_treatment * 20,
              avg_star: feedbacks.details.quality_of_treatment,
            },
          ],
        };
        return {
          doctor: doctorInfo,
          rateDetails,
          feedbacks: feedbacks.feedbacks,
          serverId: information.server_id,
          symptomes: symptomes?.slice?.(0, 5) ?? [],
        };
      },
      children: (props: any) => <RateReview {...props} />,
    },
    // Seo Box
    {
      isShow: customize.showSeoBoxs,
      function: () => {
        const center = centers.find((item: any) => item?.center_type === 1);
        const about = `<p>${information.display_name}، ${
          expertises?.expertises?.[0]?.degree_name + ' ' + expertises?.group_expertises?.[0]?.name ?? 'سایر'
        } در شهر ${center?.city} است. مطب ${information.display_name} در ${
          center?.address
        } واقع شده است که در صورت نیاز می‌توانید با شماره <span>${center?.display_number_array[0] ?? ''}</span> تماس بگیرید.</p>
        <p>تاکنون   ${convertLongToCompactNumber(history?.count_of_page_view) ?? 0} نفر از پروفایل ${information?.display_name}، ${
          expertises?.expertises[0]?.degree_name + ' ' + expertises?.group_expertises?.[0].name ?? 'سایر'
        }  بازدید کرده‌اند؛ همچنین ${feedbacks?.details?.satisfaction ?? 0}٪ مراجعین (${
          feedbacks?.details?.number_of_feedbacks ?? 0
        }نظر ثبت شده) از ایشان رضایت داشته‌اند و ${' ' + feedbacks?.details?.like ?? 0} نفر این پزشک را توصیه کرده‌اند. <b>نظرات ${
          information?.display_name
        }</b> در پروفایل دکتر در پذیرش۲۴  قابل مشاهده است.</p>
        ${
          center.freeturn_text
            ? `<p>زودترین زمان رزرو نوبت ${center?.freeturn_text} ${center?.name} می‌باشد که می‌توانید از طریق وبسایت و یا اپلیکیشن نوبت‌دهی پذیرش۲۴ نوبت خود را به صورت اینترنتی و غیرحضوری دریافت کنید.</p>`
            : ''
        }
        <p>اگر زمان کافی برای مراجعه حضوری به پزشک مورد نظر خود را ندارید، به پروفایل پزشک در پذیرش۲۴ سری بزنید و در صورت فعال بودن خدمات ویزیت آنلاین ایشان، نوبت ویزیت آنلاین خود را دریافت کنید؛ در غیر این‌صورت می‌توانید از سایر پزشکان ${
          'متخصص ' + expertises.group_expertises?.[0].name ?? 'سایر'
        } <a href="/consult" class="text-primary"> ویزیت آنلاین (تلفنی و متنی)</a> نوبت بگیرید.</p>
        <p>در صورت نیاز به عکس و بیوگرافی و <b>آدرس اینستاگرام ${
          information.display_name
        }</b>، کانال تلگرام و وبسایت ایشان، اطلاعات موجود در پروفایل ایشان را مشاهده نمایید.</p>
        <ui>
        <li>آدرس ${center?.name}: ${center.city + '، ' + center?.address ?? 'ثبت نشده'}</li>
        <li>تلفن ${center?.name}: ${center?.display_number_array[0] ?? 'ثبت نشده'}</li>
        <li>تخصص ${information?.display_name}: ${expertises.expertises[0]?.alias_title ?? expertises.expertises[0]?.name}</li>
        </ui>
        `;

        return {
          similarLinks: similarLinks?.map((item: any) => ({ name: item.caption, url: item.link })),
          about,
          breadcrumbs: seo.breadcrumbs,
        };
      },
      children: (props: any) => <ProfileSeoBox {...props} />,
    },
  ] as const;
