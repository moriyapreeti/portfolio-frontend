import ContactForm from '../../components/ContactForm';

export const metadata = { title: 'Contact', description: 'Send me a message.' };

export default function Contact() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Contact</h1>
      <p className="mb-8 mt-2 text-ink/75">Have a project or a question? Send a message and I will get back to you.</p>
      <ContactForm />
    </div>
  );
}
