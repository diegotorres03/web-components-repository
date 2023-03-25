const accordions = document.querySelectorAll('.accordion')
        
        accordions.forEach(accordion => {
            accordion.addEventListener('click',e =>{

                let toggleSigns = accordion.querySelector('.accordion-sign')

                accordion.classList.toggle('active')
                toggleSigns.classList.toggle('icon-menu-up')

            })
        })