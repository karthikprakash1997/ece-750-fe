import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useParamsDeconstructor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return Object.fromEntries(urlParams);
  }, [location.search]);

  const addSearchParams = (urlParams) => {
    navigate({ search: `?${new URLSearchParams(urlParams).toString()}` });
  };

  // const handleRouteChange = useCallback((pathname) => {
  //   navigate({ pathname, search:location.search });
  // }, [navigate, location.search]);

  const handleRouteChange = (pathname, urlParams) => {
    pathname &&
      navigate({
        pathname,
        search: `?${new URLSearchParams(urlParams).toString()}`,
      });
  };

  // const currentRoute = useMemo(() => {
  //   return location.pathname;
  // }, [location.pathname]);

  const currentRoute = location.pathname;

  // const filter = useMemo(() => {
  //   if (initialValue) {
  //     const value = filterObjConversion(queryParams, initialValue, accountSelectionList, id, userOwnership);
  //     return value;
  //   }
  // }, [queryParams, id, userOwnership, accountSelectionList, initialValue]);

  return {
    queryParams,
    addSearchParams,
    handleRouteChange,
    currentRoute,
    // filter,
  };
};
