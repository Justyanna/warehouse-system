import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	rooot: {
		minWidth: '200px',
		maxWidth: '370px',
		backgroundColor: '#d6d6d6',
		color: 'black',
		height: '250px',
		spacing: 1
	},

	buttonBox: {
		marginLeft: 'auto'
	},

	buttonDelete: {
		backgroundColor: '#bd4848',
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
