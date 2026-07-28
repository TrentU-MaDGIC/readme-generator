const datasetsDiv = document.getElementById("datasets");
const customDiv = document.getElementById("customSections");
const preview = document.getElementById("preview");

// Event Listeners
document
  .getElementById("addDataset")
  .addEventListener("click", addDataset);

document
  .getElementById("addSection")
  .addEventListener("click", addSection);

document
  .getElementById("exportButton")
  .addEventListener("click", exportReadme);

document.addEventListener("input", updatePreview);

// ======================
// Dataset Functions
// ======================

function addDataset() {
  const div = document.createElement("div");

  div.className = "dataset";

  div.innerHTML = `
    <h3>Dataset/File</h3>

    <label>Filename</label>
    <input class="filename">

    <label>Number of Variables</label>
    <input class="variables">

    <label>Number of Cases / Rows</label>
    <input class="rows">

    <label>Variable List</label>
    <textarea class="variableList"></textarea>

    <label>Missing Data Codes</label>
    <textarea class="missingCodes"></textarea>

    <label>Specialized Formats / Abbreviations</label>
    <textarea class="abbreviations"></textarea>

    <button type="button" class="removeBtn">
      Remove Dataset
    </button>
  `;

  div.querySelector(".removeBtn").addEventListener(
    "click",
    () => {
      div.remove();
      updatePreview();
    }
  );

  datasetsDiv.appendChild(div);

  updatePreview();
}

// ======================
// Custom Section Functions
// ======================

function addSection() {
  const div = document.createElement("div");

  div.className = "custom-section";

  div.innerHTML = `
    <h3>Custom Section</h3>

    <label>Section Title</label>
    <input class="sectionTitle">

    <label>Section Content</label>
    <textarea class="sectionContent"></textarea>

    <button type="button" class="removeBtn">
      Remove Section
    </button>
  `;

  div.querySelector(".removeBtn").addEventListener(
    "click",
    () => {
      div.remove();
      updatePreview();
    }
  );

  customDiv.appendChild(div);

  updatePreview();
}

// ======================
// Helpers
// ======================

function value(id) {
  const element = document.getElementById(id);
  return element ? element.value : "";
}

// ======================
// README Generation
// ======================

function generateReadme() {
  let out = "";

  out += "DATE OF DATA COLLECTION\n";
  out += "=======================\n\n";
  out += value("collectionDate") + "\n\n";

  out += "GEOGRAPHIC LOCATION OF DATA COLLECTION\n";
  out += "======================================\n\n";
  out += value("location") + "\n\n";

  out += "INFORMATION ABOUT FUNDING SOURCES\n";
  out += "=================================\n\n";
  out += value("funding") + "\n\n";

  out += "SHARING/ACCESS INFORMATION\n";
  out += "==========================\n\n";

  out += "Licenses/restrictions placed on the data:\n";
  out += value("license") + "\n\n";

  out += "Links to publications that cite or use the data:\n";
  out += value("publications") + "\n\n";

  out += "Links to other publicly accessible locations of the data:\n";
  out += value("publicLocations") + "\n\n";

  out += "Links/relationships to ancillary data sets:\n";
  out += value("ancillaryData") + "\n\n";

  out += "Was data derived from another source?\n";
  out += value("derivedSource") + "\n\n";

  out += "Recommended citation for this dataset:\n";
  out += value("citation") + "\n\n";

  out += "DATA & FILE OVERVIEW\n";
  out += "====================\n\n";

  out += "File List:\n";
  out += value("fileList") + "\n\n";

  out += "Relationship between files:\n";
  out += value("fileRelationships") + "\n\n";

  out += "Additional related data:\n";
  out += value("additionalData") + "\n\n";

  out += "Updated files:\n";
  out += value("updatedFiles") + "\n\n";

  out += "Why was the file updated?\n";
  out += value("updateReason") + "\n\n";

  out += "When was the file updated?\n";
  out += value("updateDate") + "\n\n";

  out += "METHODOLOGICAL INFORMATION\n";
  out += "==========================\n\n";

  out += "Methods Used:\n";
  out += value("methods") + "\n\n";

  out += "Processing Methods:\n";
  out += value("processing") + "\n\n";

  out += "Software Information:\n";
  out += value("software") + "\n\n";

  out += "Standards and Calibration:\n";
  out += value("standards") + "\n\n";

  out += "Environmental Conditions:\n";
  out += value("conditions") + "\n\n";

  out += "Quality Assurance Procedures:\n";
  out += value("qa") + "\n\n";

  out += "Personnel:\n";
  out += value("personnel") + "\n\n";

  // DATASETS

  document.querySelectorAll(".dataset").forEach((dataset) => {
    const filename =
      dataset.querySelector(".filename").value || "[FILENAME]";

    out += `DATA-SPECIFIC INFORMATION FOR: ${filename}\n`;
    out += "========================================\n\n";

    out += "Number of Variables:\n";
    out += dataset.querySelector(".variables").value + "\n\n";

    out += "Number of Cases/Rows:\n";
    out += dataset.querySelector(".rows").value + "\n\n";

    out += "Variable List:\n";
    out += dataset.querySelector(".variableList").value + "\n\n";

    out += "Missing Data Codes:\n";
    out += dataset.querySelector(".missingCodes").value + "\n\n";

    out += "Specialized Formats or Abbreviations:\n";
    out += dataset.querySelector(".abbreviations").value + "\n\n";
  });

  // CUSTOM SECTIONS

  document.querySelectorAll(".custom-section").forEach((section) => {
    const title =
      section.querySelector(".sectionTitle").value;

    const content =
      section.querySelector(".sectionContent").value;

    if (title.trim() !== "") {
      out += title.toUpperCase() + "\n";
      out += "=".repeat(title.length) + "\n\n";
      out += content + "\n\n";
    }
  });

  return out;
}

// ======================
// Preview
// ======================

function updatePreview() {
  preview.textContent = generateReadme();
}

// ======================
// Export
// ======================

function exportReadme() {
  const content = generateReadme();

  const blob = new Blob(
    [content],
    { type: "text/plain" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "README.txt";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// Initial preview
updatePreview();
