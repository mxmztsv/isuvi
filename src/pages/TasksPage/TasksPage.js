import {
	Box,
	Breadcrumbs,
	Button,
	CssBaseline,
	CssVarsProvider,
	DialogContent,
	DialogTitle, FormControl, FormLabel, Input,
	Link, Stack,
	Typography, Select, Option, Textarea
} from "@mui/joy";
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRoundedIcon';
import {OrderList, OrderTable} from '../../components'
import {orders, tasksStub} from "../../components/OrdersTable/dataExample";
import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";

const freeAgentsStub = [
	{
		"id": 1,
		"login": "test_login",
		"name": "Юрий",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
	{
		"id": 2,
		"login": "test_login",
		"name": "Юрий1",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
	{
		"id": 3,
		"login": "test_login",
		"name": "Юрий2",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
	{
		"id": 4,
		"login": "test_login",
		"name": "Юрий3",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
]

export const TasksPage = () => {

	const [open, setOpen] = useState(false);
	const [freeAgents, setFreeAgents] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [selectedCataclysmId, setSelectedCataclysmId] = useState(null);

	const {handleSubmit, control, reset} = useForm({
		defaultValues: {
			description: '',
			executorId: '',
		}
	})

	const onSubmit = async data => {
		const payload = {cataclysmId: selectedCataclysmId, ...data}
		console.log(payload)
		// request('/account/sign-in', 'POST', data).then((userData) => {
		// 	login(userData)
			toast.success('Вход в аккаунт выполнен')
		// })
	}

	const handleClose = () => {
		setOpen(false)
		reset()
	}

	const handleOpen = (id) => {
		setOpen(true)
		setSelectedCataclysmId(id)
	}



	useEffect(() => {
		setFreeAgents(freeAgentsStub);
		setTasks(tasksStub)
	}, []);


	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline/>
			<Box sx={{display: 'flex', minHeight: '100dvh'}}>
				{/*<Header />*/}
				{/*<Sidebar />*/}
				<Box
					component="main"
					className="MainContent"
					sx={{
						px: {xs: 2, md: 6},
						pt: {
							xs: 'calc(12px + var(--Header-height))',
							sm: 'calc(12px + var(--Header-height))',
							md: 3,
						},
						pb: {xs: 2, sm: 2, md: 3},
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						minWidth: 0,
						height: '100dvh',
						gap: 1,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							mb: 1,
							gap: 1,
							flexDirection: {xs: 'column', sm: 'row'},
							alignItems: {xs: 'start', sm: 'center'},
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}
					>
						<Typography level="h2" component="h1">
							Задания
						</Typography>
						<Button
							color="primary"
							startDecorator={<Add/>}
							size="sm"
							variant="soft"
							onClick={() => setOpen(true)}
						>
							Создать задание
						</Button>
					</Box>
					<OrderTable rows={tasks} handleOpenEditModal={handleOpen}/>
					{/*<OrderList listItems={orders}/> TODO: адаптив*/}
					<Modal open={open} onClose={handleClose} variant="soft">
						<ModalDialog>
							<DialogTitle>Редактирование задания</DialogTitle>
							{/*<DialogContent>Fill in the information of the project.</DialogContent>*/}
							<form
								// onSubmit={(event) => {
								// 	// event.preventDefault();
								// 	setOpen(false);
								// 	handleSubmit(onSubmit);
								// }}
								onSubmit={handleSubmit(onSubmit)}
							>
								<Stack spacing={2}>
									<Controller
										name={"description"}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Описание</FormLabel>
												<Textarea minRows={3} autoFocus required value={value} onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"executorId"}
										rules={{required: true}}
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl fullwidth>
												<FormLabel>Исполнитель</FormLabel>
												<Select
													onChange={(e, newValue) => {
														onChange(newValue);
													}}
													value={value ? value : ""}
												>
													{freeAgents.map(agent => <Option
														value={agent.id}
														label={agent.name}
														key={agent.id}>{agent.name}</Option>)}
												</Select>
											</FormControl>
										)}
									/>
									<Stack direction="row" spacing={2}>
										<Button type="submit" variant="soft">Сохранить</Button>
										<Button color="danger" variant="soft" onClick={handleClose}>Отмена</Button>
									</Stack>
								</Stack>
							</form>
						</ModalDialog>
					</Modal>
				</Box>
			</Box>
		</CssVarsProvider>
	)
}
