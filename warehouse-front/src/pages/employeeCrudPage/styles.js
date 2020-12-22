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
		paddingLeft: '20px',
		paddingRight: '20px',
		display: 'grid',
		gridTemplateRows: 'auto',
		gridGap: '0.5rem'
	},

	main: {
		paddingLeft: '35px',
		paddingRight: '35px',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
		gridGap: '1rem',
		marginTop: '40px'
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
