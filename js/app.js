document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("content/site-content.json");

        if (!response.ok) {
            throw new Error("Content file could not be loaded.");
        }

        const content = await response.json();

        document.querySelectorAll("[data-content]").forEach((element) => {
            const key = element.dataset.content;
            const value = getNestedValue(content, key);

            if (value !== undefined) {
                element.textContent = value;
            }
        });

        document.querySelectorAll("[data-content-list]").forEach((element) => {
            const key = element.dataset.contentList;
            const items = getNestedValue(content, key);

            if (Array.isArray(items)) {
                renderContentList(element, items);
            }
        });

    } catch (error) {
        console.error("Content loading error:", error);
    }
});

function getNestedValue(object, path) {
    return path.split(".").reduce((current, key) => {
        return current?.[key];
    }, object);
}

function renderContentList(container, items) {
    container.innerHTML = "";

    items.forEach((item) => {
        const article = document.createElement("article");
        article.className = "content-card";

        article.innerHTML = `
            <h3>${item.title || ""}</h3>
            <p>${item.description || ""}</p>
        `;

        container.appendChild(article);
    });
}
