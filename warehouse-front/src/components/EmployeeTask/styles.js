import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	rooot: {
		minWidth: '200px',
		maxWidth: '400px',
		backgroundColor: '#d6d6d6',
		color: 'black',

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
		backgroundColor: '#6a8f68',
		color: 'black'
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
