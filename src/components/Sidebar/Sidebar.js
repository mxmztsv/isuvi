import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, {listItemButtonClasses} from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import SyncProblemRoundedIcon from '@mui/icons-material/SyncProblemRounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import {Link} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useAuthContext} from "../../context/AuthContext";

// import ColorSchemeToggle from './ColorSchemeToggle';
// import {closeSidebar} from '../utils';

// const pages = [
// 	{
// 		title: "Задания",
// 		icon: <AssignmentRoundedIcon/>,
// 		link: "/tasks"
// 	},
// 	{
// 		title: "Задания (менеджер)",
// 		icon: <AssignmentRoundedIcon/>,
// 		link: "/tasks-management"
// 	},
// 	{
// 		title: "Катаклизмы",
// 		icon: <SyncProblemRoundedIcon/>,
// 		link: "/cataclysms"
// 	},
// 	{
// 		title: "Станок",
// 		icon: <PrecisionManufacturingRoundedIcon/>,
// 		link: "/machine"
// 	},
// 	{
// 		title: "Пользователи",
// 		icon: <PeopleOutlineRoundedIcon/>,
// 		link: "/users"
// 	},
// ];

export const ROLES_TO_PAGES = {
	1: [
		{
			title: "Задания",
			icon: <AssignmentRoundedIcon/>,
			link: "/tasks"
		},
	],
	2: [
		{
			title: "Катаклизмы",
			icon: <SyncProblemRoundedIcon/>,
			link: "/cataclysms"
		},
		// {
		// 	title: "Задания",
		// 	icon: <AssignmentRoundedIcon/>,
		// 	link: "/tasks"
		// },
	],
	3: [
		{
			title: "Задания",
			icon: <AssignmentRoundedIcon/>,
			link: "/tasks-management"
		},
		{
			title: "Катаклизмы",
			icon: <SyncProblemRoundedIcon/>,
			link: "/cataclysms"
		},
	],
	4: [
		{
			title: "Задания",
			icon: <AssignmentRoundedIcon/>,
			link: "/tasks"
		},
		{
			title: "Катаклизмы",
			icon: <SyncProblemRoundedIcon/>,
			link: "/cataclysms"
		},
	],
	5: [
		{
			title: "Станок",
			icon: <PrecisionManufacturingRoundedIcon/>,
			link: "/machine"
		},
	],
	6: [
		{
			title: "Пользователи",
			icon: <PeopleOutlineRoundedIcon/>,
			link: "/users"
		},
		// {
		// 	title: "Задания",
		// 	icon: <AssignmentRoundedIcon/>,
		// 	link: "/tasks-management"
		// },
		{
			title: "Катаклизмы",
			icon: <SyncProblemRoundedIcon/>,
			link: "/cataclysms"
		},
		// {
		// 	title: "Станок",
		// 	icon: <PrecisionManufacturingRoundedIcon/>,
		// 	link: "/machine"
		// },
	],
	7: [
		{
			title: "Пользователи",
			icon: <PeopleOutlineRoundedIcon/>,
			link: "/users"
		},
		{
			title: "Задания",
			icon: <AssignmentRoundedIcon/>,
			link: "/tasks"
		},
		{
			title: "Задания (менеджер)",
			icon: <AssignmentRoundedIcon/>,
			link: "/tasks-management"
		},
		{
			title: "Катаклизмы",
			icon: <SyncProblemRoundedIcon/>,
			link: "/cataclysms"
		},
		{
			title: "Станок",
			icon: <PrecisionManufacturingRoundedIcon/>,
			link: "/machine"
		},
	],
};

export const Sidebar = () => {
	const [selectedPage, setSelectedPage] = useState(null);
	const [pages, setPages] = useState([]);
	const navigate = useNavigate()
	const {request} = useHttp()
	const {logout, userData} = useAuthContext()

	const handleNavigate = (page) => {
		setSelectedPage(page.title)
		navigate(page.link)
	}

	const logoutHandler = () => {
		// request('/auth/logout', 'POST').then(() => {
		logout()
		// })
	}

	useEffect(() => {
		setPages(ROLES_TO_PAGES[userData.userDto.role.id])
		setSelectedPage(ROLES_TO_PAGES[userData.userDto.role.id][0].title)
	}, [userData]);


	return (
		<Sheet
			className="Sidebar"
			sx={{
				position: {xs: 'fixed', md: 'sticky'},
				transform: {
					xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
					md: 'none',
				},
				transition: 'transform 0.4s, width 0.4s',
				zIndex: 10000,
				height: '100dvh',
				width: 'var(--Sidebar-width)',
				top: 0,
				p: 2,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				borderRight: '1px solid',
				borderColor: 'divider',
			}}
		>
			<GlobalStyles
				styles={(theme) => ({
					':root': {
						'--Sidebar-width': '220px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '240px',
						},
					},
				})}
			/>
			<Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
				<IconButton variant="soft" color="primary" size="sm">
					<BrightnessAutoRoundedIcon/>
				</IconButton>
				<Typography level="title-lg">ИСУВИ</Typography>
			</Box>
			<Box
				sx={{
					minHeight: 0,
					overflow: 'hidden auto',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 1,
						'--List-nestedInsetStart': '30px',
						'--ListItem-radius': (theme) => theme.vars.radius.sm,
					}}
				>
					{
						pages.map((page) => {
							return (
								<ListItem key={page.title}>
									<ListItemButton selected={selectedPage === page.title} onClick={() => {
										handleNavigate(page)
									}}>
										{page.icon}
										<ListItemContent>
											<Typography level="title-sm">{page.title}</Typography>
										</ListItemContent>
									</ListItemButton>
								</ListItem>
							)
						})
					}
				</List>

			</Box>
			<Divider/>
			<Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
				<Avatar
					variant="soft"
					size="sm"
					color="primary"
				>{userData.userDto.name.charAt(0)}</Avatar>
				<Box sx={{minWidth: 0, flex: 1}}>
					<Typography level="title-sm">{userData.userDto.name}</Typography>
					<Typography level="body-xs">{userData.userDto.role.name}</Typography>
				</Box>
				<IconButton size="sm" variant="plain" color="neutral" onClick={logoutHandler}>
					<LogoutRoundedIcon/>
				</IconButton>
			</Box>
		</Sheet>
	);
}
