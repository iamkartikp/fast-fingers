import { Modal, Typography, Box, Button } from "@mui/material";

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

export default function ModalComponent(props) {
    const { isModalOpen, score, index, setModalClose } = props;
    console.log(score, index)
    return (
        <Modal
            open={isModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="d-flex flex-column align-items-center justify-content-center">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Score: <b>{score}</b> <small>words/min</small> <br />
                    Accuracy: <b>{((score / index) * 100).toFixed(2)}</b> <small>%</small>
                </Typography>
                <Button className="mt-4" onClick={setModalClose} variant="outlined">Close</Button>
            </Box>
        </Modal>
    )
}