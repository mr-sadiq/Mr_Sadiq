jQuery(window).on('load', function() {
	"use strict";
    
    
    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");   
    
    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 700 );

    
});


jQuery(document).ready(function($) {
	"use strict";
    
    
    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {
        
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 500);
        
    });
    
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated", { 
        duration: 600,
        delay: 0,
        origin: "left",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });
    
    
    // AJAX CONTACT FORM SUBMIT
    $("#contact-form").submit(function(e) {

        e.preventDefault();
        var postdata = $(this).serialize();

        $.ajax({

            type: "POST",
            url: "assets/php/contact.php",
            data: postdata,
            dataType: "json",
            success: function(json) {

                $("#contact-form input, #contact-form textarea").removeClass("error");

                setTimeout(function(){

                    if (json.nameMessage !== "") {

                        $("#contact-form-name").addClass("error");

                    }

                    if (json.emailMessage !== "") {

                        $("#contact-form-email").addClass("error");

                    }

                    if (json.messageMessage !== "") {

                        $("#contact-form-message").addClass("error");

                    }

                }, 10);

                if (json.nameMessage === "" && json.emailMessage === "" && json.messageMessage === "") {

                    $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                    $('#contact-form').addClass("success");
                    $('#contact-form textarea, #contact-form input').val("");
                    
                    setTimeout(function(){
                        
                        $('#contact-form').removeClass("success");
                        
                    },4000);

                }

            }

        });

    });

    
});
//  ---->  Here  <----

//   var typed = new Typed("#text-ani", {
//     strings: ["Frontend Developer", "Web Developer"],
//     typeSpeed: 100,
//     backSpeed: 100,
//     backDelay: 1000,
//     loop: true,
//   });
const textArray = ["Frontend Developer", "Web Developer"];
let currentTextIndex = 0;
let currentLetterIndex = 0;
const textElement = document.querySelector(".text");
const typingSpeed = 100; // Speed of typing in milliseconds

function typeText() {
  // Get the current text to type
  const currentText = textArray[currentTextIndex];

  // Type one letter at a time
  if (currentLetterIndex < currentText.length) {
    textElement.innerHTML += currentText.charAt(currentLetterIndex);
    currentLetterIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    // After typing the current word, wait for a moment and then erase it
    setTimeout(() => {
      eraseText();
    }, 1000);
  }
}

function eraseText() {
  const currentText = textArray[currentTextIndex];

  if (currentLetterIndex > 0) {
    // Erase one letter at a time
    textElement.innerHTML = currentText.substring(0, currentLetterIndex - 1);
    currentLetterIndex--;
    setTimeout(eraseText, typingSpeed);
  } else {
    // Move to the next word
    currentTextIndex = (currentTextIndex + 1) % textArray.length;
    setTimeout(typeText, 500); // Delay before typing the next word
  }
}

// Start typing the first word
typeText();
