function idCheck() {
    
    let idLimit = /(?=.*?\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/g;

    if (!idLimit.test($("#user_id").val() )) {
        
        alert("아이디는 영문과 숫자 조합으로 하셔야 합니다.[6~20자 사이]");
        return;
};
}

function dupCheck() {
    
    const users = ["leesuhyeon","leeheesun"];
    const userId = document.getElementById("user_id").value;
    
//    window.open("userIdPopup.html","dupCheck","width=400,height=250", false);
    
    for( let i = 0; i< users.length; i++ && userId.length > 0){
        if(userId == users[i]){
            alert(userId + "는 중복되는 아이디입니다.");
        }
//        else(let i = 0; i< users.length; i++ && userId.length > 0)
        
    };
//    if(userId.length > 0){
//        alert("사용가능한 아이디입니다.")
//        
//    };
};

