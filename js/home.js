document.addEventListener("DOMContentLoaded", init);


const SECTIONS = [
    "hero",
    "about",
    "journey",
    "skills",
    "projects",
    "contact"
];


/* ==========================
   Init
========================== */
async function init(){

    try{

        await Promise.all([
            loadHTML("header.html", "headerContainer"),
            loadHTML("footer.html", "footerContainer"),
            loadSections()
        ]);


        initNavigation();

        initHero();

        initScrollSpy();

        initRevealAnimation();

        setYear();

        initScrollTop();

    }catch(error){

        console.error(
            "Init Error:",
            error
        );

    }finally{

        hideLoader();

    }

}



/* ==========================
   Load HTML
========================== */
async function loadHTML(
    file,
    containerId
){

    const container =
        document.getElementById(
            containerId
        );

    if(!container) return;


    const response =
        await fetch(file);


    if(!response.ok){

        throw new Error(
            file + " not found"
        );

    }


    container.innerHTML =
        await response.text();

}



/* ==========================
   Load Sections
========================== */
async function loadSections(){

    const content =
        document.getElementById(
            "content"
        );


    if(!content) return;


    const requests =
        SECTIONS.map(
            async function(name){

                try{

                    const response =
                        await fetch(
                            `sections/${name}.html`
                        );


                    if(!response.ok){

                        throw new Error(
                            name + " missing"
                        );

                    }


                    const html =
                        await response.text();


                    const section =
                        document.createElement(
                            "section"
                        );


                    section.id = name;

                    section.className =
                        "fade-section";


                    section.innerHTML =
                        html;


                    return section;

                }catch(error){

                    console.error(
                        error
                    );

                    return null;

                }

            }
        );


    const sections =
        await Promise.all(
            requests
        );


    const fragment =
        document.createDocumentFragment();


    sections.forEach(
        function(section){

            if(section){

                fragment.appendChild(
                    section
                );

            }

        }
    );


    content.appendChild(
        fragment
    );

}



/* ==========================
   Navigation
========================== */
function initNavigation(){

    const toggle =
        document.getElementById(
            "navToggle"
        );


    const nav =
        document.getElementById(
            "navLinks"
        );


    if(
        !toggle ||
        !nav
    ) return;



    toggle.addEventListener(
        "click",

        function(){

            nav.classList.toggle(
                "show"
            );

        }
    );



    nav.addEventListener(
        "click",

        function(event){

            if(
                event.target.tagName ===
                "A"
            ){

                nav.classList.remove(
                    "show"
                );

            }

        }
    );

}



/* ==========================
   Hero
========================== */
function initHero(){

    typeHeroText();

    animateCounters();

}



/* Typing */
function typeHeroText(){

    const target =
        document.getElementById(
            "typingText"
        );


    if(!target) return;


    const text =
        "Suman K S | Backend Engineer";


    let index = 0;


    const timer =
        setInterval(
            function(){

                target.textContent +=
                    text[index];


                index++;


                if(
                    index >=
                    text.length
                ){

                    clearInterval(
                        timer
                    );

                }

            },

            80
        );

}



/* Counter */
function animateCounters(){

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if(!counters.length)
        return;


    counters.forEach(
        function(counter){

            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;


            const step =
                Math.ceil(
                    target / 40
                );


            const timer =
                setInterval(
                    function(){

                        current +=
                            step;


                        if(
                            current >=
                            target
                        ){

                            current =
                                target;


                            clearInterval(
                                timer
                            );

                        }


                        counter.textContent =
                            current + "+";


                    },

                    40
                );

        }
    );

}



/* ==========================
   Scroll Spy
========================== */
function initScrollSpy(){

    const links =
        document.querySelectorAll(
            '#navLinks a[href^="#"]'
        );


    if(!links.length)
        return;


    const observer =
        new IntersectionObserver(

            function(entries){

                entries.forEach(
                    function(entry){

                        if(
                            !entry.isIntersecting
                        ) return;


                        links.forEach(
                            function(link){

                                link.classList.remove(
                                    "active"
                                );


                                if(

                                    link.getAttribute(
                                        "href"
                                    ) ===

                                    "#" +
                                    entry.target.id

                                ){

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },

            {
                threshold:.4
            }

        );



    SECTIONS.forEach(
        function(id){

            const section =
                document.getElementById(
                    id
                );


            if(section){

                observer.observe(
                    section
                );

            }

        }
    );

}



/* ==========================
   Reveal Animation
========================== */
function initRevealAnimation(){

    const sections =
        document.querySelectorAll(
            ".fade-section"
        );


    if(!sections.length)
        return;


    const observer =
        new IntersectionObserver(

            function(entries){

                entries.forEach(
                    function(entry){

                        if(
                            entry.isIntersecting
                        ){

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            {
                threshold:.2
            }

        );



    sections.forEach(
        function(section){

            observer.observe(
                section
            );

        }
    );

}



/* ==========================
   Footer Year
========================== */
function setYear(){

    const year =
        document.getElementById(
            "year"
        );


    if(year){

        year.textContent =
            new Date()
            .getFullYear();

    }

}



/* ==========================
   Loader
========================== */
function hideLoader(){

    const loader =
        document.getElementById(
            "loader"
        );


    if(!loader) return;


    setTimeout(
        function(){

            loader.classList.add(
                "fade-out"
            );

        },

        500
    );

}



/* ==========================
   Scroll Top
========================== */
function initScrollTop(){

    const btn =
        document.getElementById(
            "scrollTopBtn"
        );


    if(!btn) return;



    window.addEventListener(
        "scroll",

        function(){

            btn.classList.toggle(

                "show",

                window.scrollY >
                300

            );

        }
    );



    btn.addEventListener(
        "click",

        function(){

            window.scrollTo({

                top:0,

                behavior:
                    "smooth"

            });

        }
    );

}