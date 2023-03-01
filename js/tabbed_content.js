// adapted from: https://eiji.dev/bulma-tabs-with-content.html
async function tabbedContent() {
    let tabsWithContent = (function () {
      let tabs = document.querySelectorAll(".tabs li");
      let tabsContent = document.querySelectorAll(".tab-content");

      let deactivateAllTabs = function () {
        tabs.forEach(function (tab) {
          tab.classList.remove("is-active");
        });
      };

      let hideTabsContent = function () {
        tabsContent.forEach(function (tabContent) {
          tabContent.classList.remove("is-active");
        });
      };

      let getIndex = function (el) {
        return [...el.parentElement.children].indexOf(el);
      };

      let activateTabsContent = function (tab) {
        tabsContent[getIndex(tab)].classList.add("is-active");
      };

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          deactivateAllTabs();
          hideTabsContent();
          tab.classList.add("is-active");
          activateTabsContent(tab);
        });
      })

      tabs[0].click();
    })();
  }