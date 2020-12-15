import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	rooot: {
		minWidth: '350px',
		maxWidth: '360px',
		backgroundColor: '#d6d6d6',
		color: 'black',
		height: '280px',
		spacing: 1
	},

	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},

	buttonBox: {
		marginLeft: 'auto'
	},

	buttonDelete: {
		backgroundColor: '#bd4848',
		color: 'black'
	},

	buttonRealized: {
		backgroundColor: '#9b88d1',
		color: 'black',
		marginRight: '10px'
	},

	buttonUpdate: {
		backgroundColor: '#6a8f68',
		marginRight: '10px',
		color: 'black'
	},

	avatar: {
		backgroundColor: 'white'
	}
}));

export default useStyles;
