import React, { useState } from 'react';
import { http } from '../helpers/utils';

type FormData = {
  message: string;
  category: string;
  email: string;
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    message: '',
    category: 'general',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log('Form submitted:', formData);
    http.post('/contact',{subject:formData.category,message: formData.message,email:formData.email})
    .then(data=>{
      alert("Your message have been received. thank you")
    })
    .catch(err=>{
        alert("Failed to send message please try again.")
    })
    // Reset form
    setFormData({...{ message: '', category: 'general', email: '' }});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="category" className="block mb-2 text-[#d1d0c5]">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 rounded bg-[#2c2e31] text-[#d1d0c5] border border-[#4c4f52] focus:border-[#e2b714] focus:outline-none"
        >
          <option value="general">General Feedback</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 text-[#d1d0c5]">
          Message
        </label>
        <textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-2 rounded bg-[#2c2e31] text-[#d1d0c5] border border-[#4c4f52] focus:border-[#e2b714] focus:outline-none min-h-[150px]"
          placeholder="Type your message here..."
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-[#d1d0c5]">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 rounded bg-[#2c2e31] text-[#d1d0c5] border border-[#4c4f52] focus:border-[#e2b714] focus:outline-none"
          placeholder="Enter your email if you'd like a response"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#e2b714] text-[#323437] font-bold rounded hover:bg-[#e2b714]/90 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}