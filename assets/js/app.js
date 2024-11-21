
'use strict';

import { fetchData } from "./api.js";


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


/**
 * Work width api
 */

const $searchSubmit = document.querySelector("[data-search-submit]");

let apiUrl = "https://api.github.com/users/codewithsadee"
let repoUrl, followerUrl, followingUrl = "";

const searchUser = function () {
    if (!$searchField.value) return;

    apiUrl = `https://api.github.com/users/${$searchField.value}`;
}

$searchSubmit.addEventListener("click", searchUser);



$searchField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchUser();
});



const $profileCard = document.querySelector("[data-profile-card]");
const $repoPanel = document.querySelector("[data-repo-panel]");