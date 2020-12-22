import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	rooot: {
		minWidth: '350px',
		maxWidth: '360px',
		backgroundColor: '#d6d6d6',
		color: 'black',
		height: '250px',
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
		backgroundColor: '#ff584d',
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
