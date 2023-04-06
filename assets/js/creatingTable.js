import Modal  from "./modalWindow.js"
import {submit,resetData} from './onSubmit.js'



async function createTable(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    const table = document.createElement('table');
    const headersRow = document.createElement('tr');
    const headers = Object.keys(data[0]);
    
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.innerText = header;
        headersRow.append(th);
    });
    
    table.appendChild(headersRow);
    data.length = 50;
    
    data.forEach((dataInstance) => {
        const tr = document.createElement('tr');
        tr.setAttribute('title', dataInstance['Title'])
        var originalObject = Object.assign({}, dataInstance);
        
        tr.onclick = () => {
            if(table.hasAttribute('modalActive')){
                   return 
                }

            var movieObject = data.find((dataInstance) => dataInstance["Title"] == tr.title)
            if(tr.hasAttribute('data-reset')){
                Object.assign(movieObject,originalObject)
            }

            var modal = new Modal(movieObject)
            table.setAttribute('modalActive', true)
            tr.setAttribute('clicked', true)
            table.classList.add('inactive')
            
            console.log(movieObject)
            const form = document.querySelector('form')

            form.onsubmit = (formEvent) => {
                formEvent.preventDefault()
                submit(movieObject)
                const titleInput = document.querySelector('input[name=Title]')
                tr.title = titleInput.value
                modal.hide()
                tr.classList.add('animate')
                if(tr.hasAttribute('data-reset')){
                    tr.removeAttribute('data-reset')
                }
            }

            const resetBtn = document.querySelector('.reset-btn')
            resetBtn.onclick = () => {
                resetData(originalObject)
                modal.hide()
                movieObject = originalObject
                console.log(movieObject)
                tr.classList.add('animate')
                tr.setAttribute('data-reset', '')
            }
            tr.classList.remove('animate')
        }
            
        headers.forEach((header) => {
            const td = document.createElement('td');
            td.innerText = dataInstance[header];
            tr.append(td);
        });
        
        table.append(tr);
    });

    document.body.append(table);
}

export default createTable