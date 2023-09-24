import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useParamsDeconstructor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = Object.fromEntries(urlParams);

    const selectedFilter = query?.selectedFilter || 'category'
    const filter = query?.filter
    const selectedChart = query?.selectedChart
    return {
      query,
      values: {
        selectedFilter,
        filter,
        selectedChart
      }
    }
  }, [location.search]);

  const selectedCountry = useMemo(() => {
    return queryParams?.selectedCountry?.split(',') || [];
  }, [queryParams?.selectedCountry]);

  const selectedCategory = useMemo(() => {
    return queryParams?.selectedCategory?.split(',') || [];
  }, [queryParams?.selectedCategory]);


  const addSearchParams = (urlParams) => {
    navigate({ search: `?${new URLSearchParams(urlParams).toString()}` });
  };

  // const handleRouteChange = useCallback((pathname) => {
  //   navigate({ pathname, search:location.search });
  // }, [navigate, location.search]);

  const handleRouteChange = (pathname, urlParams) => {
    pathname && navigate({ pathname, search: `?${new URLSearchParams(urlParams).toString()}` });
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
    addSearchParams,
    handleRouteChange,
    currentRoute,
    queryParams: queryParams.query,
    ...queryParams.values,
    selectedCountry,
    selectedCategory
    // filter,
  };
};
