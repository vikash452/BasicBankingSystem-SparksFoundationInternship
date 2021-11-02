document.addEventListener('DOMContentLoaded',()=>{


      var swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: false,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false
        },
        slidesPerView: 4,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    var serviceLink = document.getElementById('service-link')
    // console.log(window.location)
    if(window.location.pathname == '/')
    serviceLink.href = '#services-container'
    else
    serviceLink.href = '/#services-container'

    var homePageLink = document.querySelector('.navbar-brand')
    if(window.location.pathname == '/')
    homePageLink.href = '#'
    else
    homePageLink.href = '/#'

})