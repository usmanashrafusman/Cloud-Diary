import React , {useContext}from 'react'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import {NoteContext} from './Router'

function Home(props) {
    const {showAlert} = props
    return (
        <>
       <div className='container'>
      <AddNote showAlert={showAlert}/>
      <NoteItem showAlert={showAlert}/>
       </div>
      </>
    )
}

export default Home
