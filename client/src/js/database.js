import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to the database");

  // Connection to database w/ version.
  const jateDb = await openDB("jate", 1);

  // New transaction w/ database and what is being done.
  const tx = jateDb.transaction("jate", "readwrite");

  // Desired object store.
  const store = tx.objectStore("jate");

  // Store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Success.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// DONE: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Connection to database w/ version.
  const jateDb = await openDB("jate", 1);

  // New transaction w/ database and what is being done.
  const tx = jateDb.transaction("jate", "readonly");

  // Desired object store.
  const store = tx.objectStore("jate");

  // Get data from Database
  const request = store.getAll();

  // Success.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
