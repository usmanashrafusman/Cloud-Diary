import React from 'react'

function Alerts(props) {
 
    const capitalize=(val)=>{
        if(val === "danger"){
            val="error"
        }else if(val === "primary"){
            val="Note"
        }

        let lower = val.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alerts;
