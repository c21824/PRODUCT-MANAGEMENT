// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click", ()=>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const title = button.getAttribute("data-title")
            let statusChange = statusCurrent == "active" ? "inactive" : "active"
            const action = path + `/${statusChange}/${title}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}
// end change status

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const inConfirm = confirm("Ban co chac muon xoa khong")
            if(inConfirm){
                const id = button.getAttribute("data-id")
                const title = button.getAttribute("data-title")
                const action = path + `/${title}?_method=DELETE`
                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}


