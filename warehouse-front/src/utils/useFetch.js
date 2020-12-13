import React from "react";
import api from "./../services/Api";


const useFetch = (path, defaultData) => {
  const [data, setData] = React.useState(null);
  const [refetchFlag, setRefetchFlag] = React.useState(false);
  const refetch = () => setRefetchFlag(!refetchFlag);


  React.useEffect(() => {
    (async function() {
      try {
         const token = localStorage.getItem("token");
        const response = await api.get(path, {

          headers: { Authorization: `Bearer ${token}` }});
        response && setData(response.data);
      } catch (ex) {
        
      }
    })();
  }, [path, refetchFlag]);

  if (defaultData) {
    return data || defaultData;
  }

  return { data, refetch };
};

export default useFetch;
