const cats = document.querySelectorAll("button");
const catname = document.getElementById("cat-name");

cats.forEach(function(cat) {
    cat.onclick = function() {
        catname.innerHTML = cat.querySelector("h2").innerHTML;

        cats.forEach(function(cat) {
            cat.classList.remove("active-cat");
        })

        cat.classList.toggle("active-cat");
    }
});