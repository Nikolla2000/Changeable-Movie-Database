export function submit(object) {
    const inputs = document.querySelectorAll('input')
    const updatedMovie = {};
    const clickedRow = document.querySelector('tr[clicked=true]')
    const clickedRowData = clickedRow.querySelectorAll('td');
    clickedRow.removeAttribute('clicked')

    clickedRowData.forEach((data,index) => {
        data.innerText = inputs[index].value
    })
    
    inputs.forEach((input) => {
        updatedMovie[input.name] = input.value
        // localStorage.setItem(input.name, input.value)
    })

    Object.assign(object, updatedMovie)
    console.log(object)
}


 export function resetData(originalMovieObject){   
    const clickedRow = document.querySelector('tr[clicked=true]')
    const clickedRowData = clickedRow.querySelectorAll('td'); 
    Object.values(originalMovieObject).forEach((value,index) => {
        clickedRowData[index].innerText = value
    })
    
}
