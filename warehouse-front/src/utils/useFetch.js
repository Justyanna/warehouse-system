import React from 'react';
import api from './../services/Api';
import { toast } from 'react-toastify';

const useFetch = (path, defaultData) => {
	const [ data, setData ] = React.useState(null);
	const [ refetchFlag, setRefetchFlag ] = React.useState(false);
	const refetch = () => setRefetchFlag(!refetchFlag);

	React.useEffect(
		() => {
			(async function() {
				try {
					const token = localStorage.getItem('token');
					const response = await api.get(path, {
						headers: { Authorization: `Bearer ${token}` }
					});

					response && setData(response.data);
				} catch (ex) {
					toast.error('Coś poszło źle, wróć tu jutro!');
				}
			})();
		},
		[ path, refetchFlag ]
	);

	if (defaultData) {
		return data || defaultData;
	}

	return { data, refetch };
};

export default useFetch;
