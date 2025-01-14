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
import {OrderList, TasksManagementTable} from '../../components'
import {orders, tasksStub} from "../../components/TasksTable/dataExample";
import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {UsersTable} from "../../components/UsersTable";
import {useHttp} from "../../hooks/http.hook";

const stub = [
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
		"name": "Максим",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
	{
		"id": 3,
		"login": "test_login",
		"name": "Егор",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
	{
		"id": 4,
		"login": "test_login",
		"name": "Иннокентий",
		"role": {
			"id": 1,
			"name": "Администратор"
		}
	},
]

export const UsersPage = () => {

	const [open, setOpen] = useState(false);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	const {request} = useHttp()

	const {handleSubmit, control, reset, setValue} = useForm({
		defaultValues: {
			login: '',
			password: null,
			name: '',
			roleId: null,
		}
	})

	const fetchRoles = async () => {
		request('/role').then((data) => {
			setRoles(data)
		})
		// setRoles([
		// 	{
		// 		"id": 1,
		// 		"name": "Агент"
		// 	},
		// 	{
		// 		"id": 2,
		// 		"name": "Вариант"
		// 	},
		// 	{
		// 		"id": 3,
		// 		"name": "Менеджер"
		// 	},
		// 	{
		// 		"id": 4,
		// 		"name": "Помощник"
		// 	},
		// 	{
		// 		"id": 5,
		// 		"name": "Управляющий станком"
		// 	},
		// 	{
		// 		"id": 6,
		// 		"name": "Администратор"
		// 	},
		// ])
	}

	const fetchUsers = async () => {
		request('/user?page=0&limit=30').then((data) => {
			setUsers(data)
		})
		// setUsers(stub)
	}

	const fetchUser = async (id) => {
		request(`/user/${id}`).then((data) => {
			setValue("login", data.login)
			setValue("password", data.password)
			setValue("name", data.name)
			setValue("roleId", data.role.id)
		})
		// setValue("login", stub[0].login)
		// setValue("password", stub[0].password)
		// setValue("name", stub[0].name)
		// setValue("roleId", stub[0].role.id)
	}

	const onSubmit = async data => {
		if (selectedUserId) {
			if (data.password === null) delete data.password
			request(`/user/${selectedUserId}`, 'PUT', data).then(() => {
				toast.success('Пользователь отредактирован')
				fetchUsers()
				handleClose()
			})
		} else {
			request('/user', 'POST', data).then(() => {
				toast.success('Пользователь создан')
				fetchUsers()
				handleClose()
			})
		}
		console.log('selectedUserId', selectedUserId)
		console.log(data)
	}

	const handleClose = () => {
		setOpen(false)
		setSelectedUserId(null)
		reset()
	}

	const handleOpen = async (id) => {
		setOpen(true)
		setSelectedUserId(id)
		await fetchUser(id);
	}


	useEffect(() => {
		fetchRoles();
		fetchUsers()
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
							Пользователи
						</Typography>
						<Button
							color="primary"
							startDecorator={<Add/>}
							size="sm"
							variant="soft"
							onClick={() => setOpen(true)}
						>
							Создать пользователя
						</Button>
					</Box>
					<UsersTable rows={users} handleOpenEditModal={handleOpen}/>
					{/*<OrderList listItems={orders}/> TODO: адаптив*/}
					<Modal open={open} onClose={handleClose} variant="soft">
						<ModalDialog>
							<DialogTitle>Редактирование пользователя</DialogTitle>
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
										name={"name"}
										rules={{required: true}}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Имя</FormLabel>
												<Input autoFocus required value={value} onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"login"}
										rules={{required: true}}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Логин</FormLabel>
												<Input autoFocus required value={value} onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"password"}
										// rules={{required: true}}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Пароль</FormLabel>
												<Input autoFocus value={value}
												       required
												       type="password"
												       onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"roleId"}
										rules={{required: true}}
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl fullwidth>
												<FormLabel>Роль</FormLabel>
												<Select
													onChange={(e, newValue) => {
														onChange(newValue);
													}}
													value={value ? value : ""}
												>
													{roles.map(role => <Option
														value={role.id}
														label={role.name}
														key={role.id}>{role.name}</Option>)}
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
