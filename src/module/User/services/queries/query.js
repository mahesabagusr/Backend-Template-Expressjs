// import { nanoid } from 'nanoid';
// import bcrypt from 'bcrypt';


export default class Query {
  constructor(db) {
    this.db = db;
  }

  // async userRegister(payload) {
  //   const { username, firstName, lastName, email, password } = payload;
  //   const [emailExist] = await this.db.query('SELECT COUNT(*) as cnt FROM users WHERE email = ? ', {
  //     replacements: [email]
  //   })

  //   if (emailExist[0].cnt) {
  //     return wrapper.error()
  //   }
  // }

  async getUserByEmailOrUsername(payload) {
    try {
      const [data] = await this.db.query('SELECT * from users WHERE email  = ? || username = ?', {
        replacements: [payload || "", payload || ""]
      });

      return data[0];

    } catch (e) {
      console.log(e)
    }
  }

  async emailExist(payload) {
    try {
      const { email } = payload;
      const [emailExist] = await this.db.query('SELECT COUNT(email) as cnt FROM users WHERE email = ? ', {
        replacements: [email]
      });
      return emailExist[0].cnt;

    } catch (e) {
      console.log(e)
    }

  }

  async usernameExist(payload) {
    try {
      const { username } = payload;
      const [usernameExist] = await this.db.query('SELECT COUNT(username) as cnt from users WHERE username  = ?', {
        replacements: [username]
      });

      return usernameExist[0].cnt;
    } catch (e) {
      console.log(e)
    }
  }

  async checkEmail(payload) {
    try {
      const { email, username = "" } = payload;
      const [checkEmail] = await this.db.query('SELECT email,username from users WHERE email  = ? || username = ?', {
        replacements: [email || "", username || ""]
      });

      return checkEmail[0];

    } catch (e) {
      console.log(e)
    }
  }

  async checkPassword(payload) {
    try {
      const { password } = payload;

      const [checkPassword] = await this.db.query('SELECT password from users WHERE password  = ?', {
        replacements: [password]
      });

      return checkPassword[0];

    } catch (e) {
      console.log(e)
    }
  }






  // async insertProduct(document) {
  //   const { name, categories, price, details, isActive, id_categories } = document;
  //   const result = await this.db.prepareQuery(
  //     'INSERT INTO produk (name, categories, price, details, isActive, id_categories) VALUES (?,?,?,?,?,?)',
  //     [name, categories, price, details, isActive, id_categories]
  //   );
  //   return result;
  // }

  // async updateOneProduct(document, id) {
  //   const { name, categories, price, details, id_categories } = document;
  //   const result = await this.db.prepareQuery(
  //     'UPDATE produk SET name = ?, categories = ?, price = ?, details = ?, id_categories = ? WHERE id = ?',
  //     [name, categories, price, details, id_categories, id]
  //   );
  //   return result;
  // }

  // async deleteOneProduct(id) {
  //   const result = await this.db.prepareQuery(
  //     'DELETE FROM produk WHERE id = ?', id);
  //   return result;
  // }


}

// module.exports = Command;
