/* =========================================
   MUSIC
========================================= */

function getMusic() {

    return document.getElementById(
        "birthdayMusic"
    );

}


function saveMusicTime() {

    const music = getMusic();

    if (!music) {
        return;
    }

    sessionStorage.setItem(
        "birthdayMusicTime",
        music.currentTime
    );

}


function restoreMusic() {

    const music = getMusic();

    if (!music) {
        return;
    }


    const savedTime =
        sessionStorage.getItem(
            "birthdayMusicTime"
        );


    music.addEventListener(
        "loadedmetadata",
        function () {

            if (savedTime) {

                const time =
                    parseFloat(savedTime);

                if (
                    !isNaN(time) &&
                    time >= 0 &&
                    time < music.duration
                ) {

                    music.currentTime =
                        time;

                }

            }


            music.play().catch(
                function () {

                    console.log(
                        "Music needs user interaction."
                    );

                }
            );

        }
    );


    setInterval(
        function () {

            if (!music.paused) {

                saveMusicTime();

            }

        },
        500
    );


    document.addEventListener(
        "click",
        function () {

            if (music.paused) {

                music.play().catch(
                    function () {}
                );

            }

        }
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );

    if (!container) {
        return;
    }


    const symbols = [

        "❤️",
        "💖",
        "💕",
        "✨",
        "🌸",
        "🌷",
        "🎉",
        "🎈"

    ];


    for (
        let i = 0;
        i < 50;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDelay =
            Math.random() * 5 + "s";


        piece.style.animationDuration =
            3 + Math.random() * 4 + "s";


        container.appendChild(
            piece
        );

    }

}


/* =========================================
   GALLERY
========================================= */

function initGallery() {


    const TOTAL_PHOTOS = 35;

    const PHOTO_TIME = 5000;


    const image =
        document.getElementById(
            "slideshowImage"
        );


    const number =
        document.getElementById(
            "photoNumber"
        );


    const message =
        document.getElementById(
            "memoryMessage"
        );


    const pauseBtn =
        document.getElementById(
            "pauseBtn"
        );


    const ending =
        document.getElementById(
            "galleryEnding"
        );


    if (
        !image ||
        !number ||
        !message ||
        !pauseBtn
    ) {

        return;

    }


    let currentPhoto = 1;

    let paused = false;

    let timer = null;

    let finished = false;


    const messages = [

        "❤️ ఒక అందమైన జ్ఞాపకం ❤️",

        "💕 ఈ క్షణం ఎప్పటికీ ప్రత్యేకమే 💕",

        "✨ ఒక అందమైన రోజు... ఒక అందమైన జ్ఞాపకం ✨",

        "🌸 ఈ ఫోటోలో ఒక చిన్న కథ ఉంది 🌸",

        "💖 ఈ క్షణం ఎప్పటికీ గుర్తుండిపోవాలి 💖",

        "😊 ఈ జ్ఞాపకం ఒక అందమైన చిరునవ్వు",

        "🌷 ప్రతి జ్ఞాపకానికి ఒక ప్రత్యేకమైన విలువ ఉంది 🌷",

        "✨ ఈ క్షణాలు ఎప్పటికీ మర్చిపోలేం ✨"

    ];


    const effects = [

        "effectZoomIn",

        "effectZoomOut",

        "effectSlideLeft",

        "effectSlideRight",

        "effectSoft",

        "effectRotate"

    ];


    function showPhoto() {


        effects.forEach(
            function (effect) {

                image.classList.remove(
                    effect
                );

            }
        );


        image.src =
            "../images/p" +
            currentPhoto +
            ".jpeg";


        number.textContent =
            currentPhoto +
            " / " +
            TOTAL_PHOTOS;


        message.textContent =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        const effect =
            effects[
                Math.floor(
                    Math.random() *
                    effects.length
                )
            ];


        void image.offsetWidth;

        image.classList.add(
            effect
        );

    }


    function nextPhoto() {


        if (paused) {
            return;
        }


        if (
            currentPhoto <
            TOTAL_PHOTOS
        ) {

            currentPhoto++;

            showPhoto();

        }

        else {

            finishGallery();

        }

    }


    function startTimer() {

        clearInterval(timer);


        timer =
            setInterval(
                nextPhoto,
                PHOTO_TIME
            );

    }


    function finishGallery() {


        if (finished) {
            return;
        }


        finished = true;


        clearInterval(timer);


        if (ending) {

            ending.classList.add(
                "show"
            );


            setTimeout(
                function () {

                    ending.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                },
                400
            );

        }

    }


    pauseBtn.addEventListener(
        "click",
        function () {


            paused =
                !paused;


            if (paused) {

                pauseBtn.textContent =
                    "▶ Play";

            }

            else {

                pauseBtn.textContent =
                    "⏸ Pause";

            }

        }
    );


    showPhoto();

    startTimer();

}