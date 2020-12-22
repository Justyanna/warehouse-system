import React from 'react';
import api from './../services/Api';

const useFetchTasks = () => {
	const [ data, setData ] = React.useState(null);
	const [ refetchFlag, setRefetchFlag ] = React.useState(false);
	const refetch = () => setRefetchFlag(!refetchFlag);

	React.useEffect(
		() => {
			(async function() {
				try {
					const token = localStorage.getItem('token');
					const response = await api.post(`/api/auth/tasks`, token, {
						headers: { Authorization: `Bearer ${token}` }
					});

					response && setData(response.data);
				} catch (ex) {}
			})();
		},
		[ refetchFlag ]
	);

	return { data, refetch };
};

export default useFetchTasks;
