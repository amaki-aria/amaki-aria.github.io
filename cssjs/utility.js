// Themes
function changeTheme(name) {
    if (name == 'night') {
        document.getElementById("mainview").classList.add("bg-dark", "text-white");
        document.getElementById("body").style.backgroundColor = "black";
        document.getElementById("footer").classList.add("text-white");
    }
    if (name == 'day') {
        document.getElementById("mainview").classList.remove("bg-dark", "text-white");
        document.getElementById("body").style.backgroundColor = "white";
        document.getElementById("footer").classList.remove("text-white");
    }
}

// First get that pageinfo thing working
if (document.getElementById("pageInfo") != null) {
    pageInfo = document.getElementById("pageInfo").innerText;
    pageInfo = JSON.parse(pageInfo);
}

// Jump pages on left & right arrow
if (pageInfo.kind == 'page') {
    document.addEventListener('keydown', keyproc); // Listen the keys
    function keyproc(k) {
        if (k.code == 'ArrowRight') {
            window.location.href = document.getElementById("nextlink").href;
        } else if (k.code == "ArrowLeft") {
            window.location.href = document.getElementById("prevlink").href;
        } else if (k.code == 'KeyZ'){
            window.scrollBy({top:window.innerHeight/2, left:0, behavior:'smooth'});
        }
    }
}



// The bookmark and saving progress thing.
// first get that json out from localstorage
if (localStorage.getItem('bookmark') != null) {
    bookmark = JSON.parse(localStorage.getItem('bookmark'));
} else {
    bookmark = {};
}
// flush bookmark to localstorage
function flushbm() {
    stringified = JSON.stringify(bookmark);
    localStorage.setItem('bookmark', stringified);
    console.log(localStorage.getItem('bookmark')); //LOG
}
// add a bookmark
function addBookmark() {
    bm = { 'title': pageInfo.title, 'link': pageInfo.link, 'inSection': pageInfo.currentSection };
    // Detect duplicate keys:
    for(keys in bookmark){
        if(bookmark[keys].title == pageInfo.title) return;
    }
    bookmark[(new Date().getTime())] = bm;
    flushbm();
}
// delete a bookmark
function removebm(key){
    delete bookmark[key];
    flushbm();
    populateBmSection();
}

// toggle the menu display
function toggleBmDisplay(){
    widget = document.getElementById("bmcard");
    if(widget.hidden == true){
        widget.hidden = false;
    } else {
        widget.hidden = true;
    }
    populateBmSection()
}

function populateBmSection(){
    var widget = document.getElementById("bookmarksSection");
    var injhtml = "<table class='table'>";
    for(key in bookmark){
        injhtml = injhtml + 
        `<tr>
        <td> <a href="${bookmark[key].link}">${bookmark[key].title}</a> </td>
        <td> <button class="btn" onclick="removebm(${key})"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zm-2 7.75a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5z"></path></svg>
        </button> </td>
        </tr>`;
    }
    injhtml += "</table>"
    widget.innerHTML = injhtml;
}