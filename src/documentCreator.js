const docx = require("docx");
const { Document, Paragraph, Packer, TextRun } = docx;

// reference from https://www.npmjs.com/package/docx
function create(data) {
    const experiences = data[0].experiences;
    const educations = data[0].education;
    const skills = data[0].skills;
    const certificates = data[0].certificates;
    const summary = data[0].summary;

    const document = new Document();
    debugger
    document.addParagraph(new Paragraph(summary.name).title());
    document.addParagraph(new Paragraph(summary.contact));
    document.addParagraph(createRoleText(`${summary.headline}`));
    document.addParagraph(createHeading("Education"));

    for (const education of educations) {
        document.addParagraph(
            createInstitutionHeader(education.school, `${education.from} - ${education.to}`)
        );
        document.addParagraph(createRoleText(`${education.major} - ${education.degree}`));

        document.addParagraph(new Paragraph().addRun(new TextRun(education.dest)));

    }

    document.addParagraph(createHeading("Experience"));

    for (const position of experiences) {
        document.addParagraph(
            createInstitutionHeader(
                position.company,
                position.from + " - " + position.to
            )
        );
        document.addParagraph(createRoleText(position.title + " in " + position.depart));
        // document.addParagraph(new Paragraph().addRun(new TextRun(position.dest)));

        const bulletPoints = splitParagraphIntoBullets(position.dest);

        bulletPoints.forEach((bulletPoint) => {
            document.addParagraph(createBullet(bulletPoint));
        });
    }

    document.addParagraph(createHeading("Skills"));

    for (const skill of skills) {
      let skilltext = skill.skill
      if(skill.Details!==null){
        skilltext = skilltext + ": " + skill.Details
      }
      document.addParagraph(createBullet(skilltext))
    }

    document.addParagraph(createHeading("Certificates"));

    for (const cert of certificates) {
      let certtext = cert.cert
      if(cert.frommonth!==null && cert.tomonth!==null){
        certtext = certtext + " (" + cert.frommonth + "." + cert.fromyear + " - " + cert.tomonth + "." + cert.toyear + ")"
      }
      document.addParagraph(createBullet(certtext))
    }


    document.Footer.createParagraph("This CV was generated in real-time by mslingsu.com.");
    return document;
}

function createHeading(text) {
    return new Paragraph(text).heading1().thematicBreak();
}

function createSubHeading(text) {
    return new Paragraph(text).heading2();
}

function createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).bold();
    const date = new TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
}

function createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).italic();

    paragraph.addRun(role);

    return paragraph;
}

function createBullet(text) {
    return new Paragraph(text).bullet();
}

function splitParagraphIntoBullets(text) {
    return text.split("\n");
}


module.exports = {
  create: create
}
