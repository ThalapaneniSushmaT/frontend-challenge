
import { ButtonBase, Grid, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDogInfo } from "../../services/dogs.service";
import { styled } from '@mui/material/styles';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Div = styled("div")({
    fontWeight: "bold"
});


const ImageInfoModal = (props) => {
    const { id } = props;
    const [dogInfo, setDogInfo] = useState({});

    const getDogDetails = async () => {
        try {
            const res = await getDogInfo(id);
            setDogInfo(res?.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        getDogDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Modal
            open
            onClose={() => props.onClose(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                sx={{
                    p: 5,
                    m: '100px auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    border: "1px solid grey",
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128, mt: "20px" }}>
                            <Img alt="Dog" src={dogInfo?.url} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                                Dog Information
                            </Typography>
                            <Grid item xs>
                                <Typography variant="body2" gutterBottom>
                                    <Div>Breed: {dogInfo?.breeds?.[0]?.name || "N/A"}</Div>
                                    <div>Breed Group: {dogInfo?.breeds?.[0]?.breed_group || "N/A"}</div>
                                    <div>Breed For: {dogInfo?.breeds?.[0]?.bred_for || "N/A"}</div>
                                    <div>Temperament: {dogInfo?.breeds?.[0]?.temperament || "N/A"}</div>
                                    <div>Life Span: {dogInfo?.breeds?.[0]?.life_span || "N/A"}</div>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )

}

export default ImageInfoModal;

