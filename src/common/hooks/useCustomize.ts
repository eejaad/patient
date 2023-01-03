import { ParsedUrlQuery } from 'querystring';
import create from 'zustand';

interface Customize {
  showSideBar: boolean;
  headerBrandLogoType: HeaderBrandLogoType;
  showUserProfile: boolean;
  showBrandLogoInHomePage: boolean;
  showPromoteApp: boolean;
  partnerLogo: string;
  showPartnerLogoInPrimaryPlace: boolean;
  partnerTitle: string;
  partnerSubTitle: string;
  showSelectCityInSuggestion: boolean;
  showSeoBoxs: boolean;
  footerType: FooterType;
  showConsultServices: boolean;
}

type Layout = 'default' | 'no-sidebar' | 'basic';
type HeaderBrandLogoType = 'default' | 'compact';
type FooterType = 'default' | 'compact';
type Toggle = 'on' | 'off';

const useCustomize = create<{ customize: Partial<Customize>; setCustomize: (query: ParsedUrlQuery) => void }>(set => ({
  customize: {
    footerType: 'default',
    showPromoteApp: true,
    showUserProfile: true,
    showSideBar: true,
    showSeoBoxs: true,
    showSelectCityInSuggestion: true,
    headerBrandLogoType: 'default',
    partnerLogo: '',
    partnerSubTitle: '',
    partnerTitle: '',
    showBrandLogoInHomePage: false,
    showPartnerLogoInPrimaryPlace: false,
    showConsultServices: true,
  },
  setCustomize: (query: ParsedUrlQuery) => {
    if (!query) return;
    const customize = {
      showSideBar: (query.layout as Layout) !== 'no-sidebar' && (query.layout as Layout) !== 'basic',
      headerBrandLogoType: (query['header:brand-logo-type'] as HeaderBrandLogoType) ?? 'default',
      showUserProfile: (query['header:user-profile'] as Toggle) !== 'off',
      showBrandLogoInHomePage: (query['header:brand-logo-in-home-page'] as Toggle) === 'on' || false,
      showPromoteApp: (query['promote-app'] as Toggle) !== 'off',
      partnerLogo: (query['partner:logo'] as string) || '',
      showPartnerLogoInPrimaryPlace: (query['partner:primary-place'] as Toggle) === 'on',
      partnerTitle: (query['partner:title'] as string) || '',
      partnerSubTitle: (query['partner:sub-title'] as string) || '',
      showSelectCityInSuggestion: (query['suggestion:city-select'] as Toggle) !== 'off',
      showSeoBoxs: (query['seo:show'] as Toggle) !== 'off' && !query.isWebView,
      footerType: (query['footer:type'] as FooterType) ?? 'default',
      showConsultServices: (query['search:consult'] as Toggle) !== 'off',
    };

    return set(state => ({
      ...state,
      customize,
    }));
  },
}));

export default useCustomize;
