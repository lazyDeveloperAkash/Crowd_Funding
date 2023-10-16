export const checkIfImage = (url) => {
    const img = new Image();
    img.src = url;

    return new Promise((resolve) => {
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
    })
}

export const calculateBarGraph = (goal, raisedAmount)=>{
    return (raisedAmount*100)/goal;
}

export const remainingDays = (deadline)=> {
    const diff = new Date(deadline*1000).getTime() - Date.now();

  return Math.round(diff/(60*60*24*1000))
}
