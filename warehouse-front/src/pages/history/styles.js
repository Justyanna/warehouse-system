import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	content: {
		width: '100vw',
		height: '100vh',
		backgroundColor: '#515151'
	},

	search: {
		backgroundColor: 'white',
		margin: '10px',
		padding: '20px',
		borderRadius: '25px',

		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
		gridGap: '1rem'
	},

	bar: {
		bottom: '0',
		backgroundColor: '#1a1a1a'
	},

	rooot: {
		paddingLeft: '40px',
		paddingRight: '40px',
		display: 'grid',
		gridTemplateRows: 'auto',
		gridGap: '0.5rem'
	},

	main: {
		marginTop: '10vh',
		display: 'grid',
		paddingLeft: '20px',
		gridTemplateColumns: 'repeat(auto-fit, minmax(21rem, 1fr))',
		gridGap: '1rem'
	},

	add: {
		color: 'white',
		marginLeft: '20px'
	},

	role: {
		marginTop: '8px'
	},
	empty: {
		padding: '10%',
		backgroundColor: 'white',
		textAlign: 'center',
		opacity: 0.5
	},

	loader: {
		marginTop: '45vh',
		marginLeft: '49vw',
		marginRight: '45vw'
	}
}));

export default useStyles;
