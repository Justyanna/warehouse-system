import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	content: {
		width: '100vw',
		height: '100vh',
		backgroundColor: '#515151'
	},

	bar: {
		bottom: '0',
		backgroundColor: '#1a1a1a'
	},

	rooot: {
		paddingLeft: '30px',
		paddingRight: '30px',
		display: 'grid',
		gridTemplateRows: 'auto',
		gridGap: '0.5rem'
	},

	main: {
		marginTop: '40px',
		display: 'grid',
		paddingLeft: '20px',
		gridTemplateColumns: 'repeat(auto-fit, minmax(21rem, 1fr))',
		gridGap: '1rem'
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
