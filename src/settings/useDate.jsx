import { useSelector } from 'react-redux';
import { selectAppSettings } from '@/redux/settings/selectors';

const useDate = () => {
  const app_settings = useSelector(selectAppSettings);
  const dateFormat = app_settings?.idurar_app_date_format ?? 'MM/DD/YYYY';
  return {
    dateFormat,
  };
};

export default useDate;
