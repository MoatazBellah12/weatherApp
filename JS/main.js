$(document).ready(function () {
    $('#loading').fadeOut(800)
    $('body').css('overflow-y', 'auto')

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos < currentScrollPos && $('body').css('overflow-y') == 'auto') {
            document.getElementById("navbar").style.top = "-72px";
        } else {
            document.getElementById("navbar").style.top = "0";
        }
        prevScrollpos = currentScrollPos;
    }
    $('nav a,#menu a').click(function (e) {
        let href = $(e.target).attr('href');
        let sectionOff = $(href).offset().top;
        $('html,body').animate({ scrollTop: sectionOff }, 300);
    })
    function closeMenu() {
        $('#menu').css({ 'top': '-20px', 'opacity': '0' })
        setTimeout(function () {
            $('#menu').css('display', 'none')
        }, 500)
        $('#navIcon').removeClass('change')
        $('body').css('overflow-y', 'auto')
    }

    $('p').addClass('lead');

    $('#navIcon').click(function () {
        if ($('body').css('overflow-y') == 'auto') {
            $('body').css('overflow-y', 'hidden')
            $('#navIcon').addClass('change')
            $('#menu').css('display', 'flex')
            setTimeout(function () {
                $('#menu').css({ 'top': '0', 'opacity': '1' })
            }, 1)
        } else {
            closeMenu();
        }
    })
    $('#menu a').click(function () {
        closeMenu();
    })
    $('#mobile_app a').click(function () {
        $('#mobile_app .mess').fadeIn(500)
    })
    $('#subscribe a').click(function () {
        $('#subscribe .mess').fadeIn(500)
    })
    async function getData(city) {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=187aaa867eb14f7aab2123031211106&days=3&q=${city}`)
        let responseData = await response.json();
        currentDay(responseData);
        next2Days(responseData);
    }
    getData('cairo');
    $('#searchBox').keyup(function () {
        let searchValue = $('#searchBox').val();
        getData(`${searchValue}`);
    });
    (function getDate() {
        const d = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day1 = d.getDay() + 1
        let day2 = d.getDay() + 2 > 6 ? d.getDay() - 5 : d.getDay() + 2;
        if (day1 == days[days.length]) {
            day1 = days[0]
        }

        $('#day').text(`${days[d.getDay()]}`)
        $('#day1').text(`${days[day1]}`)
        $('#day2').text(`${days[day2]}`)
        $('#date').text(`${d.getDate()} ${months[d.getMonth()]}`)
    })();
    function currentDay(responseData) {
        $('#tempDeg').text(`${responseData.current.temp_c}`)
        $('#desc').text(`${responseData.current.condition.text}`)
        $('#city').text(`${responseData.location.name}`)
        $('#humidityRatio').text(`${responseData.current.humidity}`)
        $('#windSpeed').text(`${responseData.current.wind_kph}`)
        $('#windDir').text(`${responseData.current.wind_dir}`)
        $('#tempIcon img').attr('src', `https:${responseData.current.condition.icon}`)
    }
    function next2Days(responseData) {
        for (let i = 1; i < 3; i++) {
            $(`#maxDegDay${i}`).text(`${responseData.forecast.forecastday[i].day.maxtemp_c}`)
            $(`#minDegDay${i}`).text(`${responseData.forecast.forecastday[i].day.mintemp_c}`)
            $(`#desc${i}`).text(`${responseData.forecast.forecastday[i].day.condition.text}`)
            $(`#tempIconDay${i} img`).attr('src', `https:${responseData.forecast.forecastday[i].day.condition.icon}`)
        }
    }
});