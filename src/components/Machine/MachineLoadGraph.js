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
import {useAuthContext} from "../../context/AuthContext";

export const MachineLoadGraph = () => {
	const {request} = useHttp()

	const {handleSubmit, control, reset} = useForm({
		defaultValues: {
			start: '',
			stop: ''
		}
	})

	const onSubmit = async data => {
		console.log(data)
		// request('/machine/graphic', 'POST', data).then((data) => {
		// console.log(data)
		// })
	}
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline/>
			<Box sx={{display: 'flex', width: '100%',}}>
				<Box
					component="main"
					className="MainContent"
					sx={{
						// px: {xs: 2, md: 6},
						// pt: {
						// 	xs: 'calc(12px + var(--Header-height))',
						// 	sm: 'calc(12px + var(--Header-height))',
						// 	md: 3,
						// },
						pb: {xs: 2, sm: 2, md: 3},
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						// minWidth: 0,
						width: '100%',
						// height: '100dvh',
						gap: 1,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							mb: 1,
							gap: 3,
							flexDirection: {xs: 'column', sm: 'row'},
							alignItems: {xs: 'start', sm: 'center'},
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}
					>
						<Typography level="h2" component="h1">
							Получить график нагрузки
						</Typography>
					</Box>
					<Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name={"start"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<FormControl>
									<FormLabel>Дата начала</FormLabel>
									<Input
										type="date"
										onChange={onChange}
										value={value}
									/>
								</FormControl>
							)}
						/>
						<Controller
							name={"stop"}
							required
							fullWidth
							control={control}
							render={({field: {onChange, value}}) => (
								<FormControl>
									<FormLabel>Дата окончания</FormLabel>
									<Input
										type="date"
										onChange={onChange}
										value={value}
									/>
								</FormControl>
							)}
						/>
						<Button variant="soft" sx={{mt: 1 /* margin top */}} type="submit">Выгрузить</Button>
					</Box>
				</Box>
			</Box>
		</CssVarsProvider>
	)
}
