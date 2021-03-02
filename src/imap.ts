import imaps from "imap-simple";

const config = {
  imap: {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: "imap.mail.yahoo.com",
    port: 993,
    tls: true,
    authTimeout: 10000,
  },
};

export const fetchMessages = async () => {

  const messages = imaps.connect(config).then((connection) => {
    return connection.openBox("INBOX").then(() => {
      const searchCriteria = ["UNSEEN"];

      const fetchOptions = {
        bodies: ["HEADER", "TEXT"],
        markSeen: false,
      };

      return connection.search(searchCriteria, fetchOptions).then((results) => {
        return results;
      });
    })
  }).then(data => data)
 
  return messages;
};
