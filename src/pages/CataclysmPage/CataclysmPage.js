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
import {CataclysmsTable, OrderList, TasksManagementTable} from '../../components'
import {orders, tasksStub} from "../../components/TasksTable/dataExample";
import {useEffect, useState} from "react";
import {Add} from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {freeAgentsStub} from "../TasksPage";
import {useHttp} from "../../hooks/http.hook";

const cataclysmsStub = [
	{
		"id": 1,
		"place": "Санкт-Петербург",
		"time": "12:30:23",
		"description": "Описание катаклизма",
		"type": {
			"id": 1,
			"name": "Слабый"
		}
	},
	{
		"id": 2,
		"place": "Санкт-Петербург",
		"time": "12:30:23",
		"description": "Описание катаклизма",
		"type": {
			"id": 2,
			"name": "Средний"
		}
	},
	{
		"id": 3,
		"place": "Санкт-Петербург",
		"time": "12:30:23",
		"description": "Описание катаклизма",
		"type": {
			"id": 3,
			"name": "Уничтожение"
		}
	},
	{
		"id": 4,
		"place": "Санкт-Петербург",
		"time": "12:30:23",
		"description": "Описание катаклизма",
		"type": {
			"id": 1,
			"name": "Слабый"
		}
	},
]

export const cataclysmTypes = [
	{
		"id": 1,
		"name": "Слабый"
	},
	{
		"id": 2,
		"name": "Средний"
	},
	{
		"id": 3,
		"name": "Уничтожение"
	},
]

export const CataclysmPage = () => {

	const [openEditModal, setOpenEditModal] = useState(false);
	const [freeAgents, setFreeAgents] = useState([]);
	const [cataclysms, setCataclysms] = useState([]);
	const [selectedCataclysmId, setSelectedCataclysmId] = useState(null);

	const {request} = useHttp()

	const {handleSubmit, control, reset, setValue} = useForm({
		defaultValues: {
			place: '',
			time: '',
			description: '',
			typeId: '',
		}
	})

	const onSubmit = async data => {
		// console.log(data)
		// request('/cataclysm', 'POST', data).then((data) => {
		// toast.success('Катаклизм отредактирован')
		// })
		if (selectedCataclysmId) {
			request(`/cataclysm/${selectedCataclysmId}`, 'PUT', data).then(() => {
				toast.success('Катаклизм отредактирован')
				handleClose()
			})

		} else {
			delete data.typeId
			const newTime = data.time + ':00'
			data.time = newTime
			request('/cataclysm', 'POST', data).then(() => {
				toast.success('Катаклизм создан')
				handleClose()
			})
		}
		console.log('selectedCataclysmId', selectedCataclysmId)
		console.log(data)
	}

	const handleClose = () => {
		fetchCataclysms()
		setSelectedCataclysmId(null)
		setOpenEditModal(false)
		reset()
	}

	const handleOpenEditModal = async (id) => {
		setOpenEditModal(true)
		setSelectedCataclysmId(id)
		await fetchCataclysm(id)
	}

	const fetchFreeAgents = async () => {
		request('/user/free').then((data) => {
			setFreeAgents(data)
		})
		// setFreeAgents(freeAgentsStub)
	}

	const fetchCataclysms = async () => {
		request('/cataclysm?page=0&limit=10').then((data) => {
			setCataclysms(data)
		})
		// setCataclysms(cataclysmsStub)
	}

	const fetchCataclysm = async (id) => {
		request(`/cataclysm/${id}`).then((data) => {
			setValue("description", data.description)
			setValue("place", data.place)
			setValue("time", data.time)
			if (data.type) setValue("typeId", data.type.id)
		})
		// setValue("description", cataclysmsStub[0].description)
		// setValue("place", cataclysmsStub[0].place)
		// setValue("time", cataclysmsStub[0].time)
		// setValue("typeId", cataclysmsStub[0].type.id)
	}


	useEffect(() => {
		fetchFreeAgents();
		fetchCataclysms()
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
							Катаклизмы
						</Typography>
						<Button
							color="primary"
							startDecorator={<Add/>}
							size="sm"
							variant="soft"
							onClick={() => setOpenEditModal(true)}
						>
							Добавить катаклизм
						</Button>
					</Box>
					<CataclysmsTable rows={cataclysms} handleOpenEditModal={handleOpenEditModal}
					                 update={fetchCataclysms}/>
					{/*<OrderList listItems={orders}/> TODO: адаптив*/}
					<Modal open={openEditModal} onClose={handleClose} variant="soft">
						<ModalDialog>
							<DialogTitle>Редактирование катаклизма</DialogTitle>
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
										name={"place"}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Место</FormLabel>
												<Input autoFocus required value={value} onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"time"}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Время</FormLabel>
												<Input type="time" autoFocus required value={value}
												       onChange={onChange}/>
											</FormControl>
										)}
									/>
									<Controller
										name={"description"}
										required
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl>
												<FormLabel>Описание</FormLabel>
												<Textarea minRows={3} autoFocus required value={value}
												          onChange={onChange}/>
											</FormControl>
										)}
									/>
									{selectedCataclysmId && <Controller
										name={"typeId"}
										rules={{required: true}}
										fullwidth
										control={control}
										render={({field: {onChange, value}}) => (
											<FormControl fullwidth>
												<FormLabel>Тип</FormLabel>
												<Select
													onChange={(e, newValue) => {
														onChange(newValue);
													}}
													value={value ? value : ""}
												>
													{cataclysmTypes.map(type => <Option
														value={type.id}
														label={type.name}
														key={type.id}>{type.name}</Option>)}
												</Select>
											</FormControl>
										)}
									/>}
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
