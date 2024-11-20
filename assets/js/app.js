
'use strict';


const addEventOnElements = function ($elements, eventType, callback) {
    for (const $item of $elements) {
        $item.addEventListener(eventType, callback);
    }
};

/**
 * Header scroll state
 */

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

/**
 * Search toggle
 */

const $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const $searchField = document.querySelector("[data-search-field]");
let isExpanded = false;

addEventOnElements($searchTogglers, "click", function () {
    $header.classList.toggle("search-active");
    isExpanded = !isExpanded;
    this.setAttribute("aria-expanded", isExpanded);
    $searchField.focus();
});

/**
 * TAB NAVIGATION
 */
const $tabBtns = document.querySelectorAll("[data-tab-btn]");

const $tabpanels = document.querySelectorAll("[data-tab-panel]");

let [$lastActiveTabBtn] = $tabBtns;
let [$lastActiveTabPanel] = $tabpanels;

addEventOnElements($tabBtns, "click", function () {
    $lastActiveTabBtn.setAttribute("aria-selected", false);
    $lastActiveTabPanel.setAttribute("hidden", "");

    this.setAttribute("aria-selected", true);
    const $currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
    $currentTabPanel.removeAttribute("hidden");

    $lastActiveTabBtn = this;
    $lastActiveTabPanel = $currentTabPanel;
})


/**
 * Keyboard accessibility for tab buttons
 */

addEventOnElements($tabBtns, "keydown", function (e) {
    const $nextElement = this.$nextElementSibling;
    const $previousElement = this.$previousElementSibling;

    if  (e.key === "ArrowRight" && $nextElement) {
       this.setAttribute("tabindex", -1);
       $nextElement.setAttribute("tabindex", 0);
       $nextElement.focus();
    } else if (e.key === "ArrowLeft" && $previousElement) {
        this.setAttribute("tabindex", -1);
        $previousElement.setAttribute("tabindex", 0);
        $previousElement.focus();
    }           
});