import React, {useState} from "react";
import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import {RiDeleteBinLine} from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";
import LoadingIcon from "./LoadingIcon";
import {server_url} from "../key";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteEventDialog({eventId, refreshEvents}) {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = useState("idle");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setStatus("loading");

        fetch(`${server_url}/event`, {
            method: "DELETE",
            body: JSON.stringify({_id: eventId}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setStatus("deleted");
            })
            .catch((error) => console.log("error!", error));
    };

    return (
        <div>
            <DeleteButton onClick={handleClickOpen}>
                <RiDeleteBinLine/>
            </DeleteButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Remove event</DialogTitle>
                <DialogContent>
                    Are you sure you want to remove this event?
                </DialogContent>
                {status === "loading" ? <LoadingIcon/> : null}
                {status === "deleted" ? (
                    <ConfirmationBox>
                        <FcCheckmark/> Event deleted.
                    </ConfirmationBox>
                ) : null}
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">
                        YES
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            refreshEvents();
                        }}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const DeleteButton = styled.button`
  border: none;
  font-size: 1.3rem;
`;

const ConfirmationBox = styled.div`
  margin: 20px;
  border: 1px solid #00cc63;
  border-radius: 4px;
  background-color: #e6fff2;
  padding: 5px 20px;
`;
