// Button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){ 
    let url = new URL(window.location.href)
    buttonStatus.forEach(button=>{
       button.addEventListener('click', ()=>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}
// End Button Status


// Form Search 
const formSearch = document.querySelector("#form-search")
if(formSearch){
    formSearch.addEventListener('submit', (e)=>{
        // e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End form search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    let url = new URL(window.location.href)
    buttonPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
// End pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsTitle = checkboxMulti.querySelectorAll("input[name='title']")
    inputCheckAll.addEventListener("click", ()=>{
        if(inputCheckAll.checked){
            inputsTitle.forEach(input=>{
                input.checked=true
            })
        }
        else{
            inputsTitle.forEach(input=>{
                input.checked=false
            })
        }
    })

    inputsTitle.forEach(input=>{
        input.addEventListener("click", ()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='title']:checked").length
            if(countChecked==inputsTitle.length){
                inputCheckAll.checked = true
            }
            else{
                inputCheckAll.checked = false
            }
        })
    })
}

// End checkbox Multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{
        e.preventDefault()
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll(
            "input[name='title']:checked"
        )

        const typeChange = e.target.elements.type.value
        if(typeChange == "delete-all"){
            console.log(typeChange)
            const isConfirm = confirm("Ban co muon xoa cac san pham khong")
            if(!isConfirm){
                return;
            }
        }
        console.log(typeChange)
        if(inputChecked.length > 0){
            let titles = []
            const inputTitles = formChangeMulti.querySelector("input[name='titles']")
            
            inputChecked.forEach(input=>{
                const title = input.value
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    titles.push(`${title}-${position}`)
                }
                else{
                    titles.push(title)
                }
            })
            inputTitles.value = titles.join(', ')
            formChangeMulti.submit()
        }else{
            alert("Vui long chon it nhat mot ban ghi")
        }
    })
}
//End form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = showAlert.getAttribute("data-time")
    const closeAlert = showAlert.querySelector("[close-alert]")
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, parseInt(time));

    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden")
    })
}

// Upload Image

const uploadImage = document.querySelector("[upload-image]")
console.log(uploadImage)
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e)=>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}