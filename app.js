let showValidationErrors = false;

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
  .getElementById("exportTxtButton")
  .addEventListener("click", exportTxt);

document
  .getElementById("exportMdButton")
  .addEventListener("click", exportMarkdown);

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

    <label class="${required ? 'required' : ''}">Name</label>
    <input class="contactName">

    <label>ORCID</label>
    <input class="contactOrcid">

    <label class="${required ? 'required' : ''}">Institution</label>
    <input class="contactInstitution">

    <label>Address</label>
    <textarea class="contactAddress"></textarea>

    <label class="${required ? 'required' : ''}">Email</label>
    <input class="contactEmail" type="email">

    ${required ? "" : `
      <button type="button" class="removeBtn">
        Remove Contact
      </button>
    `}
  `;

  const removeBtn = div.querySelector(".removeBtn");

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      div.remove();
      updatePreview();
    });
  }

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

function hasContent(...fields) {
  return fields.some(
    field => field && field.trim() !== ""
  );
}

function generateMarkdown() {

  let out = "";

  const today =
    new Date().toISOString().split("T")[0];

  out += `This readme file was generated on ${today} by ${value("generatedBy")}\n\n`;

  out += "GENERAL INFORMATION\n";
  out += "===================\n\n";

  out += `Title of Dataset: ${value("datasetTitle")}\n\n`;

  // CONTACTS

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

      // Skip completely empty optional contacts
      if (
        !hasContent(
          role,
          name,
          orcid,
          institution,
          address,
          email
        )
      ) {
        return;
      }

      out += `${role}\n`;
      out += "--------------------------\n";

      if (name)
        out += `Name: ${name}\n`;

      if (orcid)
        out += `ORCID: ${orcid}\n`;

      if (institution)
        out += `Institution: ${institution}\n`;

      if (address)
        out += `Address: ${address}\n`;

      if (email)
        out += `Email: ${email}\n`;

      out += "\n";

    });

  out += `Date of data collection: ${value("collectionDate")}\n\n`;

  out += `Geographic location of data collection: ${value("location")}\n\n`;

  out += `Information about funding sources that supported the collection of the data:\n${value("funding")}\n\n`;

  // SHARING / ACCESS

  if (
    hasContent(
      value("license"),
      value("publications"),
      value("publicLocations"),
      value("ancillaryData"),
      value("derivedSource"),
      value("citation")
    )
  ) {

    out += "SHARING/ACCESS INFORMATION\n";
    out += "==========================\n\n";

    if (value("license")) {
      out += "Licenses/restrictions placed on the data:\n";
      out += value("license") + "\n\n";
    }

    if (value("publications")) {
      out += "Links to publications that cite or use the data:\n";
      out += value("publications") + "\n\n";
    }

    if (value("publicLocations")) {
      out += "Links to other publicly accessible locations of the data:\n";
      out += value("publicLocations") + "\n\n";
    }

    if (value("ancillaryData")) {
      out += "Links/relationships to ancillary data sets:\n";
      out += value("ancillaryData") + "\n\n";
    }

    if (value("derivedSource")) {
      out += "Was data derived from another source?\n";
      out += value("derivedSource") + "\n\n";
    }

    if (value("citation")) {
      out += "Recommended citation for this dataset:\n";
      out += value("citation") + "\n\n";
    }

  }

  // DATA & FILE OVERVIEW

  if (
    hasContent(
      value("fileList"),
      value("fileRelationships"),
      value("additionalData"),
      value("updatedFiles"),
      value("updateReason"),
      value("updateDate")
    )
  ) {

    out += "DATA & FILE OVERVIEW\n";
    out += "====================\n\n";

    if (value("fileList")) {
      out += "File List:\n";
      out += value("fileList") + "\n\n";
    }

    if (value("fileRelationships")) {
      out += "Relationship between files:\n";
      out += value("fileRelationships") + "\n\n";
    }

    if (value("additionalData")) {
      out += "Additional related data collected that was not included in the current data package:\n";
      out += value("additionalData") + "\n\n";
    }

    if (value("updatedFiles")) {
      out += "Name of updated file(s):\n";
      out += value("updatedFiles") + "\n\n";
    }

    if (value("updateReason")) {
      out += "Why was the file updated?\n";
      out += value("updateReason") + "\n\n";
    }

    if (value("updateDate")) {
      out += "When was the file updated?\n";
      out += value("updateDate") + "\n\n";
    }

  }

  // METHODOLOGICAL INFORMATION

  if (
    hasContent(
      value("methods"),
      value("processing"),
      value("software"),
      value("standards"),
      value("conditions"),
      value("qa"),
      value("personnel")
    )
  ) {

    out += "METHODOLOGICAL INFORMATION\n";
    out += "==========================\n\n";

    if (value("methods")) {
      out += "Description of methods used for collection/generation of data:\n";
      out += value("methods") + "\n\n";
    }

    if (value("processing")) {
      out += "Methods for processing the data:\n";
      out += value("processing") + "\n\n";
    }

    if (value("software")) {
      out += "Instrument- or software-specific information needed to interpret the data:\n";
      out += value("software") + "\n\n";
    }

    if (value("standards")) {
      out += "Standards and calibration information:\n";
      out += value("standards") + "\n\n";
    }

    if (value("conditions")) {
      out += "Environmental/experimental conditions:\n";
      out += value("conditions") + "\n\n";
    }

    if (value("qa")) {
      out += "Quality-assurance procedures:\n";
      out += value("qa") + "\n\n";
    }

    if (value("personnel")) {
      out += "People involved with sample collection, processing, analysis and/or submission:\n";
      out += value("personnel") + "\n\n";
    }

  }

  // DATASETS

  document
    .querySelectorAll(".dataset")
    .forEach(dataset => {

      const filename =
        dataset.querySelector(".filename").value;

      if (!filename.trim()) {
        return;
      }

      out += `DATA-SPECIFIC INFORMATION FOR: ${filename}\n`;
      out += "==========================================\n\n";

      const variables =
        dataset.querySelector(".variables").value;

      const rows =
        dataset.querySelector(".rows").value;

      const variableList =
        dataset.querySelector(".variableList").value;

      const missingCodes =
        dataset.querySelector(".missingCodes").value;

      const abbreviations =
        dataset.querySelector(".abbreviations").value;

      if (variables) {
        out += `Number of variables:\n${variables}\n\n`;
      }

      if (rows) {
        out += `Number of cases/rows:\n${rows}\n\n`;
      }

      if (variableList) {
        out += `Variable List:\n${variableList}\n\n`;
      }

      if (missingCodes) {
        out += `Missing data codes:\n${missingCodes}\n\n`;
      }

      if (abbreviations) {
        out += `Specialized formats or abbreviations used:\n${abbreviations}\n\n`;
      }

    });

  // CUSTOM SECTIONS

  document
    .querySelectorAll(".custom-section")
    .forEach(section => {

      const title =
        section.querySelector(".sectionTitle").value;

      const content =
        section.querySelector(".sectionContent").value;

      if (
        !hasContent(title, content)
      ) {
        return;
      }

      out += `${title}\n`;
      out += `${"=".repeat(title.length)}\n\n`;
      out += `${content}\n\n`;

    });

  return out;
}


function generateReadme() {

  let out = "";

  const today =
    new Date().toISOString().split("T")[0];

  out += `This readme file was generated on ${today} by ${value("generatedBy")}\n\n`;

  out += "GENERAL INFORMATION\n";
  out += "===================\n\n";

  out += `Title of Dataset: ${value("datasetTitle")}\n\n`;

  // CONTACTS

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

      // Skip completely empty optional contacts
      if (
        !hasContent(
          role,
          name,
          orcid,
          institution,
          address,
          email
        )
      ) {
        return;
      }

      out += `${role}\n`;
      out += "--------------------------\n";

      if (name)
        out += `Name: ${name}\n`;

      if (orcid)
        out += `ORCID: ${orcid}\n`;

      if (institution)
        out += `Institution: ${institution}\n`;

      if (address)
        out += `Address: ${address}\n`;

      if (email)
        out += `Email: ${email}\n`;

      out += "\n";

    });

  out += `Date of data collection: ${value("collectionDate")}\n\n`;

  out += `Geographic location of data collection: ${value("location")}\n\n`;

  out += `Information about funding sources that supported the collection of the data:\n${value("funding")}\n\n`;

  // SHARING / ACCESS

  if (
    hasContent(
      value("license"),
      value("publications"),
      value("publicLocations"),
      value("ancillaryData"),
      value("derivedSource"),
      value("citation")
    )
  ) {

    out += "SHARING/ACCESS INFORMATION\n";
    out += "==========================\n\n";

    if (value("license")) {
      out += "Licenses/restrictions placed on the data:\n";
      out += value("license") + "\n\n";
    }

    if (value("publications")) {
      out += "Links to publications that cite or use the data:\n";
      out += value("publications") + "\n\n";
    }

    if (value("publicLocations")) {
      out += "Links to other publicly accessible locations of the data:\n";
      out += value("publicLocations") + "\n\n";
    }

    if (value("ancillaryData")) {
      out += "Links/relationships to ancillary data sets:\n";
      out += value("ancillaryData") + "\n\n";
    }

    if (value("derivedSource")) {
      out += "Was data derived from another source?\n";
      out += value("derivedSource") + "\n\n";
    }

    if (value("citation")) {
      out += "Recommended citation for this dataset:\n";
      out += value("citation") + "\n\n";
    }

  }

  // DATA & FILE OVERVIEW

  if (
    hasContent(
      value("fileList"),
      value("fileRelationships"),
      value("additionalData"),
      value("updatedFiles"),
      value("updateReason"),
      value("updateDate")
    )
  ) {

    out += "DATA & FILE OVERVIEW\n";
    out += "====================\n\n";

    if (value("fileList")) {
      out += "File List:\n";
      out += value("fileList") + "\n\n";
    }

    if (value("fileRelationships")) {
      out += "Relationship between files:\n";
      out += value("fileRelationships") + "\n\n";
    }

    if (value("additionalData")) {
      out += "Additional related data collected that was not included in the current data package:\n";
      out += value("additionalData") + "\n\n";
    }

    if (value("updatedFiles")) {
      out += "Name of updated file(s):\n";
      out += value("updatedFiles") + "\n\n";
    }

    if (value("updateReason")) {
      out += "Why was the file updated?\n";
      out += value("updateReason") + "\n\n";
    }

    if (value("updateDate")) {
      out += "When was the file updated?\n";
      out += value("updateDate") + "\n\n";
    }

  }

  // METHODOLOGICAL INFORMATION

  if (
    hasContent(
      value("methods"),
      value("processing"),
      value("software"),
      value("standards"),
      value("conditions"),
      value("qa"),
      value("personnel")
    )
  ) {

    out += "METHODOLOGICAL INFORMATION\n";
    out += "==========================\n\n";

    if (value("methods")) {
      out += "Description of methods used for collection/generation of data:\n";
      out += value("methods") + "\n\n";
    }

    if (value("processing")) {
      out += "Methods for processing the data:\n";
      out += value("processing") + "\n\n";
    }

    if (value("software")) {
      out += "Instrument- or software-specific information needed to interpret the data:\n";
      out += value("software") + "\n\n";
    }

    if (value("standards")) {
      out += "Standards and calibration information:\n";
      out += value("standards") + "\n\n";
    }

    if (value("conditions")) {
      out += "Environmental/experimental conditions:\n";
      out += value("conditions") + "\n\n";
    }

    if (value("qa")) {
      out += "Quality-assurance procedures:\n";
      out += value("qa") + "\n\n";
    }

    if (value("personnel")) {
      out += "People involved with sample collection, processing, analysis and/or submission:\n";
      out += value("personnel") + "\n\n";
    }

  }

  // DATASETS

  document
    .querySelectorAll(".dataset")
    .forEach(dataset => {

      const filename =
        dataset.querySelector(".filename").value;

      if (!filename.trim()) {
        return;
      }

      out += `DATA-SPECIFIC INFORMATION FOR: ${filename}\n`;
      out += "==========================================\n\n";

      const variables =
        dataset.querySelector(".variables").value;

      const rows =
        dataset.querySelector(".rows").value;

      const variableList =
        dataset.querySelector(".variableList").value;

      const missingCodes =
        dataset.querySelector(".missingCodes").value;

      const abbreviations =
        dataset.querySelector(".abbreviations").value;

      if (variables) {
        out += `Number of variables:\n${variables}\n\n`;
      }

      if (rows) {
        out += `Number of cases/rows:\n${rows}\n\n`;
      }

      if (variableList) {
        out += `Variable List:\n${variableList}\n\n`;
      }

      if (missingCodes) {
        out += `Missing data codes:\n${missingCodes}\n\n`;
      }

      if (abbreviations) {
        out += `Specialized formats or abbreviations used:\n${abbreviations}\n\n`;
      }

    });

  // CUSTOM SECTIONS

  document
    .querySelectorAll(".custom-section")
    .forEach(section => {

      const title =
        section.querySelector(".sectionTitle").value;

      const content =
        section.querySelector(".sectionContent").value;

      if (
        !hasContent(title, content)
      ) {
        return;
      }

      out += `${title}\n`;
      out += `${"=".repeat(title.length)}\n\n`;
      out += `${content}\n\n`;

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

  if (!contact) {
    continue;
  }

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
    showValidationErrors = false;
      return true;
      }

if (showValidationErrors) {
  validation.textContent =
    "Missing required fields: " +
      errors.join(", ");
  } else {
    validation.textContent = "";
  }

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

function exportTxt() {
  
  showValidationErrors = true;

  if (!validateForm(true)) {
    alert(
      "Please complete required fields before exporting."
    );   
    return;
    }
  
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

function exportMarkdown() {

  showValidationErrors = true;

  if (!validateForm(true)) {

    alert(
      "Please complete required fields before exporting."
    );

    return;
  }

  const content = generateMarkdown();

  const blob = new Blob(
    [content],
    { type: "text/markdown" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "README.md";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// Add contacts
addContact("Principal Investigator", true);
addContact("Co-Investigator", true);
addContact("Alternate Contact");

// Initial preview
updatePreview();
