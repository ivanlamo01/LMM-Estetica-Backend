module.exports ={
    isGoodPassword:  function(res){
            const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}(?=.*[$&+,:;=?@#|'<>.^*()%!-])/;
            return regex
            .test (res)
}
}

