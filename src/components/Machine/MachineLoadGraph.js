import {Box, Button, CssBaseline, CssVarsProvider, FormControl, FormLabel, Input, Typography} from "@mui/joy";
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRoundedIcon';
import {Controller, useForm} from "react-hook-form";
import {useHttp} from "../../hooks/http.hook";
import {BASE_URL} from "../../config";

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

        const url = `${BASE_URL}/report/graphic?start=${data.start}&stop=${data.stop}`

        request(`/report/graphic?start=${data.start}&stop=${data.stop}`).then((res) => {
            console.log('res', res)
            if (res) {
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `machine_load_graph.csv`);
                document.body.appendChild(link);
                link.click();
            }
        })
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
                    <Box component="form" display="flex" flexDirection="column" gap={2}
                         onSubmit={handleSubmit(onSubmit)}>
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
