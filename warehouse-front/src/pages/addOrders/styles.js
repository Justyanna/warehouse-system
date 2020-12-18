import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	content: {
		width: '100vw',
		height: '100vh',
		backgroundColor: '#515151'
	},
	box: {
		margin: '10vw',
		width: '80vw'
	},
	bar: {
		bottom: '0',
		backgroundColor: '#1a1a1a'
	},

	lodaer: {
		margin: 'auto'
	},

	root: {
		margin: 'auto'
	},

	paper: {
		width: 400,
		height: 430,
		overflow: 'auto'
	}
}));

export default useStyles;
