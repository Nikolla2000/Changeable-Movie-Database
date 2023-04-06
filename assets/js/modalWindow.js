import {submit}  from "./onSubmit.js";

class Modal {
    #modalElement
    #form
    #table

    constructor(movie){
        this.movie = movie;
        this.#table = document.querySelector('table')
        this.#modalElement = document.createElement('div')
        this.#modalElement.classList.add('modal-wrapper')
        this.#modalElement.id = 'modal'
        this.#form = document.createElement('form')
        this.#form.id = 'changeDataForm'
        
        this.#createCloseButton()
        this.#populateModal()
        this.#form.onsubmit = () => {
            submit(this.movie)
        }

        document.body.append(this.#modalElement)
    }
    
    #createCloseButton(){
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('close-button')
        closeBtn.innerText = 'X'
        closeBtn.onclick = () => {
            this.hide()
        }
        
        this.#modalElement.append(closeBtn)
    }
    
    #populateModal(){
        for(let i = 0; i < Object.keys(this.movie).length; i++){
            const inputWrapper = document.createElement('div')
            inputWrapper.classList.add('input-wrapper')
            const label = document.createElement('label')
            label.setAttribute('for', Object.keys(this.movie)[i])
            label.innerText = Object.keys(this.movie)[i]
            
            const input = document.createElement('input')
            input.type = 'text'
            // if(typeof Object.values(this.movie)[i] == 'number'){
            //     input.type = 'number'
            // }
            input.name = Object.keys(this.movie)[i]
            input.value = Object.values(this.movie)[i]
            
            if(input.name === 'IMDB Rating'){
                input.type = 'text'
                input.value.toString().replace(",", ".")
            } 
            inputWrapper.append(label,input)
            this.#form.append(inputWrapper)
        }
        const buttonWrapper = document.createElement('div')
        buttonWrapper.classList.add('button-wrapper')

        const submitBtn= document.createElement('button')
        submitBtn.setAttribute('form', 'changeDataForm')
        submitBtn.classList.add('submit-button')
        submitBtn.innerText = 'Save Changes'
        submitBtn.type = 'submit'

        const resetBtn = document.createElement('button')
        resetBtn.classList.add('reset-btn')
        resetBtn.innerText = 'Restore Initial Data'
        
        buttonWrapper.append(submitBtn,resetBtn)
        this.#modalElement.append(this.#form, buttonWrapper)
        
    }
    
    hide(){
        this.#modalElement.style.display = 'none'
        document.body.removeChild(this.#modalElement)
        this.#table.removeAttribute('modalActive')
        this.#table.classList.remove('inactive')
        const clickedRow = document.querySelector('tr[clicked=true]')
        if(clickedRow){
            clickedRow.removeAttribute('clicked')
            
        }


    }
    
}

export default Modal
