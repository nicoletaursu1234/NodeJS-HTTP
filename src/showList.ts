import clearMarkup from './clearMarkup';

export default (data) => {
  let trimmedMails: Object[] = [];

  for (const mail of data) {
    const attributes: any = mail.attributes;
    const head: any = mail.parts[0].body;
    const body: string = mail.parts[1].body;

    const id: string = attributes.uid;
    const date: string = head.date;
    const subject: string = head.subject;
    const from: string = head.from;
    const to: string = head.to;
    const contentType: string = head["content-type"];

    trimmedMails.push({
      id,
      date,
      subject,
      from,
      to,
      contentType,
      body
    })
  }
  
}