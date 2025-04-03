module.exports = (query)=>{
    let objectSearch ={
        keyword: "",
        regex: ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword
        // regex them i de khong phan biet in hoa va in thuong
        const regex = new RegExp(objectSearch.keyword, "i")
        objectSearch.regex = regex
    }

    return objectSearch
}