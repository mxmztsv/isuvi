import {Box, Breadcrumbs, Button, CssBaseline, CssVarsProvider, Link, Typography} from "@mui/joy";
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRoundedIcon';
import {OrderList, OrderTable} from '../../components'
import {orders, tasks} from "../../components/OrdersTable/dataExample";

export const TasksPage = () => {
	return (
		// <Box component="main"
		//      sx={{display: "flex", alignItems: "center", justifyContent: "center", height: '100vh', width: '100%'}}>
		// 	<Typography>Задания</Typography>
		// </Box>
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
					{/*<Box sx={{ display: 'flex', alignItems: 'center' }}>*/}
					{/*	<Breadcrumbs*/}
					{/*		size="sm"*/}
					{/*		aria-label="breadcrumbs"*/}
					{/*		// separator={<ChevronRightRoundedIcon fontSize="sm" />}*/}
					{/*		sx={{ pl: 0 }}*/}
					{/*	>*/}
					{/*		<Link*/}
					{/*			underline="none"*/}
					{/*			color="neutral"*/}
					{/*			href="#some-link"*/}
					{/*			aria-label="Home"*/}
					{/*		>*/}
					{/*			/!*<HomeRoundedIcon />*!/*/}
					{/*		</Link>*/}
					{/*		<Link*/}
					{/*			underline="hover"*/}
					{/*			color="neutral"*/}
					{/*			href="#some-link"*/}
					{/*			fontSize={12}*/}
					{/*			fontWeight={500}*/}
					{/*		>*/}
					{/*			Dashboard*/}
					{/*		</Link>*/}
					{/*		<Typography color="primary" fontWeight={500} fontSize={12}>*/}
					{/*			Orders*/}
					{/*		</Typography>*/}
					{/*	</Breadcrumbs>*/}
					{/*</Box>*/}
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
							// startDecorator={<DownloadRoundedIcon/>}
							size="sm"
						>
							Создать задание
						</Button>
					</Box>
					<OrderTable rows={tasks}/>
					<OrderList listItems={orders}/>
				</Box>
			</Box>
		</CssVarsProvider>
	)
}
