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
		width: ' 350px',
		height: '430px',
		overflow: 'auto'
	}
}));

export default useStyles;
