import {Box, Button, CssBaseline, CssVarsProvider, FormControl, FormLabel, Input} from "@mui/joy";
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRoundedIcon';
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useHttp} from "../../hooks/http.hook";

export const MachineBufferSetting = () => {
    const {request} = useHttp()

    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            buffer: '',
        }
    })

    const onSubmit = async data => {
        console.log(data)
        request(`/machine/buffer/size?buffer=${data.buffer}`, 'PUT').then((data) => {
            console.log(data)
            toast.success('Настройки обновлены')
        })
    }

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline/>
            <Box component="form" display="flex" flexDirection="row" sx={{width: '100%'}} gap={2}
                 onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name={"buffer"}
                    required
                    fullWidth
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <FormControl>
                            <FormLabel>Размер буффера</FormLabel>
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
