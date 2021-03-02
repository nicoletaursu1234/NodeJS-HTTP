import ImapClient from "emailjs-imap-client";

const client = new ImapClient("imap.mail.yahoo.com", 5500, {
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD,
  },
});

client.connect().then(() => console.log("Connected to client"));

export const listBoxes = async () => {
  return await client.listMailboxes().then((mailboxes) => {
    console.log(mailboxes);
  });
};
