var tabs = (({ tabHeaderClass, tabHeaderHighlightedClass, tabContentClass, hideContentClass, tabs }) => {

    var setupBindings = () => {
        Array.from(document.getElementsByClassName(tabHeaderClass)).forEach((tabHeaderElement) => {
            tabHeaderElement.addEventListener('click', (e) => tabHeaderClick(e));
        });
    };

    var tabHeaderClick = (e) => {
        highlightTabHeaderElement(e.target);
        if (tabs && tabs.length > 0) {
            var tab = tabs.filter((tab) => {
                return tab.headerId == e.target.id;
            })[0];
            if (tab) {
                var tabContent = document.getElementById(tab.contentId);
                if (tabContent) {
                    // show this tab and hide all others
                    hideTabContentContainers();
                    tabContent.classList.remove(hideContentClass);
                }
            }
        }
    };

    var hideTabContentContainers = () => {
        Array.from(document.getElementsByClassName(tabContentClass)).forEach((tabContentElement) => {
            tabContentElement.classList.add(hideContentClass);
        });
    };

    var highlightTabHeaderElement = (e) => {
        Array.from(document.getElementsByClassName(tabHeaderClass)).forEach((tabHeaderElement) => {
            tabHeaderElement.classList.remove(tabHeaderHighlightedClass);
        });
        e.classList.add(tabHeaderHighlightedClass);
    };

    setupBindings();
});

export { tabs };