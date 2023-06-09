import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";



function ScanQRCode({employeeId,name}) {
    const [open, setOpen] =useState(false)
    const navigator = useNavigate();
    const handleClose = () => {
        setOpen(false)
    }

    function onScanFailure(error) { }

    const scanQRCode = () => {
        setOpen(true);
        setTimeout(() => {
           let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 }  },
            false);

            
        async function onScanSuccess(decodedText, decodedResult) {
            if(decodedText.includes('employee/feedback'))
            {
                let url = decodedText.repalce(process.env.REACT_APP_BASE_URL, '/');
                await html5QrcodeScanner.clear();
                navigator(url);
            }
        }
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);


        }, 300)
    }
    return(
        <>
        <Button sx={{ mx:2 }} variant='contained' onClick={scanQRCode} coclor='primary' startIcon={<QrCode2Icon />}>Scan QRCode</Button>
        <Dialog
        open={open}
        onClose={handleClose} >
            <DialogTitle>
                Scan Employee QR Code
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                <div id="reader" width="400px"></div>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center"}}>
                <Button onClick={handleClose} autoFocus>
                    close
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ScanQRCode