import * as React from 'react';
import {ColorPaletteProp} from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, {iconButtonClasses} from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {freeAgentsStub} from "../../pages";
import {DialogTitle, Stack, Textarea, Tooltip} from "@mui/joy";
import {useAuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";


export const CataclysmsTable = ({rows, handleOpenEditModal, update}) => {
	const [open, setOpen] = useState(false);
	const [freeAgents, setFreeAgents] = useState([]);
	const [selectedCataclysmId, setSelectedCataclysmId] = useState(null);

	const {userData} = useAuthContext()
	const {request} = useHttp()

	const {handleSubmit, control, reset} = useForm({
		defaultValues: {
			description: '',
			executorId: '',
		}
	})

	const onSubmit = async data => {
		const payload = {cataclysmId: selectedCataclysmId, ...data}
		console.log(payload)
		request('/task', 'POST', payload).then((data) => {
			toast.success('Задание назначено')
		})
	}

	const handleClose = () => {
		setSelectedCataclysmId(null)
		setOpen(false)
		reset()
	}

	const handleOpen = async (id) => {
		if (!freeAgents.length) {
			toast.error('Все агенты заняты, попробуйте позже')
		} else {
			setOpen(true)
			setSelectedCataclysmId(id)
		}
	}

	const fetchFreeAgents = async () => {
		request('/user/free').then((data) => {
			setFreeAgents(data)
		})
		// setFreeAgents(freeAgentsStub)
		// setFreeAgents([])
	}


	const deleteHandler = async (id) => {
		request(`/cataclysm/${id}`, 'DELETE').then(() => {
			toast.success('Катаклизм удален')
			update();
		})
	}

	useEffect(() => {
		fetchFreeAgents();
	}, []);

	return (
		<React.Fragment>
			<Sheet
				className="OrderTableContainer"
				variant="outlined"
				sx={{
					display: {xs: 'none', sm: 'initial'},
					width: '100%',
					borderRadius: 'sm',
					flexShrink: 1,
					overflow: 'auto',
					minHeight: 0,
				}}
			>
				<Table
					aria-labelledby="tableTitle"
					stickyHeader
					hoverRow
					sx={{
						'--TableCell-headBackground': 'var(--joy-palette-background-level1)',
						'--Table-headerUnderlineThickness': '1px',
						'--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
						'--TableCell-paddingY': '4px',
						'--TableCell-paddingX': '8px',
					}}
				>
					<thead>
					<tr>
						<th style={{padding: '12px 12px'}}>id</th>
						<th style={{padding: '12px 12px'}}>Место</th>
						<th style={{padding: '12px 12px'}}>Время</th>
						<th style={{padding: '12px 12px'}}>Описание</th>
						<th style={{padding: '12px 12px'}}>Стоимость ресурсов</th>
						<th style={{padding: '12px 12px'}}>Тип</th>
						<th style={{padding: '12px 12px'}}></th>
					</tr>
					</thead>
					<tbody>
					{rows.map((row) => (
						<tr key={row.id}>
							<td>
								<Typography level="body-xs">{row.id}</Typography>
							</td>
							<td>
								{row.place && <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px'}}>
									<PlaceRoundedIcon fontSize="small"/>
									<Typography level="body-xs">{row.place}</Typography>
								</Box>}
							</td>
							<td>
								<Typography level="body-xs">{row.time}</Typography>
							</td>
							<td>
								<Typography level="body-xs">{row.description}</Typography>
							</td>
							<td>
								<Typography level="body-xs">${row.costOfResources}</Typography>
							</td>
							<td>
								{row.type && <Chip
									variant="soft"
									size="sm"
									color={
										{
											'Слабый': 'success',
											'Средний': 'warning',
											'Уничтожение': 'danger',
										}[row.type.name]
									}
								>
									{row.type.name}
								</Chip>}
							</td>
							<td>
								{(userData.userDto.role.id !== 2) && <Box sx={{
									display: 'flex',
									gap: 1,
									alignItems: 'center',
									justifyContent: 'end',
									width: '100%'
								}}>
									<IconButton variant="soft" color="primary" size="sm" onClick={() => {
										handleOpenEditModal(row.id)
									}}>
										<EditRoundedIcon/>
									</IconButton>
									<IconButton variant="soft" color="primary" size="sm" onClick={() => {
										handleOpen(row.id)
									}}>
										<PersonAddRoundedIcon/>
									</IconButton>
									<IconButton variant="soft" color="danger" size="sm" onClick={() => {
										deleteHandler(row.id)
									}}>
										<DeleteRoundedIcon/>
									</IconButton>
								</Box>}
							</td>
						</tr>
					))}
					</tbody>
				</Table>
			</Sheet>
			{/*<Box*/}
			{/*	className="Pagination-laptopUp"*/}
			{/*	sx={{*/}
			{/*		pt: 2,*/}
			{/*		gap: 1,*/}
			{/*		[`& .${iconButtonClasses.root}`]: {borderRadius: '50%'},*/}
			{/*		display: {*/}
			{/*			xs: 'none',*/}
			{/*			md: 'flex',*/}
			{/*		},*/}
			{/*	}}*/}
			{/*>*/}
			{/*	<Button*/}
			{/*		size="sm"*/}
			{/*		variant="outlined"*/}
			{/*		color="neutral"*/}
			{/*		startDecorator={<KeyboardArrowLeftIcon/>}*/}
			{/*	>*/}
			{/*		Previous*/}
			{/*	</Button>*/}

			{/*	<Box sx={{flex: 1}}/>*/}
			{/*	{['1', '2', '3', '…', '8', '9', '10'].map((page) => (*/}
			{/*		<IconButton*/}
			{/*			key={page}*/}
			{/*			size="sm"*/}
			{/*			variant={Number(page) ? 'outlined' : 'plain'}*/}
			{/*			color="neutral"*/}
			{/*		>*/}
			{/*			{page}*/}
			{/*		</IconButton>*/}
			{/*	))}*/}
			{/*	<Box sx={{flex: 1}}/>*/}

			{/*	<Button*/}
			{/*		size="sm"*/}
			{/*		variant="outlined"*/}
			{/*		color="neutral"*/}
			{/*		endDecorator={<KeyboardArrowRightIcon/>}*/}
			{/*	>*/}
			{/*		Next*/}
			{/*	</Button>*/}
			{/*</Box>*/}
			<Modal open={open} onClose={handleClose} variant="soft">
				<ModalDialog>
					<DialogTitle>Назначение задания</DialogTitle>
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
		</React.Fragment>
	);
}
