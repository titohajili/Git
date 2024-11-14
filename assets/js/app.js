
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
