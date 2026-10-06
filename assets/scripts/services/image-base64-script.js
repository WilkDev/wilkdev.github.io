const fileInput = document.getElementById("fileInput");
const browseButton = document.getElementById("browseButton");
const dropZone = document.getElementById("dropZone");
const results = document.getElementById("results");
const fileCount = document.getElementById("fileCount");

const MAX_FILES = 30;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

let convertedFiles = 0;
// #region
// BROWSE BUTTON
browseButton.addEventListener("click", function (event) {
    event.stopPropagation();
    fileInput.click();
});
// CLICK DROP ZONE
dropZone.addEventListener("click", function (event) {
    if (event.target === browseButton) {
        return;
    }
    fileInput.click();
});
// FILE INPUT
fileInput.addEventListener("change", function () {
    handleFiles(this.files);
    // Allows selecting the same file again
    this.value = "";
});
// DRAG OVER
dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("dragover");
});
// DRAG LEAVE
dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("dragover");
});
// DROP
dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZone.classList.remove("dragover");
    handleFiles(event.dataTransfer.files);
});
// #region HandleFiles
function handleFiles(files) {
    const fileArray = Array.from(files);
    if (fileArray.length > MAX_FILES) {
        alert(`Maximum ${MAX_FILES} files allowed.`);
        return;
    }
    for (const file of fileArray) {
        if (!file.type.startsWith("image/")) {
            alert(`${file.name} is not an image.`);
            continue;
        }


        if (file.size > MAX_FILE_SIZE) {
            alert(`${file.name} is larger than 1 MB.`);
            continue;
        }
        encodeImage(file);
    }
}
// #endregion
// #region Encode Image
function encodeImage(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const dataURI = event.target.result;
        const base64 = dataURI.split(",")[1];
        createResult(
            file, base64, dataURI
        );
    };
    reader.onerror = function () {
        alert(`Could not read ${file.name}`);
    };
    reader.readAsDataURL(file);
}
// #endregion
// #region CREATE RESULT
function createResult(file, base64, dataURI) {

    // Remove empty message
    const empty = results.querySelector(".empty");

    if (empty) { empty.remove(); }

    convertedFiles++;

    fileCount.textContent = `Completed ${convertedFiles} file${convertedFiles === 1 ? "" : "s"} converted successfully`;

    const card = document.createElement("details");
    card.className = "card shadow-sm mb-4";

    const header = document.createElement("summary");
    header.className = "card-header d-flex align-items-center gap-3";
    // Remove default browser marker
    header.style.listStyle = "none";

    // PREVIEW
    const preview = document.createElement("img");

    preview.src = dataURI;
    preview.alt = file.name;
    preview.className = "rounded border object-fit-contain flex-shrink-0";
    preview.style.width = "64px";
    preview.style.height = "64px";

    const fileInfoContainer = document.createElement("div");
    fileInfoContainer.className = "min-w-0";

    const fileName = document.createElement("div");
    fileName.className = "fw-semibold text-break";
    fileName.textContent = file.name;

    const fileInfo = document.createElement("div");
    fileInfo.className = "text-secondary small";
    fileInfo.textContent = `${formatBytes(file.size)} · ${file.type || "Unknown"}`;

    fileInfoContainer.appendChild(fileName);
    fileInfoContainer.appendChild(fileInfo);


    header.appendChild(preview);

    header.appendChild(fileInfoContainer);

    const output = document.createElement("div");
    output.className = "mt-3";

    const tabs = document.createElement("div");
    tabs.className = "nav nav-pills gap-1";

    // TAB NAMES
    const tabNames = [
        ["base64", "Raw Base64"],
        ["datauri", "Data URI"],
        ["image", "Image"],
        ["css", "CSS"],
        ["cssfull", "CSS (Full)"],
        ["markdown", "Markdown"],
        ["json", "JSON"]
    ];
    tabNames.forEach(function ([type, label], index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "nav-link btn btn-sm" + (index === 0 ? " active" : "");
        button.textContent = label;
        button.dataset.tab = type;

        button.addEventListener(
            "click", function (event) {
                event.stopPropagation();
                tabs.querySelectorAll(".nav-link")
                    .forEach(function (tab) {
                        tab.classList.remove("active");
                    });
                button.classList.add(
                    "active"
                );
                showOutput(output, type, file, base64, dataURI
                );
            }
        );
        tabs.appendChild(button);
    });

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    card.appendChild(header);
    card.appendChild(cardBody);

    cardBody.appendChild(tabs);
    cardBody.appendChild(output);
    results.prepend(card);
    showOutput(output, "base64", file, base64, dataURI);
}
// #endregion
// #region showOutput
function showOutput(output, type, file, base64, dataURI) {
    output.replaceChildren();
    let value = "";
    switch (type) {
        case "base64":
            value = base64;
            break;
        case "datauri":
            value = dataURI;
            break;
        case "image":
            value = `<img src="${dataURI}" alt="${file.name}">`;
            break;
        case "css":
            value = `background-image: url("${dataURI}");`;
            break;
        case "cssfull":
            value = `.image-${sanitizeClassName(file.name)} 
{
    background-image: url("${dataURI}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}`;
            break;
        case "markdown":
            value = `![${file.name}](${dataURI})`;
            break;
        case "json":
            value = JSON.stringify(
                {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    base64: base64,
                    dataURI: dataURI
                },
                null,
                2
            );
            break;
    }
    const outputContainer = document.createElement("div");
    outputContainer.className = "position-relative";

    const textarea = document.createElement("textarea");
    textarea.readOnly = true;
    textarea.value = value;
    textarea.className = "form-control font-monospace pe-5";
    textarea.rows = type === "json" || type === "cssfull" ? 10 : 5;
    // coppy btn
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "btn btn-sm btn-primary position-absolute top-0 end-0 m-2";
    copyButton.textContent = "Copy";
    copyButton.addEventListener(
        "click", function () {
            copyText(value, copyButton
            );
        }
    );
    // render res
    outputContainer.appendChild(textarea);
    outputContainer.appendChild(copyButton);
    output.appendChild(outputContainer);
}
// #endregion
// #region COPY
async function copyText(text, button) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }
    const originalText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(function () {
        button.textContent =
            originalText;

    }, 1000);
}
// #endregion
// #region FORMAT BYTES
function formatBytes(bytes) {
    if (bytes < 1024) {
        return `${bytes.toFixed(2)} B`;
    }
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
// #endregion
// #region SANITIZE CSS CLASS
function sanitizeClassName(name) {
    return name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
}
// #endregion