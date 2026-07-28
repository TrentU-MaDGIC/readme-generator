
const datasetsDiv = document.getElementById("datasets");
const customDiv = document.getElementById("customSections");
const preview = document.getElementById("preview");
const contactsDiv =
  document.getElementById("contacts");

document
  .getElementById("addContact")
  .addEventListener("click", addContact);

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

function addContact(role = "", required = false) {

  const div = document.createElement("div");

  div.className = "contact";

  div.innerHTML = `
    <label>Role</label>
    <input class="contactRole" value="${role}">

    <label>Name</label>
    <input class="contactName">

    <label>ORCID</label>
    <input class="contactOrcid">

    <label>Institution</label>
    <input class="contactInstitution">

    <label>Address</label>
    <textarea class="contactAddress"></textarea>

    <label>Email</label>
    <input class="contactEmail" type="email">

    ${required ? "" : `
      <button type="button" class="removeBtn">
        Remove Contact
      </button>
    `}

  div.querySelector(".removeBtn")
    .addEventListener("click", () => {
      div.remove();
      updatePreview();
    });

  contactsDiv.appendChild(div);

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
  
  const today =
  new Date().toISOString().split("T")[0];

  out += `This readme file was generated on ${today} by ${value("generatedBy")}\n\n`;

  out += "GENERAL INFORMATION\n";
  out += "===================\n\n";

  out += `Title of Dataset: ${value("datasetTitle")}\n\n`;

  document
  .querySelectorAll(".contact")
  .forEach(contact => {

    const role =
      contact.querySelector(".contactRole").value;

    const name =
      contact.querySelector(".contactName").value;

    const orcid =
      contact.querySelector(".contactOrcid").value;

    const institution =
      contact.querySelector(".contactInstitution").value;

    const address =
      contact.querySelector(".contactAddress").value;

    const email =
      contact.querySelector(".contactEmail").value;

    out += `${role}\n`;
    out += "--------------------------\n";
    out += `Name: ${name}\n`;
    out += `ORCID: ${orcid}\n`;
    out += `Institution: ${institution}\n`;
    out += `Address: ${address}\n`;
    out += `Email: ${email}\n\n`;

  });
  
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


function validateForm() {

  const errors = [];

  if (!value("datasetTitle").trim()) {
  errors.push("Dataset Title");
  }

  if (!value("collectionDate").trim()) {
    errors.push("Date of Data Collection");
  }

  if (!value("generatedBy").trim()) {
  errors.push("README Generated By");
  }

  if (!value("location").trim()) {
    errors.push("Geographic Location");
  }


  const contacts =
    document.querySelectorAll(".contact");

  if (contacts.length < 2) {
    errors.push(
      "Principal Investigator and Co-Investigator are required"
    );
  }

  for (let i = 0; i < 2; i++) {

  const contact = contacts[i];

  const role =
    contact.querySelector(".contactRole").value;

  const name =
    contact.querySelector(".contactName").value;

  const institution =
    contact.querySelector(".contactInstitution").value;

  const email =
    contact.querySelector(".contactEmail").value;

  if (!name.trim()) {
    errors.push(`${role} Name`);
  }

  if (!institution.trim()) {
    errors.push(`${role} Institution`);
  }

  if (!email.trim()) {
    errors.push(`${role} Email`);
    }
  }

  
  if (!value("funding").trim()) {
    errors.push("Funding Sources");
  }

  const validation =
    document.getElementById("validation");

  if (errors.length === 0) {
    validation.textContent = "";
    return true;
  }

  validation.textContent =
    "Missing required fields: " +
    errors.join(", ");

  return false;
}
// ======================
// Preview
// ======================

function updatePreview() {
  validateForm();
  preview.textContent = generateReadme();
}

// ======================
// Export
// ======================

function exportReadme() {
  if (!validateForm()) {  
    alert(
      "Please complete required fields before exporting."
    );
    return;
  }
  
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

// Add contacts
addContact("Principal Investigator", true);
addContact("Co-Investigator", true);
addContact("Alternate Contact", true);

// Initial preview
updatePreview();
