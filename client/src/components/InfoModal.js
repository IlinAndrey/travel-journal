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

    var myArray = [
      "Предлагаем вам посетить Испанию, она знакома каждому своими прекрасными видами и солнечными пейзажами",
      "Предлагаем вам посетить Эйфелеву башню в Париже, с нее открывается неописуемый вид на город",
      "Предлагаем вам посетить озеро Байкал, древний сибирский Байкал подавляет своим величием, красотой и безбрежными просторами. Он признан самым глубоким озером в мире, а за свою уникальную экосистему был внесен в список Всемирного наследия ЮНЕСКО",
      "Предлагаем вам посетить Гейрангер-фьорд, это Фьорд возле норвежской деревни Гейрангер — одно из самых красивых мест, которыми славятся эти суровые северные земли. С его смотровых площадок открываются потрясающие виды на ледники, головокружительно высокие скалы, каменистые уступы с заброшенными фермами и мощным, гулко гремящим водопадом Storseterfossen",
      "Предлагаем вам посетить каньон Антилопы, находится он в американском штате Аризона, на территории индейцев навахо. За миллионы лет вода и ветер превратили это место в настоящее произведение искусства. Они выточили в красном песчанике изящные проходы причудливой формы, а дневной свет, попадающий сюда через узкие щели, заставляет скалы переливаться и менять свой оттенок"
    ]

    var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

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
          <DialogContent dividers style={{textAlign:'center'}}>
            {currentUser ? <div>
              Добрый день {currentUser.username && currentUser.username}
              <hr/>
              <div className='places'>
                <b>Предложение специально для вас:</b><br />
                {randomItem}
              </div>
              </div>:
              <div>
                Войдите, чтобы просмотреть профиль и предложенные места
              </div>}
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} className="btn btn-primary border-0 shadow-none">Закрыть</button>
          </DialogActions>
      </Dialog>
    )
}
