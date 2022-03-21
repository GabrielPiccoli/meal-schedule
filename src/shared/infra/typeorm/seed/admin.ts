import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash("SOpf@@BbdVsD", 8);

  await connection.query(
    `INSERT INTO profiles(id, name, email, user, password)
     VALUES('${id}', 'Suporte TBrWeb', 'suporte@tbrweb.com.br', 'balaminut', '${password}')
    `
  );

  await connection.close();
}

create().then(() => console.log("User balaminut created!"));
