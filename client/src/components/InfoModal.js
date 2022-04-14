import React, { useContext, useState} from 'react'
import { IconButton } from "@material-ui/core"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import { AuthContext } from '../context/AuthContext'

export default function InfoModal(props) {

    const { handleClose, open } = props
    const { currentUser } = useContext(AuthContext)
    const { savedPins } = useContext(AuthContext)
    const [ showPopup, setShowPopup ] = useState(null)

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h5 className="modal-heading">Профиль</h5>
              <IconButton color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon/>
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {currentUser ? <div>
              Добрый день {currentUser.username && currentUser.username}
              <hr/>
              <div className='places'>
                Ваши места:
              </div>
              </div>:
              <div>
                Войдите, чтобы просмотреть профиль со своими любимыми местами
              </div>}
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} className="btn btn-primary border-0 shadow-none">Закрыть</button>
          </DialogActions>
      </Dialog>
    )
}
