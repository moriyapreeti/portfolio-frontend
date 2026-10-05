'use client';
import { useState } from 'react';
import { API } from '../lib/api';

const field = 'w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/25';

export default function ContactForm() {
  const [s, setS] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch(API + '/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) });
      if (!r.ok) throw new Error();
      setStatus('sent');
      setS({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') return <p role="status" className="rounded-md bg-white p-5">Thanks, your message was sent. I will reply soon.</p>;

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block"><span className="mb-1 block text-sm font-medium">Name</span>
        <input required maxLength={100} className={field} value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} /></label>
      <label className="block"><span className="mb-1 block text-sm font-medium">Email</span>
        <input required type="email" className={field} value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} /></label>
      <label className="block"><span className="mb-1 block text-sm font-medium">Message</span>
        <textarea required rows={6} maxLength={5000} className={field} value={s.message} onChange={(e) => setS({ ...s, message: e.target.value })} /></label>
      {status === 'error' && <p role="alert" className="text-sm text-red-700">Your message was not sent. Check your details and try again.</p>}
      <button disabled={status === 'sending'} className="rounded-md bg-ink px-5 py-2.5 font-medium text-white hover:bg-cobalt disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
