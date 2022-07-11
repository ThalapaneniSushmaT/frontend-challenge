
import { Box, Typography, Modal } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FavoritesModal = (props) => {
    const { favorites } = props;
    return (
        <Modal
            open
            onClose={() => props.onClose(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {favorites.length > 0 ?
                (<Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        <h4>Your Favourite Breeds</h4>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
                        {favorites.map((favImg) =>
                            <div><img src={favImg.url} alt="broken" style={{ height: "150px", width: "150px" }} /></div>
                        )}
                    </Typography>
                </Box>) :
                <Box sx={style}>No Favourites! Add your favourite breeds to view here. <FavoriteIcon style={{ height: "400px", width: "400px", color: "aliceblue" }} /></Box>
            }
        </Modal>
    )

}

export default FavoritesModal;

