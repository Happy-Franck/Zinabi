document.addEventListener("DOMContentLoaded", function () {
    function customEase(t, target) {
        if (t < 0.75) {
            // Jusqu'à 75%, une vitesse normale (linéaire)
            return t * target;
        } else {
            // Après 75%, ralentir à 25% de la vitesse
            let slowedProgress = 0.75 + (t - 0.75) * 0.25;
            return slowedProgress * target;
        }
    }

    function startCounter(el, target, duration) {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = (timestamp - startTime) / duration;
            progress = Math.min(progress, 1); // Assure qu'on ne dépasse pas 1

            // Applique la fonction d'interpolation custom
            let easedProgress = customEase(progress, target);
            el.textContent = Math.floor(easedProgress) + "+";

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + "+"; // Assure la valeur finale exacte
            }
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        const duration = 2000; // Durée d'animation unique pour tous
        document.querySelectorAll(".count").forEach((counter) => {
            let target = parseInt(counter.textContent, 10);
            counter.textContent = "0"; // Initialise à zéro
            startCounter(counter, target, duration);
        });
    }

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function handleScroll() {
        let section = document.getElementById("statistic");
        if (isElementInViewport(section)) {
            initCounters();
            window.removeEventListener("scroll", handleScroll); // Une seule exécution
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifie au chargement si déjà visible
});
