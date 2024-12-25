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
import {MachineBufferSetting, MachineLoadGraph, MachineTimeSetting} from "../../components/Machine";

export const MachinePage = () => {

	const {request} = useHttp()

	const flushTimelines = () => {
		request('/machine/destroy/all', 'DELETE').then(() => {
			toast.success('Все таймлайны очищены')
		})
	}


	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline/>
			<Box sx={{display: 'flex'}}>
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
						// height: '100dvh',
						gap: 1,
					}}
				>
					<MachineLoadGraph/>
					<Typography level="h2" component="h1">
						Настройки станка
					</Typography>
					<MachineBufferSetting/>
					<MachineTimeSetting/>
					<Button onClick={flushTimelines} color="danger" variant="soft"
					        sx={{position: 'absolute', bottom: '30px'}}>Очистить все таймлайны</Button>
				</Box>
			</Box>
			{/*<Stack direction="column">*/}
			{/*	<MachineLoadGraph />*/}
			{/*	<Typography level="h2" component="h1">*/}
			{/*		Получить график нагрузки*/}
			{/*	</Typography>*/}
			{/*	<MachineBufferSetting/>*/}
			{/*</Stack>*/}
		</CssVarsProvider>
	)
}
