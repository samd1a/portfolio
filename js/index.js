class NavigationBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <link href=./assets/css/main.css rel=stylesheet>
        <nav class="width">
        <div class="left">
            <a href="/" class="navbar-left">
                <svg class="diamond-logo drop-shadow"  xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 90 82" fill="none">
                    <path d="M45.0894 82C44.4594 82 0 20.1506 0 20.1506C0 20.1506 14.5798 0.315567 15.1198 0.135246C15.6598 -0.0450745 74.339 -0.0450745 74.879 0.135246C75.419 0.315567 89.7288 19.4294 89.9988 20.1809C90.2688 20.9325 45.7194 82 45.0894 82Z" fill="#7FE0F5"/>
                </svg>
                Sam Diamond
            </a>
        </div>
        <div class="right">
            <ul class="navbar-links">
                <li><a href="/about" class="nav-link about-link" id="about-link">About</a></li>
                <li><a href="/#projects" class="nav-link projects-link" id="project-link">Projects</a></li>
                <li><a href="/contact" class="nav-link contact-link" id="contact-link">Contact</a></li>
            </ul>
            <div class="hamburger drop-shadow">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div> 
        </div>
        </nav>
        `;

        const hamburger = this.shadowRoot.querySelector(".hamburger")
        const navMenu = this.shadowRoot.querySelector(".navbar-links")

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        })

        this.shadowRoot.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));

        var fileName = location.href.split("/").slice(-1); // retrieve filename
        fileName = fileName.toString() // convert to string

        if (fileName.indexOf('about') >= 0) { 
            this.shadowRoot.getElementById('about-link').style.color = '#5DDCF8'
        }
        else if (fileName.indexOf('contact') >= 0) {
            this.shadowRoot.getElementById('contact-link').style.color = '#5DDCF8'
        }
        else {
        }
    };
};

class FooterBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <link href=./assets/css/main.css rel=stylesheet>
        <footer>
            <div class="footer-info">
                <a href="#" class="navbar-left">
                    <svg class="diamond-logo drop-shadow"  xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 90 82" fill="none">
                        <path d="M45.0894 82C44.4594 82 0 20.1506 0 20.1506C0 20.1506 14.5798 0.315567 15.1198 0.135246C15.6598 -0.0450745 74.339 -0.0450745 74.879 0.135246C75.419 0.315567 89.7288 19.4294 89.9988 20.1809C90.2688 20.9325 45.7194 82 45.0894 82Z" fill="#7FE0F5"/>
                    </svg>
                    Sam Diamond
                </a>
                <span class="copyright-msg">© <span id="year"></span> all rights reserved</span>
            </div>
            <ul>
                <li><p class="nav-list-header">Pages</p></li>
                <li><a href="/about">About</a></li>
                <li><a href="/#projects">Projects</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <ul>
                <li><p class="nav-list-header">Contact</p></li>
                <li><a href="http://twitter.com/samd1a">Twitter</a></li>
                <li><a href="http://github.com/samd1a">Github</a></li>
                <li><a href="http://codepen.io/samdia">Codepen</a></li>
                <li><a href="mailto:sam@samdia.cf">Email</a></li>
            </ul>
            <ul>
                <li><p class="nav-list-header">Legal</p></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="https://icons8.com">Icons by icons8</a></li>
            </ul>
        </footer>
        `;
        const yearSpan = this.shadowRoot.querySelector('#year');
        const currentYear = new Date();
        yearSpan.innerText = currentYear.getFullYear();
    }};
var scrollButton = document.getElementById("scroll-button");

var Scroll = function() {
    var y = window.scrollY;
    if (y >= 200) {
        scrollButton.className = "scrollup-button box-shadow show"
    } else {
        scrollButton.className = "scrollup-button box-shadow hide"
    }
};

window.addEventListener("scroll", Scroll);

window.customElements.define('navigation-bar', NavigationBar)

window.customElements.define('footer-bar', FooterBar)

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
    entries, 
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, 
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
