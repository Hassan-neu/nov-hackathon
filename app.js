const myHeader = document.querySelector(".header");
const myStore = document.querySelector(".user-info");
const myAlerts = document.querySelector(".alert-btn");
const input = document.querySelector("input[type='search']");
const closeModal = document.querySelector(".close-modal");
const planModal = document.querySelector(".plan-modal");
const progressBar = document.querySelector(".progress-bar span");
const completed = document.querySelector(".guide-progress>span");
const mainContent = document.querySelector(".main-content");
const contentArrow = document.querySelector(".content-arrow");
const setupStep = document.querySelectorAll(".setup");
const setupBtn = document.querySelectorAll(
    ".setup-details>button:nth-of-type(1)"
);

myStore.addEventListener("click", () => {
    myHeader.classList.contains("alert-pop-visible") &&
        myHeader.classList.remove("alert-pop-visible");

    myHeader.classList.toggle("user-info-visible");
});
myAlerts.addEventListener("click", () => {
    myHeader.classList.contains("user-info-visible") &&
        myHeader.classList.remove("user-info-visible");

    myHeader.classList.toggle("alert-pop-visible");
});
closeModal.addEventListener("click", () => planModal.classList.add("closed"));
setupBtn.forEach((btn, i) =>
    btn.addEventListener("click", () => {
        const indx = i < setupBtn.length - 1 ? i + 1 : i;
        const progressMax = setupBtn.length;
        if (setupStep[i].dataset.checked) {
            setupStep[i].removeAttribute("data-checked");
            Array.from(setupStep).map((step) => {
                if (step.classList.contains("setup-visible")) {
                    step.classList.remove("setup-visible");
                }
            });
            setupStep[i].classList.add("setup-visible");
        } else {
            setupStep[i].setAttribute("data-checked", "true");
            Array.from(setupStep).map((step) => {
                if (step.classList.contains("setup-visible")) {
                    step.classList.remove("setup-visible");
                }
            });
            if (!setupStep[indx].dataset.checked) {
                setupStep[indx].classList.add("setup-visible");
            }
        }
        const checked = Array.from(setupStep).reduce(
            (acc, curr) => (curr.dataset.checked ? acc + 1 : acc),
            0
        );
        progressBar.style.flexBasis = `${(checked / progressMax) * 100}%`;
        completed.textContent = `${checked} / ${progressMax} completed`;
        console.log({ progressMax, checked });
        console.log(indx);
    })
);

setupStep.forEach((step) =>
    step.addEventListener("click", (e) => {
        if (e.target.matches("button, svg, circle, path")) return;
        Array.from(setupStep).map(
            (step) =>
                step.classList.contains("setup-visible") &&
                step.classList.remove("setup-visible")
        );
        if (!step.classList.contains("setup-visible")) {
            step.classList.add("setup-visible");
        }
    })
);

contentArrow.addEventListener("click", () => {
    mainContent.classList.toggle("content-visible");
});
input.addEventListener("focus", () =>
    document.querySelector(".header-search").classList.add("isfocused")
);
input.addEventListener("blur", () =>
    document.querySelector(".header-search").classList.remove("isfocused")
);
