import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	content: {
		width: '100vw',
		height: '100vh',
		backgroundColor: '#515151'
	},
	box: {
		margin: '5vw'
	},

	bar: {
		bottom: '0',
		backgroundColor: '#1a1a1a'
	},

	save: {
		backgroundColor: 'white',
		marginTop: '100px'
	},

	button: {
		backgroundColor: 'white'
	},

	list: {
		paddingLeft: '90px',
		width: ' 500px',
		height: '600px',
		overflow: 'auto'
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
