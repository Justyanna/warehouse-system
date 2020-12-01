import React from "react";
import api from "./../services/Api.js";

const CustomHook = (path, body) => {
  const [data, setData] = React.useState(null);

  const [refetchFlag, setRefetchFlag] = React.useState(false);
  const refetch = () => setRefetchFlag(!refetchFlag);

  React.useEffect(() => {
    (async function () {
      try {
        const response = await api.get(path);
        response && setData(response.data);
      } catch (ex) {
        console.log(ex);
      }
    })();
  }, [path, refetchFlag]);

  if (body) {
    return data || body;
  }

  return { data, refetch };
};

export default CustomHook;
