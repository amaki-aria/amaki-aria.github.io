function clearChoice() {
    var choices = document.getElementsByClassName('choice');
    for(var i = 0;i < choices.length ; i++){
        choices[i].style.display = 'none';
    }
}
clearChoice();

function choose(alphabet) {
    clearChoice();
    document.getElementById(alphabet).style.display = 'block';
}
