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
import {OrderList, TasksManagementTable, TasksTable} from '../../components'
import {orders, tasksStub} from "../../components/TasksTable/dataExample";
import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useHttp} from "../../hooks/http.hook";

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
	const [tasks, setTasks] = useState([]);
	const {request} = useHttp()

	const fetchTasks = async () => {
		request('/task?page=0&limit=10').then((data) => {
			setTasks(data)
		})
		// setTasks(tasksStub)
	}

	useEffect(() => {
		fetchTasks()
	}, []);


	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline/>
			<Box sx={{display: 'flex', minHeight: '100dvh'}}>
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
					</Box>
					<TasksTable rows={tasks} update={fetchTasks} />
					{/*<OrderList listItems={orders}/> TODO: адаптив*/}
				</Box>
			</Box>
		</CssVarsProvider>
	)
}
