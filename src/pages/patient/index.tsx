import Head from 'next/head';

import Avatar from '@/common/components/atom/avatar';
import Skeleton from '@/common/components/atom/skeleton';
import Text from '@/common/components/atom/text';
import BookmarkIcon from '@/common/components/icons/bookmark';
import CalenderIcon from '@/common/components/icons/calender';
import DoctorIcon from '@/common/components/icons/doctor';
import EditIcon from '@/common/components/icons/edit';
import HeadphoneIcon from '@/common/components/icons/headphone';
import LogoutIcon from '@/common/components/icons/logout';
import ShareIcon from '@/common/components/icons/share';
import UsersIcon from '@/common/components/icons/users';
import AppBar from '@/common/components/layouts/appBar';
import { LayoutWithHeaderAndFooter } from '@/common/components/layouts/layoutWithHeaderAndFooter';
import { withCSR } from '@/common/hoc/withCsr';
import useApplication from '@/common/hooks/useApplication';
import useCustomize from '@/common/hooks/useCustomize';
import useShare from '@/common/hooks/useShare';
import { useLoginModalContext } from '@/modules/login/context/loginModal';
import { useUserInfoStore } from '@/modules/login/store/userInfo';
import config from 'next/config';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next/types';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '../_app';
const { publicRuntimeConfig } = config();

export const PatinetProfile: NextPageWithLayout = () => {
  const userInfo = useUserInfoStore(state => state.info);
  const loginPending = useUserInfoStore(state => state.pending);
  const isLogin = useUserInfoStore(state => state.isLogin);
  const { handleOpenLoginModal } = useLoginModalContext();
  const isApplication = useApplication();
  const share = useShare();
  const { customize } = useCustomize();

  useEffect(() => {
    !isLogin &&
      !loginPending &&
      handleOpenLoginModal({
        state: true,
      });
  }, [isLogin, loginPending]);

  return (
    <>
      <Head>
        <title>ویرایش اطلاعات من</title>
      </Head>

      {isApplication && <AppBar title="پروفایل من" />}

      <div>
        <Link href="/patient/profile?referrer=profile">
          <a>
            <div className="flex items-center p-5 bg-white border-t shadow-sm space-s-5 border-slate-200">
              <Avatar name={`${userInfo.name ?? ''} ${userInfo.family ?? ''}`} src={userInfo.image ?? ''} />
              <div className="flex flex-col space-y-2">
                {loginPending ? (
                  <>
                    <Skeleton h="1rem" w="8rem" rounded="full" />
                    <Skeleton h="1rem" rounded="full" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Text fontWeight="bold" className="line-clamp-1">
                        {userInfo.name} {userInfo.family}
                      </Text>
                      <EditIcon className="w-5 h-5" />
                    </div>
                    <Text fontSize="sm">{userInfo.username}</Text>
                  </>
                )}
              </div>
            </div>
          </a>
        </Link>
        <div className="flex flex-col mt-2 bg-white shadow-sm">
          <Link href="/patient/appointments?referrer=profile">
            <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
              <CalenderIcon />
              <Text fontWeight="medium">نوبت های من</Text>
            </a>
          </Link>
          {customize.bookMark && (
            <Link href="/patient/bookmarks?referrer=profile">
              <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
                <BookmarkIcon />
                <Text fontWeight="medium">لیست پزشکان من</Text>
              </a>
            </Link>
          )}
          <Link href="/patient/subuser?referrer=profile">
            <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
              <UsersIcon />
              <Text fontWeight="medium">کاربران زیرمجموعه</Text>
            </a>
          </Link>
        </div>
        <div className="flex flex-col mt-2 bg-white shadow-sm">
          <Link href={`${publicRuntimeConfig.CLINIC_BASE_URL}/home/support-form/`}>
            <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
              <HeadphoneIcon />
              <Text fontWeight="medium">پشتیبانی</Text>
            </a>
          </Link>
          {customize.showSupplierRegister && (
            <Link href={`${publicRuntimeConfig.CLINIC_BASE_URL}/home/fordoctors/`}>
              <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
                <DoctorIcon />
                <Text fontWeight="medium">پزشک یا منشی هستید؟</Text>
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-col mt-2 bg-white shadow-sm">
          {customize.showShareApp && (
            <div
              className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100"
              onClick={() => {
                share({ url: 'https://www.paziresh24.com/app' });
              }}
            >
              <ShareIcon />
              <Text fontWeight="medium">معرفی پذیرش24 به دوستان</Text>
            </div>
          )}
          <Link href={`${publicRuntimeConfig.CLINIC_BASE_URL}/logout`}>
            <a className="flex items-center px-5 py-4 border-b space-s-3 whitespace-nowrap border-slate-100">
              <LogoutIcon />
              <Text fontWeight="medium">خروج</Text>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

PatinetProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutWithHeaderAndFooter {...page.props.config} showFooter={false}>
      {page}
    </LayoutWithHeaderAndFooter>
  );
};

export const getServerSideProps = withCSR(async (context: GetServerSidePropsContext) => {
  return {
    props: {
      query: context.query,
    },
  };
});

export default PatinetProfile;
