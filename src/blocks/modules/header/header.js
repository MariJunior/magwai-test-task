import debounce from "lodash/debounce";

const getHeaderHeight = () => {
  const root = document.documentElement;
  const pageHeader = document.querySelector(".page-header");

  const appHeight = () => {
    const vh = window.innerHeight * 0.01;
    root.style.setProperty("--vh", `${vh}px`);
  };

  const getHeaderHeight = () => {
    if (!pageHeader) {
      return;
    }

    const headerHeight = pageHeader.offsetHeight;
    root.style.setProperty("--header-height", `${headerHeight}px`);
  };

  const getElementsHeights = () => {
    appHeight();
    getHeaderHeight();
  };

  getElementsHeights();

  window.addEventListener("resize", debounce(getElementsHeights, 200));
};

const initMobileMenu = () => {
  const pageBody = document.querySelector(".page-body");
  const mainMenuToggler = document.querySelector("#main-menu-toggler");
  const mainMenu = document.querySelector("#main-menu");

  if (!pageBody || !mainMenuToggler || !mainMenu) {
    return;
  }

  pageBody.classList.remove("page-body--no-scroll");
  mainMenuToggler.classList.remove("page-header__burger--opened");
  mainMenu.classList.remove("page-header__navigation--opened");

  mainMenuToggler.addEventListener("click", () => {
    pageBody.classList.toggle("page-body--no-scroll");
    mainMenuToggler.classList.toggle("page-header__burger--opened");
    mainMenu.classList.toggle("page-header__navigation--opened");
  });
};

getHeaderHeight();
initMobileMenu();
