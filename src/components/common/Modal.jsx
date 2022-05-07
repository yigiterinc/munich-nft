import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    position: 'absolute',
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('xs')]: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  dialogTitleText: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: "#b35bff",
    [theme.breakpoints.up('xs')]: {
      fontSize: '23px',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '26px',
    },
  },
}));

const Modal = ({ title, children, openModal, setOpenModal }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className={classes.dialogTitle}>
          <Typography className={classes.dialogTitleText}>
            {title}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <CancelIcon
              fontSize={isSmallScreen ? 'medium' : 'large'}
            />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;