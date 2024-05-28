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

export const MachineTimeSetting = () => {
	const {request} = useHttp()

	const {handleSubmit, control, reset} = useForm({
		defaultValues: {
			duration: '',
		}
	})

	const onSubmit = async data => {
		console.log(data)
		// request('/machine/clear/time', 'PUT', data).then((data) => {
		// console.log(data)
		toast.success('Настройки обновлены')
		// })
	}
	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline/>
			<Box component="form" display="flex" flexDirection="row" sx={{width: '100%'}} gap={2} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name={"duration"}
					required
					fullWidth
					control={control}
					render={({field: {onChange, value}}) => (
						<FormControl>
							<FormLabel>Время очистки</FormLabel>
							<Input
								onChange={onChange}
								value={value}
							/>
						</FormControl>
					)}
				/>
				<Button variant="soft" sx={{mt: 3 /* margin top */}} type="submit">Сохранить</Button>
			</Box>
		</CssVarsProvider>
	)
}
