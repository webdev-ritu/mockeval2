function createNavbar(){
    const navbar = document.createElement('nav');
    navbar.innerHTML = `
    <ul>
        <li><a href="index.html">Home</a></li>
       <li> <a href="quiz.html">Quiz</a></li>
        <li><a href="question.html">Questions</a></li>
    </ul>
    `;
    return navbar;
}
//add the navbar to the top each page 
const navbarContainer = document.createElement('header');
navbarContainer.appendChild(createNavbar());
document.body.insertBefore(navbarContainer, document.body.firstChild);