import { useEffect } from "react"
function TimeCounter({ dispatch, time }) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;





    useEffect(function () { 
        
        const timer = setTimeout(() => {
            dispatch({ type: "decreaseTime" })
        }, 1000)
        return () => clearTimeout(timer)
    }, [time, dispatch])
    
    return (
        <button className="btn btn-primary" onClick={() => dispatch({ type: "start" })}>
            <span className="time">{`${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`} </span>  
        </button>
    )
}

export default TimeCounter
