const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const crypto = require("crypto");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(readResult);
    console.table(result);
    return JSON.parse(readResult);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => {
      return contact.id === contactId.toString();
    });

    if (contact) {
      console.log(contact);
    } else {
      console.log(`null`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching contacts: ${error.message}`);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    const deletedContact = contacts.find((contact) =>
      contact.id === contactId.toString() ? contact : null
    );
    const stringifiedContacts = JSON.stringify(updatedContacts);

    if (!deletedContact) {
      console.log("null");
    } else {
      console.log(deletedContact);
    }

    fs.writeFile(contactsPath, stringifiedContacts, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("File written successfully.");
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: crypto.randomBytes(16).toString("hex"),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();

  const newArray = [...contacts, newContact];
  console.log(newContact);

  const updatedArray = JSON.stringify(newArray);

  fs.writeFile(contactsPath, updatedArray, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File written successfully.");
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
