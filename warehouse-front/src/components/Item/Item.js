import React from 'react';
import { Button, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './styles';
import EmployeeCrudDialog from './../EmployeeCrudDialog';
import api from './../../services/Api';
import { toast } from 'react-toastify';
import UpdateItemDialog from './../updateItemDialog';

const Item = ({ id, name, price, description, producer, refetchItems }) => {
	const classes = useStyles();
	const [ submitting, setSubmitting ] = React.useState(false);
	const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = React.useState(false);
	const [ newName, setNewName ] = React.useState('');
	const [ newPrice, setNewPrice ] = React.useState('');
	const [ newDesccription, setNewDescription ] = React.useState('');
	const [ newProducer, setNewProducer ] = React.useState('');
	const [ isUpdateDialogOpen, setIsUpdateDialogOpen ] = React.useState(false);

	const handleDelete = async () => {
		setSubmitting(true);
		try {
			const token = localStorage.getItem('token');
			await api.delete(`items/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success('Produkt usunięty!');
			refetchItems();
			setSubmitting(false);
		} catch (ex) {
			toast.error('Przepraszamy, coś nie pykło!');
		}
	};

	const handleAccept = async () => {
		const item = {
			id: id,
			name: newName ? newName : name,
			price: newPrice ? newPrice : price,
			description: newDesccription ? newDesccription : description,
			producer: newProducer ? newProducer : producer
		};

		setSubmitting(true);
		if (newName || newPrice || newDesccription || newProducer) {
			try {
				const token = localStorage.getItem('token');
				await api.put(`items/${id}`, item, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success('Dane uaktualnione!');
				refetchItems();
				setNewName('');
				setNewPrice('');
				setNewProducer('');
				setNewDescription('');
			} catch (ex) {
				toast.error('Przepraszamy, coś nie pykło!');
			}
		}
		setSubmitting(false);
	};

	const handleCancelUpdate = () => {
		setIsUpdateDialogOpen(false);
	};

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	return (
		<div>
			<div>
				<Card key={id} className={classes.rooot}>
					<CardHeader title={name} subheader={id} />
					<CardContent>
						Cena: {price}$<br />
						Opis: {description}
						<br />
						Producent: {producer}
					</CardContent>
					<CardActions disableSpacing>
						<div className={classes.buttonBox}>
							<Button
								className={classes.buttonUpdate}
								onClick={() => setIsUpdateDialogOpen(true)}
								variant="contained"
							>
								Popraw
							</Button>
							<Button
								className={classes.buttonDelete}
								onClick={() => setIsConfirmationDialogOpen(true)}
								color="secondary"
								variant="contained"
							>
								Usuń
							</Button>
						</div>
					</CardActions>
				</Card>
				<EmployeeCrudDialog
					submitting={submitting}
					open={isConfirmationDialogOpen}
					handleAccept={handleDelete}
					handleCancel={() => setIsConfirmationDialogOpen(false)}
				/>
				<UpdateItemDialog
					{...{
						name,
						newName,
						setNewName,
						price,
						newPrice,
						setNewPrice,
						description,
						newDesccription,
						setNewDescription,
						producer,
						newProducer,
						setNewProducer,
						handleChange,
						handleAccept,
						handleCancelUpdate,
						isUpdateDialogOpen,
						refetchItems
					}}
				/>
			</div>
		</div>
	);
};

export default Item;
