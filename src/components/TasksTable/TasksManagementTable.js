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
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import toast from "react-hot-toast";
import {useHttp} from "../../hooks/http.hook";


export const TasksManagementTable = ({rows, handleOpenEditModal, update}) => {

	const {request} = useHttp()

	const deleteHandler = async (id) => {
		request(`/task/${id}`, 'DELETE').then(() => {
			toast.success('Задание удалено')
			update();
		})
	}

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
						<th style={{padding: '12px 12px', width: '16%'}}>Статус</th>
						<th style={{padding: '12px 12px'}}>Место</th>
						<th style={{padding: '12px 12px'}}>Время</th>
						<th style={{padding: '12px 12px'}}>Катаклизм</th>
						<th style={{width: '160px', padding: '12px 12px'}}>Исполнитель</th>
						<th style={{padding: '12px 12px'}}>Тип</th>
						<th style={{padding: '12px 12px'}}></th>
					</tr>
					</thead>
					<tbody>
					{rows.map((row) => (
						<tr key={row.id}>
							<td>
								<Chip
									variant="soft"
									size="sm"
									startDecorator={
										{
											1: <CheckRoundedIcon/>,
											2: <PersonAddRoundedIcon/>,
											3: <AutorenewRoundedIcon/>,
											4: <CheckRoundedIcon/>,
											5: <BlockIcon/>,
											6: <PaidRoundedIcon/>,
										}[row.status.id]
									}
									color={
										{
											1: 'neutral',
											2: 'warning',
											3: 'warning',
											4: 'success',
											5: 'danger',
											6: 'success',
										}[row.status.id]
									}
								>
									{row.status.name}
								</Chip>
							</td>
							<td>
								{row.cataclysm.place && row.cataclysm && <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px'}}>
									<PlaceRoundedIcon fontSize="small"/>
									<Typography level="body-xs">{row.cataclysm.place}</Typography>
								</Box>}
							</td>
							<td>
								{row.cataclysm && <Typography level="body-xs">{row.cataclysm.time}</Typography>}
							</td>
							<td>
								<Typography level="body-xs">{row.description}</Typography>
							</td>
							<td>
								<Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
									<Avatar size="sm">{row.executor.name.charAt(0)}</Avatar>
									<div>
										<Typography level="body-xs">{row.executor.name}</Typography>
										<Typography level="body-xs">{row.executor.role.name}</Typography>
									</div>
								</Box>
							</td>

							<td>
								{row.cataclysm && row.cataclysm.type && <Chip
									variant="soft"
									size="sm"
									color={
										{
											'Слабый': 'success',
											'Средний': 'warning',
											'Уничтожение': 'danger',
										}[row.cataclysm.type.name]
									}
								>
									{row.cataclysm.type.name}
								</Chip>}
							</td>
							<td>
								<Box sx={{display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'end', width: '100%'}}>
									<IconButton variant="soft" color="primary" size="sm" onClick={() => {handleOpenEditModal(row.id)}}>
										<EditRoundedIcon/>
									</IconButton>
									<IconButton variant="soft" color="danger" size="sm" onClick={() => {
										deleteHandler(row.id)
									}}>
										<DeleteRoundedIcon/>
									</IconButton>
								</Box>
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
		</React.Fragment>
	);
}
