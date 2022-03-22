import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash("200116", 8);

  await connection.query(
    `INSERT INTO profiles(id, name, email, password, username)
     VALUES('${id}', 'Gabriel Piccoli', 'gabriel.pdmarcos@gmail.com', '${password}', 'admin')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
